<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Access-Control-Allow-Methods: *');

  session_start();

  unset($_SESSION['userId']);
  
  echo "log out successfully!!!";
?>