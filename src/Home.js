import Swap from "./Swap";
import { useEffect, useState } from "react";
import WOW from "wow.js";
import $ from "jquery";

function Home() {
  useEffect(() => {
    var $window = $(window);

    // :: Sticky Active Code
    $window.on("scroll", function () {
      if ($(document).scrollTop() > 86) {
        $("#banner").addClass("shrink");
      } else {
        $("#banner").removeClass("shrink");
      }
    });

    // :: Carousel Active Code
    if ($.fn.owlCarousel) {
      $(".client_slides").owlCarousel({
        responsive: {
          0: {
            items: 1,
          },
          991: {
            items: 2,
          },
          767: {
            items: 1,
          },
        },
        loop: true,
        autoplay: true,
        smartSpeed: 700,
        dots: true,
      });

      var dot = $(".client_slides .owl-dot");
      dot.each(function () {
        var index = $(this).index() + 1;
        if (index < 10) {
          $(this).html("0").append(index);
        } else {
          $(this).html(index);
        }
      });
    }

    // :: Magnific-popup Video Active Code
    if ($.fn.magnificPopup) {
      $("#videobtn").magnificPopup({
        type: "iframe",
      });
      $(".open-popup-link").magnificPopup({
        type: "inline",
        midClick: true,
      });
      $(".open-signup-link").magnificPopup({
        type: "inline",
        midClick: true,
      });
      $(".gallery_img").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
        removalDelay: 300,
        mainClass: "mfp-fade",
        preloader: true,
      });
    }

    // :: Preloader Active Code
    $window.on("load", function () {
      $("#preloader").fadeOut("1000", function () {
        $(this).remove();
      });
    });

    // :: ScrollUp Active Code
    if ($.fn.scrollUp) {
      $.scrollUp({
        scrollSpeed: 1500,
        scrollText: "Scroll Top",
      });
    }

    // :: onePageNav Active Code
    if ($.fn.onePageNav) {
      $("#nav").onePageNav({
        currentClass: "active",
        scrollSpeed: 1500,
        easing: "easeOutQuad",
      });
    }

    // :: CounterUp Active Code
    if ($.fn.counterUp) {
      $(".counter").counterUp({
        delay: 10,
        time: 2000,
      });
    }

    // :: Wow Active Code
    if ($window.width() > 767) {
      new WOW().init();
    }

    // :: Accordian Active Code
    (function () {
      var dd = $("dd");
      dd.filter(":nth-child(n+3)").hide();
      $("dl").on("click", "dt", function () {
        $(this).next().slideDown(500).siblings("dd").slideUp(500);
      });
    })();

    // :: niceScroll Active Code
    if ($.fn.niceScroll) {
      $(".timelineBody").niceScroll();
    }
  }, []);

  return (
    <>
      {/* ##### Header Area Start ##### */}
      <nav
        className="navbar navbar-expand-lg navbar-white fixed-top"
        id="banner"
      >
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand" href="#">
            <span>
              <img
                className="navLogo-height"
                src="img/custom/coin_transparent.png"
                alt="logo"
              />
            </span>
            <span className="navTitle">
              <span className="baktat">BAKTAT</span> Token
            </span>
          </a>
          {/* Toggler/collapsibe Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span
              className="navbar-toggler-icon"
              style={{ width: "0.8em", height: "1.2em" }}
            />
          </button>
          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#roadmap">
                  Roadmap
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#whitepaper">
                  Whitepaper
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#howToBuy">
                  How to Buy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* ##### Header Area End ##### */}
      {/* ##### Welcome Area Start ##### */}
      <br />
      <br />
      <section className="hero-section moving section-padding" id="home">
        {/* Hero Content */}
        <div className="hero-section-content">
          <div className="container ">
            <div className="row align-items-center">
              {/* Welcome Content */}
              <div className="col-12 col-lg-6 col-md-12">
                <div className="welcome-content">
                  <h1 className="wow fadeInUp" data-wow-delay="0.1s">
                    The <span className="baktat">BAKTAT</span> Farming Ai
                    Crowdfunding Platform utilizes the benefits of farming
                    combind with cryptocurrencies{" "}
                  </h1>
                  <p
                    className="wow w-text fadeInUp"
                    data-wow-delay="0.1s"
                    style={{ marginBottom: 10 }}
                  >
                    <span className="baktat">BAKTAT</span> FARMING has the
                    perfect strategy for you to participate in the agricultural
                    business without the need to buy farms, equipment and
                    cattle. <span className="baktat">BAKTAT</span> FARMING will
                    allow your to be a part of individual and Ai powered agricultural projects!
                  </p>
                  <div
                    className="wow dream-btn-group fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <a
                      href="files/whitepaper.pdf"
                      className="btn more-btn mr-3"
                      target="_blank"
                      style={{ margin: 5 }}
                    >
                      Whitepaper
                    </a>
                    <a
                      href="files/patentAndTrademarkCert.pdf"
                      className="btn more-btn mr-3"
                      target="_blank"
                    >
                      Patent & Trademark Certificate
                    </a>
                  </div>
                  <div className="promo-section" style={{ marginTop: 10 }}>
                    <h3 className="special-head dark">
                      Your access to farming!
                    </h3>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class=" wow illusto-2 fadeInRight" data-wow-delay="0.3s">
                  <img src="img/core-img/about-3.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ##### Welcome Area End ##### */}
      <div className="clearfix" />

      {/* ##### Video Section ##### */}
      <section className="about-us-area" style={{ paddingTop: 25 }}>
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-12 col-lg-6 offset-lg-0 text-center"
              style={{ paddingTop: 25 }}
            >
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <span className="gradient-text ">
                  Detailed presentation of our ICO (English Version)
                </span>
                <video width="95%" controls preload="metadata">
                  <source
                    src="video/baktat_explanation.mp4#t=0.1"
                    type="video/mp4"
                  />
                  <source
                    src="video/baktat_explanation.webm#t=0.1"
                    type="video/webm"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div
              className="col-12 col-lg-6 offset-lg-0 text-center"
              style={{ paddingTop: 25 }}
            >
              <div className="wow fadeInDown" data-wow-delay="0.3s">
                <span className="gradient-text ">
                  ICO Projemizin detaylı sunumu (Türkçe Versiyonu )
                </span>
                <video width="95%" controls preload="metadata">
                  <source
                    src="video/baktat_explanation_tr.mp4#t=0.1"
                    type="video/mp4"
                  />
                  <source
                    src="video/baktat_explanation_tr.webm#t=0.1"
                    type="video/webm"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="our_blog_area clearfix section-padding-100-0"
        id="blog"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="section-heading text-center"
                style={{ marginBottom: 40 }}
              >
                <h2
                  data-aos="fade-up"
                  className="aos-init aos-animate wow fadeInLeft"
                >
                  More Example Projects
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/HicBHU5EX3U?si=Uznw9yTGhN9FXcv1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* ##### About Us Area Start ##### */}
      <section
        className="about-us-area"
        style={{ paddingBottom: 50, paddingTop: 50 }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 offset-lg-0">
              <div className="who-we-contant">
                <div
                  className="wow dream-dots text-left fadeInDown"
                  data-wow-delay="0.2s"
                >
                  <span className="gradient-text ">
                    Over 30 years of experience in this industry
                  </span>
                </div>
                <h4 className="wow fadeInLeft" data-wow-delay="0.3s">
                  We use our experience to democratize the farming industry and
                  share our sucess amongst those interested in it
                </h4>
                <p className="wow fadeInLeft" data-wow-delay="0.4s">
                  The global food and groceries market is currently valued at
                  nearly $12 trillion (2019) and it’s expected to sustain a CAGR
                  of 5%.
                </p>
                <p className="wow fadeInLeft" data-wow-delay="0.5s">
                  We are already actively engaged in discussions with external
                  agricultural projects, manufacturers, and suppliers to secure
                  projects that are intended to be initiated on our platform in
                  the future.
                </p>
              </div>
            </div>
            <img
              className="supportImg"
              src="img/svg/trading-strokes.svg"
              alt="image"
            />
            <div className="col-12 col-lg-6 offset-lg-0 col-md-12 mt-30 no-padding-left">
              <div
                className="welcome-meter floating-anim fadeInUp"
                data-wow-delay="0.7s"
              >
                <img src="img/core-img/computer.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ##### About Us Area End ##### */}
      <section className="features section-padding-50-50 ">
        <div className="container">
          <div
            className="section-heading text-center"
            style={{ marginBottom: 40 }}
          >
            {/* Dream Dots */}
            <div
              className="wow dream-dots justify-content-center fadeInDown"
              data-wow-delay="0.2s"
            >
              <span>
                A growing population requires a growing agricultural business
              </span>
            </div>
            <h2 className="wow fadeInUp" data-wow-delay="0.3s">
              What is <span className="baktat">BAKTAT</span> Farming
            </h2>
            <p className="wow fadeInUp" data-wow-delay="0.4s">
              <span className="baktat">BAKTAT</span> Farming uses the benefits
              of farming by allowing users to participate in agricultural
              projects by using the <span className="baktat">BAKTAT</span>{" "}
              Farming Crowdfunding Platform which will be developed.
              Entrepreneurs who want to start agricultural projects can use the
              platform to attract participants for their projects.
            </p>
          </div>
          <div className="row align-items-center">
            <div className="service-img-wrapper col-lg-5 col-md-12 col-sm-12 no-padding-right">
              <div className="features-list">
                <div className="who-we-contant">
                  <h4 className="wow w-text fadeInLeft" data-wow-delay="0.2s">
                    Goals and Vision
                  </h4>
                  <p className="wow w-text fadeInLeft" data-wow-delay="0.3s">
                    The <span className="baktat">BAKTAT</span> Farming
                    Crowdfunding Platform provides you with the optimal strategy
                    to join agricultural projects. The crowdfunding platform
                    will be developed by <span className="baktat">BAKTAT</span>{" "}
                    Farming after the ICO phase. By using the crowdfunding
                    platform, users will have the opportunity to participate in
                    individual agricultural projects.
                  </p>
                </div>
                <ul className="list-marked">
                  <li
                    className="text-white wow fadeInLeft"
                    data-wow-delay="0.4s"
                  >
                    <div style={{ display: "flex" }}>
                      <i className="fa fa-check" />
                      Enable motivated entrepreneurs to get a foot into
                      agriculture
                    </div>
                  </li>
                  <li
                    className="text-white wow fadeInLeft"
                    data-wow-delay="0.5s"
                  >
                    <div style={{ display: "flex" }}>
                      <i className="fa fa-check" />
                      Allow crypto enthuasiast to use crypto technology in
                      agricultural projects
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="service-img-wrapper col-lg-7 col-md-12 col-sm-12 mt-s">
              <div className="image-box">
                <img
                  src="img/core-img/platform.png"
                  className="center-block img-responsive phone-img"
                  alt=""
                />
                <img
                  src="img/core-img/rings.png"
                  className="center-block img-responsive rings "
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="our_blog_area clearfix section-padding-100-0"
        id="blog"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="section-heading text-center"
                style={{ marginBottom: 40 }}
              >
                <div
                  className="dream-dots justify-content-center aos-init aos-animate wow fadeInDown"
                  data-aos="fade-up"
                >
                  <span className="">
                    A rich choice in possible agricultural projects
                  </span>
                </div>
                <h2
                  data-aos="fade-up"
                  className="aos-init aos-animate wow fadeInLeft"
                >
                  We analyzed more than 42 types of projects that potentially
                  could start all over the world.
                </h2>
                <p
                  data-aos="fade-up"
                  className="aos-init aos-animate wow fadeInRight"
                >
                  Such projects can be for example from the categories
                  <br />
                  fruits, livestock and vegetables.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div
              className="col-12 col-md-6 col-lg-4 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div
                className="single-blog-area aos-init aos-animate"
                style={{ marginBottom: 30 }}
                data-aos="fade-up"
              >
                <div className="blog_thumbnail">
                  <img
                    draggable="false"
                    src="/img/custom/projects/bananas.jpg"
                    alt=""
                  />
                </div>
                <div className="blog-content">
                  <div className="post-meta mt-20">
                    <p>Fruits / Costa Rica</p>
                  </div>
                  <a href="#" className="post-title">
                    <h4>Banana Plantation</h4>
                  </a>
                  <p>
                    In 2015, Costa Rica grew and supplied one out of every 10
                    bananas consumed globally and ranks as the world's third
                    largest banana exporter.
                  </p>
                  {/*<a href="#" class="btn more-btn mt-15">Read Details</a>*/}
                </div>
              </div>
            </div>
            <div
              className="col-12 col-md-6 col-lg-4 wow fadeInDown"
              data-wow-delay="0.3s"
            >
              <div
                className="single-blog-area aos-init aos-animate"
                style={{ marginBottom: 30 }}
                data-aos="fade-up"
              >
                <div className="blog_thumbnail">
                  <img
                    draggable="false"
                    src="/img/custom/projects/sheep.jpg"
                    alt=""
                  />
                </div>
                <div className="blog-content">
                  <div className="post-meta mt-20">
                    <p>Livestock / Turkey</p>
                  </div>
                  <a href="#" className="post-title">
                    <h4>Sheep Farm</h4>
                  </a>
                  <p>
                    Livestock are the domesticated animals raised in an
                    agricultural setting to provide labor and produce
                    diversified products for consumption such as meat, eggs,
                    milk, fur, leather, and wool.
                  </p>
                  {/*<a href="#" class="btn more-btn mt-15">Read Details</a>*/}
                </div>
              </div>
            </div>
            <div
              className="col-12 col-md-6 col-lg-4 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div
                className="single-blog-area aos-init aos-animate"
                style={{ marginBottom: 30 }}
                data-aos="fade-up"
              >
                <div className="blog_thumbnail">
                  <img
                    draggable="false"
                    src="/img/custom/projects/potatoes.jpg"
                    alt=""
                  />
                </div>
                <div className="blog-content">
                  <div className="post-meta mt-20">
                    <p>Vegetables / Kenia</p>
                  </div>
                  <a href="#" className="post-title">
                    <h4>Potato Fields</h4>
                  </a>
                  <p>
                    The National Potato Council of Kenya reports that potatoes
                    are the second most important food and cash crop after corn
                    in Kenya.
                  </p>
                  {/*<a href="#" class="btn more-btn mt-15">Read Details</a>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="darky how section-padding-50-50"
        style={{ paddingBottom: 30, borderTop: "unset" }}
      >
        <div className="container">
          <div className="section-heading text-center">
            {/* Dream Dots */}
            <div
              className="dream-dots justify-content-center wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <span className="gradient-t blue">
                It does not take much time to
              </span>
            </div>
            <h2
              className="wow fadeInUp"
              data-wow-delay="0.3s"
              style={{
                visibility: "visible",
                animationDelay: "0.3s",
                animationName: "fadeInUp",
              }}
            >
              Become a <span className="baktat">BAKTAT</span> Farming
              Enthuasiast
            </h2>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              {/* Content */}
              <div
                className="service_single_content box-shadow text-center mb-100 wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                {/* Icon */}
                <div className="service_icon">
                  <img src="img/icons/h1.png" className="colored-icon" alt="" />
                  <span className="step-num">1</span>
                </div>
                <h6>
                  Get your
                  <br />
                  <span className="baktat">BAKTAT</span> Tokens
                </h6>
                <p>
                  Acquire any amount of <span className="baktat">BAKTAT</span>{" "}
                  Tokens via our Website, ICO, partners and exchanges after
                  listing
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              {/* Content */}
              <div
                className="service_single_content box-shadow text-center mb-100 wow wow fadeInUp"
                data-wow-delay="0.3s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.3s",
                  animationName: "fadeInUp",
                }}
              >
                {/* Icon */}
                <div className="service_icon">
                  <img src="img/icons/h2.png" className="colored-icon" alt="" />
                  <span className="step-num">2</span>
                </div>
                <h6>Chose projects you want to participate in</h6>
                <p>
                  As soon our platform up and running, chose any project to
                  allocate tokens and become part of it
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              {/* Content */}
              <div
                className="service_single_content box-shadow text-center mb-100 wow fadeInUp"
                data-wow-delay="0.4s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.4s",
                  animationName: "fadeInUp",
                }}
              >
                {/* Icon */}
                <div className="service_icon">
                  <img src="img/icons/h3.png" className="colored-icon" alt="" />
                  <span className="step-num">3</span>
                </div>
                <h6>
                  Lean back and secure your place in the project <br />
                </h6>
                <p>
                  As a <span className="baktat">BAKTAT</span> Farming
                  participant, you can be part of worldwide agriculutural
                  projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="token-distribution section-padding-50-50">
        <div className="container">
          <div
            className="section-heading text-center"
            style={{ marginBottom: 20 }}
          >
            {/* Dream Dots */}
            {/*<div class="wow dream-dots justify-content-center fadeInUp" data-wow-delay="0.2s">
              <span>Token Distribution</span>
          </div>*/}
            <h2 className="wow fadeInUp" data-wow-delay="0.3s">
              Token Distribution
            </h2>
            {/*<p class="wow fadeInUp" data-wow-delay="0.4s">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.</p>*/}
          </div>
          <div
            className="row align-items-center"
            style={{ alignItems: "unset !important" }}
          >
            <div className="col-lg-6 col-sm-12">
              <div className=" ">
                <h2
                  className="wow text-center mb-30 fadeInUp"
                  data-wow-delay="0.3s"
                >
                  Funds Allocation
                </h2>
                <img
                  src="img/core-img/distribution.png"
                  className="center-block floating-anim"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 mt-s">
              <h2
                className="wow text-center mb-30 fadeInUp"
                data-wow-delay="0.3s"
              >
                Token Distribution
              </h2>
              <div className="row">
                <div className="col-sm-6">
                  <div className="">
                    <img
                      src="img/core-img/graph-11.png"
                      className="center-block floating-anim"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-sm-6 floating-anim">
                  <div className="token-info">
                    <div className="info-wrapper one">
                      <div className="token-icon">60</div>
                      <div className="token-descr">Sale</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="info-wrapper two">
                      <div className="token-icon">20</div>
                      <div className="token-descr">Team</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="info-wrapper four">
                      <div className="token-icon">10</div>
                      <div className="token-descr">Partnership</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="info-wrapper five">
                      <div className="token-icon">05</div>
                      <div className="token-descr">Bounty / Airdrop</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="info-wrapper three">
                      <div className="token-icon">03</div>
                      <div className="token-descr">Advisor</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="info-wrapper six">
                      <div className="token-icon">02</div>
                      <div className="token-descr">Charity</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="token-icon" />
                    <div className="token-descr" />
                  </div>
                  <div className="token-info">
                    <div className="token-icon" />
                    <div className="token-descr" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="roadmap section-padding-0-0" id="roadmap">
        <div className="section-heading text-center">
          {/* Dream Dots */}
          <div
            className="dream-dots justify-content-center fadeInUp"
            data-wow-delay="0.2s"
          >
            <span>ICO Roadmap</span>
          </div>
          <h2 className="fadeInUp" data-wow-delay="0.3s">
            Our ICO Roadmap
          </h2>
          {/*<p class="fadeInUp" data-wow-delay="0.4s">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.</p>*/}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="main-timeline">
                <div className="timeline">
                  <div className="icon" />
                  <div className="date-content">
                    <div className="date-outer">
                      <span className="date">
                        <span className="month">Q1 &amp; Q2</span>
                        <span className="year">2023</span>
                      </span>
                    </div>
                  </div>
                  <div className="timeline-content">
                    <h5 className="title">Intial Design and Preparations</h5>
                    <p className="description text-light-gray">
                      Conceptual design and Team building Headquarter in
                      Germany. Hackathon with development team start of
                      Whitepaper creation Start Token creation Expanding Team.
                      Expanding cooperation partnerships Like coinbase
                    </p>
                  </div>
                </div>
                <div className="timeline">
                  <div className="icon" />
                  <div className="date-content">
                    <div className="date-outer">
                      <span className="date">
                        <span className="month">End Q4</span>
                        <span className="year">2023</span>
                      </span>
                    </div>
                  </div>
                  <div className="timeline-content">
                    <h5 className="title">
                      Whitepaper and Website Development
                    </h5>
                    <p className="description text-light-gray">
                      Programing the Website Team expanding in legal department.
                      Whitepaper Release with all partners Website Release
                    </p>
                  </div>
                </div>
                <div className="timeline">
                  <div className="icon" />
                  <div className="date-content">
                    <div className="date-outer">
                      <span className="date">
                        <span className="month">Q1 - Q4</span>
                        <span className="year">2024</span>
                      </span>
                    </div>
                  </div>
                  <div className="timeline-content">
                    <h5 className="title">
                      Laying the foundation for development
                    </h5>
                    <p className="description text-light-gray">
                      Start Bountyprogram and Airdrop. Social Media Start. Start
                      developing the platform. Roadmap Updates. BNB Chain
                      support. Start Crowdsale and Referral program as well as
                      global marketing rollout (Q2).
                    </p>
                  </div>
                </div>
                <div className="timeline">
                  <div className="icon" />
                  <div className="date-content">
                    <div className="date-outer">
                      <span className="date">
                        <span className="month">Q1 - Q4</span>
                        <span className="year">2025</span>
                      </span>
                    </div>
                  </div>
                  <div className="timeline-content">
                    <h5 className="title">Platform launch and more</h5>
                    <p className="description text-light-gray">
                      End of the ICO (In Q1 at the latest). Full platform
                      release. Continuously Expanding the Team. Kick-off of the
                      charity program. Drone watching / Smart Farming. Start of{" "}
                      <span className="baktat">BAKTAT</span> Farmland Resort and
                      Animal Sanctuary
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="clearfix" />
      {/* ##### Our Trial Area End ##### */}
      <section
        className="spread-map download"
        style={{ paddingBottom: 10 }}
        id="whitepaper"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-xs-12">
              <div
                className="wow welcome-meter fadeInLeft"
                data-wow-delay="0.3s"
              >
                <img
                  src="img/core-img/whitepaper.png"
                  className="center-block"
                  style={{ borderRadius: "5%" }}
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 col-xs-12 mt-s">
              <div className="who-we-contant">
                <div
                  className="wow dream-dots text-left fadeInRight"
                  data-wow-delay="0.2s"
                >
                  {/* <img src="img/svg/section-icon-11.svg" alt=""> */}
                </div>
                <h4
                  className="wow text-white fadeInRight"
                  data-wow-delay="0.3s"
                >
                  Get Our Whitepaper
                </h4>
                <p className="wow text-white fadeInRight" data-wow-delay="0.3s">
                  Our whitepaper contains all information of this webpage and
                  additional information in a more detailed form. We will keep
                  updating all information for you. Contact us if you have any
                  questions.
                </p>
                <a
                  className="wow btn dream-btn mt-30 fadeInRight"
                  data-wow-delay="0.4s"
                  href="files/whitepaper.pdf"
                  target="_blank"
                >
                  Get Whitepaper
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="darky how section-padding-50-50"
        style={{ paddingBottom: 30, borderTop: "unset" }}
        id="howToBuy"
      >
        <div className="container">
          <div className="section-heading text-center">
            <h2
              className="wow fadeInUp"
              data-wow-delay="0.3s"
              style={{
                visibility: "visible",
                animationDelay: "0.3s",
                animationName: "fadeInUp",
              }}
            >
              How to buy <span className="baktat">BAKTAT</span> Tokens
            </h2>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              {/* Content */}
              <div
                className="service_single_content box-shadow text-center mb-100 wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                {/* Icon */}
                <div className="service_icon">
                  <img
                    src="img/icons/eth.png"
                    className="colored-icon"
                    alt=""
                  />
                  <span className="step-num">1</span>
                </div>
                <h6>Prepare your wallet</h6>
                <p>
                  Ensure that you have enough ETH on your wallet. Use the{" "}
                  <a href="#swapWidget">presale widget above</a> to swap for{" "}
                  <span className="baktat">BAKTAT</span> Tokens.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              {/* Content */}
              <div
                className="service_single_content box-shadow text-center mb-100 wow wow fadeInUp"
                data-wow-delay="0.3s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.3s",
                  animationName: "fadeInUp",
                }}
              >
                {/* Icon */}
                <div className="service_icon">
                  <img
                    src="img/icons/usdt.png"
                    className="colored-icon"
                    alt=""
                  />
                  <span className="step-num">2</span>
                </div>
                <h6>No ETH available? Don't worry!</h6>
                <p>
                  You can also buy <span className="baktat">BAKTAT</span> Tokens
                  with USDT (ERC-20). Use the USDT option and swap your desired
                  amount.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              {/* Content */}
              <div
                className="service_single_content box-shadow text-center mb-100 wow fadeInUp"
                data-wow-delay="0.4s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.4s",
                  animationName: "fadeInUp",
                }}
              >
                {/* Icon */}
                <div className="service_icon">
                  <img
                    src="img/icons/support.png"
                    className="colored-icon"
                    alt=""
                  />
                  <span className="step-num">3</span>
                </div>
                <h6>Do you need help?</h6>
                <p>
                  If you have any issues acquiring{" "}
                  <span className="baktat">BAKTAT</span> Tokens, do not hesitate
                  to contact us.{" "}
                  <a href="mailto:support@baktat.ai">support@baktat.ai</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="section-heading text-center"
          style={{ marginBottom: 10 }}
        >
          {/* Dream Dots */}
          <div
            className="wow dream-dots justify-content-center fadeInDown"
            data-wow-delay="0.2s"
          >
            <h2 className="wow fadeInUp" data-wow-delay="0.3s">
              If you don't have a wallet, here's how to get one.
            </h2>
          </div>
          <p className="wow fadeInUp" data-wow-delay="0.4s">
            You can easily create a new wallet by choosing an appropriate wallet
            from{" "}
            <a
              href="https://ethereum.org/en/wallets/find-wallet/"
              target="_blank"
            >
              ethereum.org (worldwide)
            </a>{" "}
            or create a wallet on{" "}
            <a href="https://www.paribu.com/" target="_blank">
              paribu.com (turkey)
            </a>{" "}
            or from any other wallet provider.
          </p>
        </div>
      </section>

      {/* ##### FAQ & Timeline Area Start ##### */}
      <div className="faq-timeline-area section-padding-50-50" id="faq">
        <div className="container">
          <div
            className="section-heading text-center"
            style={{ marginBottom: 15 }}
          >
            {/* Dream Dots */}
            <h2 className="fadeInUp" data-wow-delay="0.3s">
              FAQ
            </h2>
            <div
              className="dream-dots justify-content-center fadeInUp"
              data-wow-delay="0.2s"
            >
              <span>
                Common answers to questions about{" "}
                <span className="baktat">BAKTAT</span> Token and Farming can be
                found below.
              </span>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-12">
              <div className="dream-faq-area mt-s ">
                <dl style={{ marginBottom: 0 }}>
                  {/* Single FAQ Area */}
                  <dt
                    className="wave fadeInUp flex-space-between"
                    data-wow-delay="0.2s"
                  >
                    <span>
                      What are the <span className="baktat">BAKTAT</span> Token
                      details?
                    </span>
                    <span className="plus-circle">+</span>
                  </dt>
                  <dd className="fadeInUp" data-wow-delay="0.3s">
                    <p>
                      <span className="baktat">BAKTAT</span> Token is an ERC-20
                      token on the Ethereum blockchain. The token contract
                      address is (TBD). Please do not send any funds to this
                      token contract address, as they cannot be recovered.{" "}
                      <span className="baktat">BAKTAT</span> Token can currently
                      only be purchased through the official presale.
                    </p>
                  </dd>
                  {/* Single FAQ Area */}
                  <dt
                    className="wave fadeInUp flex-space-between"
                    data-wow-delay="0.3s"
                  >
                    <span>
                      When is the claim and launch of{" "}
                      <span className="baktat">BAKTAT</span> Token?
                    </span>
                    <span className="plus-circle">+</span>
                  </dt>
                  <dd className="fadeInUp" data-wow-delay="0.3s">
                    <p>
                      The claim period will start a number of days after the
                      conclusion of the presale. The specific date and time to
                      claim as well as the launch details will be announced on
                      our website and official social media platforms in due
                      course.
                    </p>
                  </dd>
                  {/* Single FAQ Area */}
                  <dt
                    className="wave fadeInUp flex-space-between"
                    data-wow-delay="0.4s"
                  >
                    <span>
                      How do I claim my <span className="baktat">BAKTAT</span>{" "}
                      tokens?
                    </span>
                    <span className="plus-circle">+</span>
                  </dt>
                  <dd className="fadeInUp" data-wow-delay="0.3s">
                    <p>
                      Claiming will be live on the Baktat.ai website using the
                      same wallet you used to contribute.{" "}
                      <span className="baktat">BAKTAT</span> Token is an ERC-20
                      token on the Ethereum network.
                    </p>
                  </dd>
                  {/* Single FAQ Area */}
                  <dt
                    className="wave fadeInUp flex-space-between"
                    data-wow-delay="0.5s"
                  >
                    <span>How do I contact support?</span>
                    <span className="plus-circle">+</span>
                  </dt>
                  <dd className="fadeInUp" data-wow-delay="0.3s">
                    <p>
                      Get in touch with us at support@baktat.ai or join our
                      Discord community. You can also use the contact form
                      below.
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ##### FAQ & Timeline Area End ##### */}
      {/* ##### Team Area Start ##### */}
      <section
        className="our_team_area section-padding-50-0 clearfix"
        id="team"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading text-center">
                {/* Dream Dots */}
                <div
                  className="dream-dots justify-content-center fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <span>A team of experts</span>
                </div>
                <h2 className="fadeInUp" data-wow-delay="0.3s">
                  Our Team
                </h2>
                <p class="fadeInUp" data-wow-delay="0.4s">
                  The <span className="baktat">BAKTAT</span>.ai Team is a
                  professional Crypto Team and consists of members from a wide
                  range of industries and specialist areas. Altogether, the team
                  consists of almost 20 members spread across more than five
                  countries, who bring expertise in cryptocurrencies. We are
                  united by our belief in blockchain technology and the
                  fundamental, forward-looking significance of cryptocurrencies.
                  The healthy relationship and the close interlocking of the
                  employees among each other, as well as the different
                  experience values, enables an efficient and future-oriented
                  design of <span className="baktat">BAKTAT</span>.ai
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ##### Team Area End ##### */}
      <div className="trust-section section-padding-0-0">
        <div
          className="section-heading text-center"
          style={{ marginBottom: 50 }}
        >
          {/* Dream Dots */}
          <div
            className="dream-dots justify-content-center wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <span>Sustainable Relationships</span>
          </div>
          <h2 className="wow fadeInUp" data-wow-delay="0.3s">
            Projects we support
          </h2>
          <p className="wow fadeInUp" data-wow-delay="0.4s">
            We strive for cooperations with ministries and municipalities not
            only to create jobs in the respective countries but also to have
            long-term ties with the local authorities. Whenever possible, we
            support projects with charitable purposes.
          </p>
        </div>
      </div>
      {/* ##### Footer Area Start ##### */}
      <footer
        className="footer-area bg-img"
        style={{ backgroundImage: "url(img/core-img/pattern.png)" }}
      >
        <div className="footer-content-area ">
          <div className="container">
            <div className="row ">
              <div className="col-12 col-lg-4 col-md-6">
                <div className="footer-copywrite-info">
                  {/* Copywrite */}
                  <div
                    className="copywrite_text fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <div className="footer-logo">
                      <a href="#">
                        <img src="img/custom/coin_transparent.png" alt="logo" />{" "}
                        <span className="baktat">BAKTAT</span> Farming
                      </a>
                    </div>
                  </div>
                  {/* Social Icon */}
                  <div
                    className="footer-social-info fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <a href="https://www.facebook.com/Baktatio-101428919141727">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                    <a href="https://www.x.com/baktatai">
                      <i className="fa fa-x" aria-hidden="true" />
                    </a>
                    <a href="https://www.instagram.com/baktat.ai">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                    <a href="https://www.reddit.com/user/Baktat_Official">
                      <i className="fa fa-reddit" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 col-md-3">
                <div className="contact_info_area d-sm-flex justify-content-between">
                  {/* Content Info */}
                  <div
                    className="contact_info mt-x text-center fadeInUp"
                    data-wow-delay="0.3s"
                  >
                    <h5>Legal Information</h5>
                    <a href="imprint.html">
                      <p>Imprint</p>
                    </a>
                    <a href="privacy.html">
                      <p>Privacy Policy</p>
                    </a>
                    <a href="files/tos.pdf" target="_blank">
                      <p>Terms of Service</p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5 col-md-3">
                <div className="contact_info_area d-sm-flex justify-content-between">
                  {/* Content Info */}
                  <div
                    className="contact_info mt-x text-center fadeInUp"
                    data-wow-delay="0.3s"
                  >
                    <h5>About Us</h5>
                    <p>Farmland (168 Robinson Road, Singapore 068912)</p>
                    <a href="mailto:support@baktat.ai">
                      <p>support@baktat.ai</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: 10 }}>
              <div className="col-12 ">
                <div className="contact_info_area d-sm-flex justify-content-between">
                  {/* Content Info */}
                  <div
                    className="contact_info mt-s text-center fadeInUp "
                    data-wow-delay="0.4s"
                  >
                    <h5>
                      Copyright © 2024 <span className="baktat">BAKTAT</span>
                      COIN
                    </h5>
                    <p>
                      Cryptocurrency may be unregulated in your jurisdiction.
                      The value of cryptocurrencies may go down as well as up.
                      Profits may be subject to capital gains or other taxes
                      applicable in your jurisdiction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* ##### Footer Area End ##### */}
    </>
  );
}

export default Home;
