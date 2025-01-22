<?php
if (isset($_REQUEST['name'],$_REQUEST['email'])) {
      
    $name = $_REQUEST['name'];
	$subject = $_REQUEST['subject'];
    $email = $_REQUEST['email'];
    $message = $_REQUEST['message'];
      
    // Set your email address where you want to receive emails. 
    $to = 'support@baktat.io';
      
    $subjectModified = 'Contact Request From Baktat.io: '.$subject;
    $headers = "From: ".$name." <".$email."> \r\n";
    
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $send_email = mail($to,$subjectModified,$message,$headers);
        echo ($send_email) ? 'success' : 'error';
    } else {
        echo 'error';
    }



}
?>