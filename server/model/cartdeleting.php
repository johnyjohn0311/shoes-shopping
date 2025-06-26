<?php
  /**
   * update the cart each time a user change the quantity
   */
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Access-Control-Allow-Methods: *');

  session_start();

  require_once("./database.php");
  
  $productId = $_POST['productId'];
  $colorId = $_POST['colorId'];
  $sizeId = $_POST['sizeId'];
  $userId = $_POST['userId'];
  $error = "failed to delete :(";

  // find the cart (id) of the user
  $cartSelect = "SELECT id FROM cart WHERE userId = '$userId'";
  $cartSelectResult = mysqli_query($conn, $cartSelect);
  $cartSelectArr = mysqli_fetch_assoc($cartSelectResult);

  // delete item from cart
  $cartDelete = "DELETE FROM cartitems 
                 WHERE cartId = '".$cartSelectArr['id']."'AND
                 productId = '".$productId."' AND
                 colorId = '".$colorId."' AND
                 sizeId = '".$sizeId."'";
  $result = mysqli_query($conn, $cartDelete);

  if ($result) {
    $error = "delete successfully";
  }

  echo $error;
?>