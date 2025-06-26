<?php 
  /**
   * fetching colors from database
   */
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Access-Control-Allow-Methods: *');

  require_once("./database.php");
  
  $sql = "SELECT * FROM subimages";
  $result = mysqli_query($conn, $sql);
  $subimages = mysqli_fetch_all($result, MYSQLI_ASSOC);
  
  echo json_encode($subimages);
?>