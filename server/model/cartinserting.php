<?php
/**
 * inserting item informations from cart into database
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
  $error = "failed to insert :(";

  // check if the user logged in already has had a cart or not
  // if not then create 1 else ignore
  $cartCheck = "SELECT * FROM cart WHERE userId = '$userId'";
  $cartCheckResult = mysqli_query($conn, $cartCheck);
  $cartCheckRow = mysqli_num_rows($cartCheckResult);

  if ($cartCheckRow <= 0) {
    $cartInsert = "INSERT INTO cart(userId) VALUES('$userId')";
    mysqli_query($conn, $cartInsert);
  } 

  // find the cart (id) of the user
  $cartSelect = "SELECT id FROM cart WHERE userId = '$userId'";
  $cartSelectResult = mysqli_query($conn, $cartSelect);
  $cartSelectArr = mysqli_fetch_assoc($cartSelectResult);

  // check if the product has had already in the cart 
  $cartItemSelect = "SELECT * FROM cartitems 
                      WHERE cartId = '".$cartSelectArr['id']."'AND
                      productId = '".$productId."' AND
                      colorId = '".$colorId."' AND
                      sizeId = '".$sizeId."'";
  // mysqli_query($conn, $foreignKeyCheck);
  $cartItemSelectResult = mysqli_query($conn, $cartItemSelect);
  $cartItemSelectRows = mysqli_num_rows($cartItemSelectResult);

  if ($cartItemSelectRows == 0) {
    $cartItemsInsert = "INSERT INTO cartitems(cartId, productId, colorId, sizeId, quantity)
                      VALUES('".$cartSelectArr['id']."','".$productId."','".$colorId."','".$sizeId."','".$quantity."')";
    $result = mysqli_query($conn, $cartItemsInsert);

    if ($result) {
      $error = "insert successfully!!!";
    }

  } else {
    $cartItemUpdate = "UPDATE cartitems SET quantity = '".$quantity."'
                      WHERE cartId = '".$cartSelectArr['id']."'AND
                      productId = '".$productId."' AND
                      colorId = '".$colorId."' AND
                      sizeId = '".$sizeId."'";
                      
    mysqli_query($conn, $cartItemUpdate);
    $error = "";
  }

  echo $error;
?>