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
  $quantity = $_POST['quantity'];
  $userId = $_POST['userId'];
  $error = "failed to update :(";

  // find the cart (id) of the user
  $cartSelect = "SELECT id FROM cart WHERE userId = '$userId'";
  $cartSelectResult = mysqli_query($conn, $cartSelect);
  $cartSelectArr = mysqli_fetch_assoc($cartSelectResult);

  // update the cart quantity
  $cartItemUpdate = "UPDATE cartitems SET quantity = '".$quantity."'
  WHERE cartId = '".$cartSelectArr['id']."'AND
  productId = '".$productId."' AND
  colorId = '".$colorId."' AND
  sizeId = '".$sizeId."'";
  $result = mysqli_query($conn, $cartItemUpdate);
  
  if ($result) {
    $error = "update successfully";
  }

  echo $error;
?>