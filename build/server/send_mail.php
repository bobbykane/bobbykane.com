<?php
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin');
header('Access-Control-Allow-Credentials: True');

if(isset($_POST)) {

	include('PHPMailerAutoload.php');

	$user_fname   = $_POST['firstName'];
	$user_lname   = $_POST['lastName'];
	$user_email   = $_POST['emailAddress'];
	$user_subject = $_POST['whatBrings'];
	$user_message = html_entity_decode($_POST['whatsOn']);
	$user_budget  = $_POST['budget'];
	
	$mail = new PHPMailer;

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.gmail.com;';  // Specify main and backup server
	$mail->SMTPAuth = true;
	$mail->Port = 465;                                // Enable SMTP authentication
	$mail->Username = 'talk@bobbyjkane.com';                            // SMTP username
	$mail->Password = '465ulltwice';                           // SMTP password
	$mail->SMTPSecure = 'ssl';                            // Enable encryption, 'ssl' also accepted
	$mail->From = $user_email;
	$mail->FromName = $user_fname." ".$user_lname;
	$mail->addAddress('talk@bobbyjkane.com');            // Name is optional
	$mail->isHTML(true);                                  // Set email format to HTML
	$mail->Subject = 'New Contact Submission - '.$user_subject;
	$mail->Body    = 'From: '.$user_fname.' '.$user_lname.' '.$user_email.'<br><br>'.$user_message.'<br><br>Budget: '.$user_budget;

	if(!$mail->send()) {
	   $result = array(
			'success' => FALSE,
			'message' => 'Could not send email because of the following error'  . $mail->ErrorInfo
		);
	}
	else {
		 $result = array(
			'success' => TRUE,
			'message' => '<span class="message">Thanks! Now, just check your inbox.</span>',
		);
	}
}
else {
	$result = array(
		'success' => FALSE,
		'message' => 'You do not have access to this script'
	);
}
	
	echo json_encode($result);
?>