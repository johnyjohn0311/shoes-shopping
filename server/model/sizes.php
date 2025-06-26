<?php 
  /**
   * fetching sizes from database
   */
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Access-Control-Allow-Methods: *');

  require_once("./database.php");
  
  $sql = "SELECT * FROM sizes";
  $result = mysqli_query($conn, $sql);
  $sizes = mysqli_fetch_all($result, MYSQLI_ASSOC);
  
  echo json_encode($sizes);
?>