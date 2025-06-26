<?php
  /**
   * sign up 
   */
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Access-Control-Allow-Methods: *');

  require_once("./database.php");

  if (isset($_POST['userName'])) {
    $userName = $_POST['userName'];
    $email = $_POST['email'];
    $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);
    $hashPassword = password_hash($password, PASSWORD_DEFAULT);
    $cpassword = filter_input(INPUT_POST, 'cpassword', FILTER_SANITIZE_SPECIAL_CHARS);
    $userNameErr = '';
    $emailErr = '';
    $passwordErr = '';
    $cpasswordErr = '';
    $emailDuplicate = '';
    $success = '';
    $userId = '';

    if (empty($userName)) {
      $userNameErr = '<div>your name is empty!</div>';
    } else {
      if (strlen($userName) > 50) {
        $userNameErr = '<div>your name exceeds 25 characters!</div>';
      }
    }

    if (empty($email)) {
      $emailErr = '<div>your email is empty!</div>';
    } else {
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailErr = '<div>invalid email!</div>';
      }
    }

    if (empty($password)) {
      $passwordErr = '<div>your password is empty!</div>';
    } else {
      if (strlen($password) < 6) {
        $passwordErr = '<div>your password should be at least 6 characters!</div>';
      }
    }

    if ($password !== $cpassword) {
      $cpasswordErr = '<div>confirm password does not match!</div>';
    }

    // get the email from database if it exist 
    $emailSelect = "SELECT * FROM users WHERE email = '$email'";
    $emailResult = mysqli_query($conn, $emailSelect);
    $emailRow = mysqli_num_rows($emailResult);

    if ($emailRow > 0) {
      $emailDuplicate = '<div>the email already exist!</div>';
    }

    // check if no error occurs the we insert user informations into database
    if ($userNameErr == '' && $emailErr == ''&&
      $passwordErr == '' && $cpasswordErr == '' && $emailDuplicate == '') {
      $insertUser = "INSERT INTO users(name, email, password) VALUES(?, ?, ?)";
      $innit = mysqli_stmt_init($conn);
      $innitPrepare = mysqli_stmt_prepare($innit, $insertUser);

      if ($innitPrepare) {
        mysqli_stmt_bind_param($innit, "sss", $userName, $email, $hashPassword);
        mysqli_stmt_execute($innit);

        // start a session when sign up successfully
        session_start();

        $result = mysqli_query($conn, $emailSelect);
        $user = mysqli_fetch_assoc($result);
        $_SESSION['userId'] = $user['id'];
        $userId = $_SESSION['userId'];
      }
      
      $success = 'sign up successfully!!!';
    }

    $output = array(
      'success' => $success,
      'userNameErr' => $userNameErr,
      'emailErr' => $emailErr,
      'passwordErr' => $passwordErr,
      'cpasswordErr' => $cpasswordErr,
      'emailDuplicate' => $emailDuplicate,
      'userId' => $userId
    );
    echo json_encode($output);
  }
?>