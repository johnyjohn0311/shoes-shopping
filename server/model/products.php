<?php 
  /**
   * fetching products from database
   */
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Access-Control-Allow-Methods: *');

  require_once("./database.php");
  
  $sql = "SELECT * FROM products";
  $result = mysqli_query($conn, $sql);
  $products = mysqli_fetch_all($result, MYSQLI_ASSOC);
  
  echo json_encode($products);
?>