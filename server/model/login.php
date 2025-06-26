<?php
  /**
   * login procedure 
   */
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Access-Control-Allow-Methods: *');

  require_once("./database.php");

  if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);
    $success = '';
    $emailErr = '';
    $passwordErr = '';
    $userId = '';

    if (!empty($email)) {
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailErr = '<div>Invalid email!</div>';
      }
    } else {
      $emailErr = '<div>Please enter your email!</div>';
    } 

    // check if the email exists
    $emailSelect = "SELECT * FROM users WHERE email = '$email'";
    $emailResult = mysqli_query($conn, $emailSelect);
    $emailRow = mysqli_num_rows($emailResult);
    $user = mysqli_fetch_assoc($emailResult);
    
    if ($emailRow == 0) {
      $emailErr = '<div>The email does not exists!</div>';
    }

    if ($emailErr == '') {
      if (password_verify($password, $user['password'])) {
        session_start();
        $_SESSION['userId'] = $user['id'];
        $userId = $user['id'];
        $success = 'login successfully!!!';
      } else {
        $passwordErr = '<div>Wrong password!</div>';
      }
    }

    $output = array(
      'success' => $success,
      'emailErr' => $emailErr,
      'passwordErr' => $passwordErr,
      'userId' => $userId
    );

    echo json_encode($output);
  }
?>