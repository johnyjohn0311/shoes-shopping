<?php 
  /**
   * fetching colors from database
   */
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Access-Control-Allow-Methods: *');
  
  require_once("./database.php");

  $sql = "SELECT * FROM colors";
  $result = mysqli_query($conn, $sql);
  $colors = mysqli_fetch_all($result, MYSQLI_ASSOC);
  
  echo json_encode($colors);
?>