<?php
  // hostname, user name, password, database name
  $conn = mysqli_connect('localhost','root','','shoesshop');

  if(!$conn) {
    die("could not connect!");
  }
?>