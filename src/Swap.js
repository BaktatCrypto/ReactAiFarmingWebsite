import { providers, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { ChainId, ETH, UniswapPair } from "simple-uniswap-sdk";
import UniversalProvider from "@walletconnect/universal-provider";
import { WalletConnectModal } from "@walletconnect/modal";
import ERC20ABI from "./erc20.abi.json";
import axios from "axios";
import Countdown from "react-countdown";

const BAKTAT_TOKEN_PRICE = "0.0037";

const COUNTDOWN_DATE_START = new Date("May 1, 2024");
COUNTDOWN_DATE_START.setHours(22);
const COUNTDOWN_DATE_END = new Date("May 19, 2024");
COUNTDOWN_DATE_END.setHours(22);

const PREVIOUSLY_ACQUIRED_AMOUNT = 194851.63; //Previous pools & private sale

const NEXT_STAGE_PRICE_STRING =
  "Geri sayım sonunda yeni fiyat çıkacak €0.00555 olacak";

const BAKTAT_ADDRESS = "0x6bF7244dA9E673356ed5A9235eAe92075DD1CaE1";

const PROJECT_ID = "c07d5dd07d97c08d19b5d095321f72c6";

// Has to be lowercase!!
const POOL_ADDRESS = "0x86f63492771e5de6a0f07f6afd24eda88f339150";

const getTokenPrice = async (address) => {
  const res = await fetch("https://api.coincap.io/v2/rates/" + address);

  if (!res.ok) {
    console.log("Error fetching token price");
    return 0;
  }

  const payload = await res.json();
  if (payload.data == null) {
    console.log("Error fetching token price");
    return 0;
  }

  return payload.data.rateUsd / 1.063829;
};

const TOKENS = {
  ETH: {
    name: "ETH",
    contractAddress: ETH.MAINNET().contractAddress,
    logoUri: "/img/icons/eth.png",
    rate: (await getTokenPrice("ethereum")) / BAKTAT_TOKEN_PRICE,
  },
  USDT: {
    name: "USDT",
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    logoUri: "/img/icons/usdt.png",
    rate: (await getTokenPrice("tether")) / BAKTAT_TOKEN_PRICE,
  },
};

function Swap() {
  const [selectedCoin, setSelectedCoin] = useState(TOKENS.ETH);
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);
  const [message, setMessage] = useState(["", "white"]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);

  const [client, setClient] = useState();
  const [pairings, setPairings] = useState([]);
  const [session, setSession] = useState();

  const [ethereumProvider, setEthereumProvider] = useState();
  const [web3Provider, setWeb3Provider] = useState();

  const [isFetchingBalances, setIsFetchingBalances] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [hasCheckedPersistedSession, setHasCheckedPersistedSession] =
    useState(false);

  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState(null);
  const [chainData, setChainData] = useState({});
  const [chain, setChain] = useState("");
  const [web3Modal, setWeb3Modal] = useState();
  const [tokenReserve, setTokenReserve] = useState(0);

  const FULL_USDT_RESERVE_VALUE = "1,000,000.00 €";

  const resetApp = () => {
    setPairings([]);
    setSession(undefined);
    setBalance(0);
    setAccount(null);
    setChain("");
  };

  // INITIAL USE EFFECT
  useEffect(() => {
    const getPersistedSession = async () => {
      if (!ethereumProvider) return;
      await _checkForPersistedSession(ethereumProvider);
      setHasCheckedPersistedSession(true);
    };

    if (ethereumProvider && chainData && !hasCheckedPersistedSession) {
      getPersistedSession();
    }

    getReserveBalance();
  }, []);

  const disconnect = useCallback(async () => {
    if (typeof ethereumProvider === "undefined") {
      throw new Error("ethereumProvider is not initialized");
    }
    await ethereumProvider.disconnect();
    resetApp();
  }, [ethereumProvider]);

  const _subscribeToProviderEvents = useCallback(
    async (_client) => {
      if (typeof _client === "undefined") {
        throw new Error("WalletConnect is not initialized");
      }

      _client.on("display_uri", async (uri) => {
        console.log("EVENT", "QR Code Modal open");
        web3Modal?.openModal({ uri });
      });

      // Subscribe to session ping
      _client.on("session_ping", ({ id, topic }) => {
        console.log("EVENT", "session_ping");
        console.log(id, topic);
      });

      // Subscribe to session event
      _client.on("session_event", ({ event, chainId }) => {
        console.log("EVENT", "session_event");
        console.log(event, chainId);
      });

      // Subscribe to session update
      _client.on("session_update", ({ topic, session }) => {
        console.log("EVENT", "session_updated");
        setSession(session);
      });

      // Subscribe to session delete
      _client.on("session_delete", ({ id, topic }) => {
        console.log("EVENT", "session_deleted");
        console.log(id, topic);
        resetApp();
      });
    },
    [web3Modal]
  );

  const createClient = useCallback(async () => {
    try {
      setIsInitializing(true);

      const provider = await UniversalProvider.init({
        projectId: PROJECT_ID,
        logger: "info",
      });

      const web3Modal = new WalletConnectModal({
        projectId: PROJECT_ID,
        chains: ["eip155:1"],
      });

      setEthereumProvider(provider);
      setClient(provider.client);
      setWeb3Modal(web3Modal);
    } catch (err) {
      throw err;
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const createWeb3Provider = useCallback((ethereumProvider) => {
    const web3Provider = new providers.Web3Provider(ethereumProvider);
    setWeb3Provider(web3Provider);
  }, []);

  const connect = useCallback(
    async (caipChainId, pairing) => {
      if (!ethereumProvider) {
        throw new ReferenceError("WalletConnect Client is not initialized.");
      }

      const session = await ethereumProvider.connect({
        namespaces: {
          eip155: {
            methods: [
              "eth_sendTransaction",
              "eth_signTransaction",
              "eth_sign",
              "personal_sign",
              "eth_signTypedData",
            ],
            chains: [`eip155:1`],
            events: ["chainChanged", "accountsChanged"],
            rpcMap: {
              chainId: `https://rpc.walletconnect.com?chainId=eip155:1&projectId=${PROJECT_ID}`,
            },
          },
        },
        pairingTopic: pairing?.topic,
      });

      createWeb3Provider(ethereumProvider);
      const _accounts = await ethereumProvider.enable();
      console.log("_accounts", _accounts);
      setAccount(_accounts[0]);
      setSession(session);
      setChain(caipChainId);

      web3Modal?.closeModal();
    },
    [ethereumProvider, chainData.eip155, createWeb3Provider, web3Modal]
  );

  const onSessionConnected = useCallback(
    async (_session) => {
      if (!ethereumProvider) {
        throw new ReferenceError("EthereumProvider is not initialized.");
      }
      const allNamespaceAccounts = Object.values(_session.namespaces)
        .map((namespace) => namespace.accounts)
        .flat();

      const chainData = allNamespaceAccounts[0].split(":");
      const caipChainId = `${chainData[0]}:${chainData[1]}`;
      setChain(caipChainId);
      setSession(_session);
      setAccount(
        allNamespaceAccounts.map((account) => account.split(":")[2])[0]
      );
      createWeb3Provider(ethereumProvider);
    },
    [ethereumProvider, createWeb3Provider]
  );

  const _checkForPersistedSession = useCallback(
    async (provider) => {
      if (typeof provider === "undefined") {
        throw new Error("WalletConnect is not initialized");
      }
      const pairings = provider.client.pairing.getAll({ active: true });
      // populates existing pairings to state
      setPairings(pairings);
      if (typeof session !== "undefined") return;
      // populates (the last) existing session to state
      if (ethereumProvider?.session) {
        const _session = ethereumProvider?.session;
        await onSessionConnected(_session);
        return _session;
      }
    },
    [session, ethereumProvider, onSessionConnected]
  );

  useEffect(() => {
    if (!client) {
      createClient();
    }
  }, [client, createClient]);

  useEffect(() => {
    if (ethereumProvider && web3Modal)
      _subscribeToProviderEvents(ethereumProvider);
  }, [_subscribeToProviderEvents, ethereumProvider, web3Modal]);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!web3Provider || !account) return;

      try {
        setIsFetchingBalances(true);

        setBalance(await getEthBalance());
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsFetchingBalances(false);
      }
    };

    fetchBalances();
  }, [web3Provider, account]);

  useEffect(() => {
    const getPersistedSession = async () => {
      if (!ethereumProvider) return;
      await _checkForPersistedSession(ethereumProvider);
      setHasCheckedPersistedSession(true);
    };

    if (ethereumProvider && chainData && !hasCheckedPersistedSession) {
      getPersistedSession();
    }
  }, [
    ethereumProvider,
    chainData,
    _checkForPersistedSession,
    hasCheckedPersistedSession,
  ]);

  const buyNowHandler = async () => {
    if (account == null) {
      connect();
      return;
    }
    await performTransaction();
  };

  const handleInputAmount = (e) => {
    const input = e.target.value;
    setInputAmount(input);

    const output = (input * selectedCoin.rate).toFixed(6);
    setOutputAmount(output);
  };

  const handleOutputAmount = (e) => {
    const output = e.target.value;
    setOutputAmount(output);

    const input = (output / selectedCoin.rate).toFixed(6);
    setInputAmount(input);
  };

  const clear = () => {
    setInputAmount(0);
    setOutputAmount(0);
    setMessage(["", "white"]);
  };

  const maxButton = () => {
    const input = balance;
    setInputAmount(parseFloat(input).toFixed(6));

    const output = (input * selectedCoin.rate).toFixed(6);
    setOutputAmount(output);
  };

  const calculateProgressPercentage = () => {
    const startTime = COUNTDOWN_DATE_START.getTime(); // Date which new price started
    const endTime = COUNTDOWN_DATE_END.getTime(); // Date when the new price ends
    const currentTime = new Date().getTime(); // Current Date

    if (currentTime < startTime) {
      return 0; // Not started yet
    } else if (currentTime > endTime) {
      return 100; // Already finished
    } else {
      const totalDuration = endTime - startTime;
      const elapsedDuration = currentTime - startTime;
      const progressPercentage = (elapsedDuration / totalDuration) * 100;
      return Math.floor(progressPercentage);
    }
  };

  const getErc20Balance = async (contractAddress) => {
    if (!account) return 0;
    const tokenContract = new ethers.Contract(
      contractAddress,
      ERC20ABI,
      web3Provider
    );
    const balance = await tokenContract.balanceOf(account);
    return ethers.utils.formatEther(balance);
  };

  const getEthBalance = async () => {
    if (!account) return 0;
    const balance = await web3Provider.getBalance(account);
    return ethers.utils.formatEther(balance);
  };

  const getReserveBalance = async () => {
    axios
      .post("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", {
        query: `{
          pools(where: {id: "${POOL_ADDRESS}"}) {
          id
          tick
          txCount
          totalValueLockedUSD
          token0 {
            id
            decimals
            name
            totalValueLockedUSD
          }
          token1 {
            id
            decimals
            name
            totalValueLockedUSD
          }
        }
      }`,
      })
      .then((result) => {
        const pools = result.data.data.pools;
        if (pools.length > 0) {
          setTokenReserve(
            (
              parseFloat(pools[0].totalValueLockedUSD) +
              PREVIOUSLY_ACQUIRED_AMOUNT
            )
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " €"
          );
        }
      });
  };

  const performTransaction = async () => {
    setLoading(true);
    if (outputAmount < 100) {
      setMessage(["Please enter a minimum amount of 100 BAKTAT", "red"]);
      setLoading(false);
      return;
    }

    try {
      const uniswapPair = new UniswapPair({
        // the contract address of the token you want to convert FROM
        fromTokenContractAddress: selectedCoin.contractAddress,
        // the contract address of the token you want to convert TO
        toTokenContractAddress: BAKTAT_ADDRESS,
        // the ethereum address of the user using this part of the dApp
        ethereumAddress: account,
        // you can pass in the provider url as well if you want
        // providerUrl: YOUR_PROVIDER_URL,
        // OR if you want to inject your own ethereum provider (no need for chainId if so)
        // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
        chainId: ChainId.MAINNET,
      });

      const uniswapPairFactory = await uniswapPair.createFactory();

      const trade = await uniswapPairFactory.trade(inputAmount);

      const ethersProvider = new ethers.providers.Web3Provider(
        ethereumProvider
      );

      const signer = ethersProvider.getSigner();

      if (trade.approvalTransaction) {
        const approved = await signer.sendTransaction(
          trade.approvalTransaction
        );
        console.log("approved txHash", approved.hash);
        const approvedReceipt = await approved.wait();
        console.log("approved receipt", approvedReceipt);
      }

      const tradeTransaction = await signer.sendTransaction(trade.transaction);
      console.log("trade txHash", tradeTransaction.hash);
      const tradeReceipt = await tradeTransaction.wait();
      console.log("trade receipt", tradeReceipt);

      trade.destroy();
      setLoading(false);
      setMessage([
        "Trade successful, please check your wallet for details",
        "green",
      ]);
    } catch (e) {
      setLoading(false);
      console.log(e);
      setMessage([
        `Something went wrong, please try again and make sure to have enough ${selectedCoin.name} in your wallet`,
        "red",
      ]);
    }
  };

  const Completionist = () => (
    <span
      style={{
        color: "white",
        fontWeight: 600,
      }}
    >
      New price is coming soon!
    </span>
  );

  // Renderer callback
  const renderer = ({ total, days, hours, minutes, seconds }) => {
    if (total) {
      // Render a countdown
      return (
        <div className="row justify-content-center">
          <NumberPillar number={(days < 10 ? "0" + days : days) + "d/gün"} />
          &nbsp;&nbsp;
          <NumberPillar number={(hours < 10 ? "0" + hours : hours) + "h/sa"} />
          &nbsp;&nbsp;
          <NumberPillar
            number={(minutes < 10 ? "0" + minutes : minutes) + "m/dk"}
          />
          &nbsp;&nbsp;
          <NumberPillar
            number={(seconds < 10 ? "0" + seconds : seconds) + "s/sn"}
          />
        </div>
      );
    } else {
      // Render a finished state
      return <Completionist />;
    }
  };

  const NumberPillar = (props) => {
    const { number } = props;
    return (
      <p
        style={{
          backgroundColor: "white",
          padding: "3px 3px 3px 3px",
          borderRadius: "10px",
          color: "black",
          fontSize: "14px",
          fontWeight: 500,
          marginBottom: 10,
        }}
      >
        {number}
      </p>
    );
  };

  return (
    <>
      {/* DEX */}
      <div className="col-lg-6" id="swapWidget">
        <div
          className="wow illusto-2 fadeInRight"
          data-wow-delay="0.3s"
          style={{ paddingTop: 20 }}
        >
          <div
            className="dex"
            style={{
              backgroundColor: "white",
              padding: "4.5px",
              borderRadius: 24,
            }}
          >
            <div
              className=""
              style={{
                background: "rgb(253, 89, 29)",
                background:
                  "linear-gradient(0deg, rgba(253, 89, 29, 1) 0%, rgba(252, 152, 69, 1) 100%)",
                width: "100%",
                borderTopRightRadius: "24px",
                borderTopLeftRadius: "24px",
              }}
            >
              <h5
                style={{
                  textAlign: "center",
                  padding: "5px 30px 0px 30px",
                  fontWeight: 550,
                  fontSize: 17,
                  color: "white",
                }}
              >
                {/* <img src="img/custom/coin_transparent.png" alt="baktat" style="height: 25px; width: auto;" /> */}
                THE FARMING CROWDFUNDING PLATFORM TOKEN
              </h5>
              <h4
                style={{
                  textAlign: "center",
                  paddingBottom: "0px",
                  fontWeight: 550,
                  fontSize: 15,
                  color: "white",
                  lineHeight: 1,
                }}
              >
                Bu fırsatı kaçırmayın! Fiyat artmadan tokenlerinizi hemen alın.{" "}
                <br></br>
                <br></br>Get your tokens before the price increases further!
              </h4>
              <div className="countdown" style={{ textAlign: "center" }}>
                <Countdown date={COUNTDOWN_DATE_END} renderer={renderer} />
              </div>
              <div style={{ padding: "0px 10px 5px 10px" }}>
                <div className="progress" data-label={NEXT_STAGE_PRICE_STRING}>
                  <span
                    className="value"
                    style={{ width: `${calculateProgressPercentage()}%` }}
                  />
                </div>
              </div>
              {/* <h6
                style={{
                  textAlign: "center",
                  padding: "0 0 7px 0",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                USDT Raised: {tokenReserve} / {FULL_USDT_RESERVE_VALUE}
              </h6> */}
            </div>
            <h6 className="text-divider">
              <span>
                {" "}
                1 BAKTAT ≈ €{BAKTAT_TOKEN_PRICE} next price is €
                {BAKTAT_TOKEN_PRICE * 1.5}
              </span>
            </h6>
            <div style={{ textAlign: "center" }}>
              <button
                id="ethButton"
                className={`btn ${
                  selectedCoin.name === "ETH" ? "selected-coin" : ""
                }`}
                style={{ width: 130, borderRadius: "0.4rem" }}
                onClick={async () => {
                  setSelectedCoin(TOKENS.ETH);
                  setBalance(await getEthBalance());
                  clear();
                }}
              >
                <img src="/img/icons/eth.png" alt="eth" width={20} />
                &nbsp;ETH
              </button>
              &nbsp;
              <button
                id="usdtButton"
                className={`btn ${
                  selectedCoin.name === "USDT" ? "selected-coin" : ""
                }`}
                style={{ width: 130, borderRadius: "0.4rem" }}
                onClick={async () => {
                  setSelectedCoin(TOKENS.USDT);
                  setBalance(
                    await getErc20Balance(TOKENS.USDT.contractAddress)
                  );
                  clear();
                }}
              >
                <img src="img/icons/usdt.png" alt="baktat" width={20} />
                &nbsp;USDT
              </button>
            </div>
            {/* BUTTONS  */}
            <h5
              style={{
                textAlign: "center",
                color: "#727b83",
                fontSize: 14,
                padding: "8px 0 0 0",
              }}
              id="balanceAmountLabel"
            >
              {selectedCoin.name} balance {account ? balance : 0}
            </h5>
            <div style={{ padding: "0 10px 0 10px" }}>
              <hr />
            </div>
            {/* INPUTS */}
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="row justify-content-between">
                    <p
                      style={{
                        color: "#727b83",
                        fontSize: 12,
                        margin: "0 0 0 20px",
                      }}
                      id="inputAmountLabel"
                    >
                      Ödediğiniz <b>{selectedCoin.name}</b> You pay
                    </p>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        margin: "0 20px 0 0",
                        fontSize: "12px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      disabled={account ? false : true}
                      onClick={maxButton}
                    >
                      Max
                    </button>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#f1f4f6",
                      padding: 10,
                      borderRadius: "0.4rem",
                    }}
                  >
                    <div className="input-wrap">
                      <input
                        type="number"
                        id="inputAmount"
                        min={0}
                        value={inputAmount}
                        onChange={handleInputAmount}
                      />
                      <img
                        alt="eth"
                        className="follows-input"
                        src={selectedCoin.logoUri}
                        style={{ width: 30, height: "auto" }}
                        id="inputAmountTokenImage"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <p
                    style={{
                      color: "#727b83",
                      fontSize: 12,
                      margin: 0,
                    }}
                  >
                    Aldığınız <b>BAKTAT</b> You receive
                  </p>
                  <div
                    style={{
                      backgroundColor: "#f1f4f6",
                      padding: 10,
                      borderRadius: "0.4rem",
                    }}
                  >
                    <div className="input-wrap">
                      <input
                        type="number"
                        id="outputAmount"
                        min={0}
                        value={outputAmount}
                        onChange={handleOutputAmount}
                      />
                      <img
                        alt="baktat"
                        className="follows-input"
                        src="/img/custom/coin_transparent.png"
                        style={{ width: 30, height: "auto" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* INPUTS */}
            <h6
              style={{
                color: "#182b48",
                fontSize: "0.75rem",
                textAlign: "center",
                fontWeight: 400,
                paddingLeft: 40,
                paddingRight: 40,
                paddingTop: 10,
              }}
            >
              0.015 ETH is reserved for gas. The actual amount of transferred
              BAKTAT tokens will depend on the network.
            </h6>
            <p
              style={{
                color: message[1],
                fontSize: "0.83rem",
                textAlign: "center",
                fontWeight: 400,
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              {message[0]}
            </p>
            <div
              className="d-flex justify-content-center"
              style={{ paddingBottom: 3 }}
            >
              {loading ? (
                <button
                  type="button"
                  className="btn"
                  style={{
                    borderRadius: 50,
                    backgroundColor: "#182b48",
                    color: "white",
                    fontSize: 14,
                    padding: "8px 65px 8px 65px",
                  }}
                  disabled
                >
                  ...sending transaction
                </button>
              ) : (
                <button
                  type="button"
                  className="btn"
                  style={{
                    borderRadius: 50,
                    backgroundColor: "red", //#182b48
                    color: "white",
                    fontSize: 14,
                    padding: "8px 40px 8px 40px", //Padding war 130 bei "Buy Now"
                  }}
                  onClick={buyNowHandler} // uncomment after activation of swap, change text to "Buy Now"
                >
                  Buy Now / Satın Al
                </button>
              )}
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ paddingTop: 3 }}
            >
              <a href="#howToBuy">
                <button
                  type="button"
                  className="btn"
                  style={{
                    borderRadius: 50,
                    backgroundColor: "#f1f4f6",
                    color: "#535353",
                    fontSize: 14,
                    padding: "8px 100px 8px 100px",
                  }}
                >
                  How To Buy
                </button>
              </a>
            </div>
            <div
              className="d-flex justify-content-center "
              style={{ paddingTop: 10, alignItems: "center" }}
            >
              <a
                href="https://chat.whatsapp.com/JQsMuZSwJdWICqGGXKCC8f"
                style={{ alignItems: "center", display: "flex" }}
                target="_blank"
              >
                <i
                  class="fa fa-whatsapp"
                  style={{ color: "green", fontSize: 40 }}
                ></i>{" "}
                <span style={{ marginLeft: 10, color: "red", fontWeight: 500 }}>
                  BAKTATCOİN alımında destek için<br></br> WhatsApp kanalımıza
                  tıklayın
                </span>
              </a>
            </div>
            <br />
          </div>
        </div>
      </div>
      {/* ENDE */}
    </>
  );
}

export default Swap;
