<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Access-Control-Allow-Methods: *');

  session_start();
  
  require_once("./database.php");
  
  $userSelect = "SELECT * FROM users WHERE id = '".$_SESSION['userId']."'";
  $userResult = mysqli_query($conn, $userSelect);
  $userArr = mysqli_fetch_assoc($userResult);
?>