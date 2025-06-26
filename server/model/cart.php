<?php
  /**
   * fetch cart items of the user to display
   */
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Access-Control-Allow-Methods: *');

  session_start();

  require_once("./database.php");
  
  $userId = $_POST['userId'];
  $cartItemsSelect = "SELECT cartitems.productId, cartitems.colorId, 
                              cartitems.sizeId, cartitems.quantity
                      FROM users INNER JOIN cart 
                      ON users.id = cart.userId 
                      INNER JOIN cartitems 
                      ON cart.id = cartitems.cartId
                      WHERE users.id = '$userId'";
  $cartItemsSelectResult = mysqli_query($conn, $cartItemsSelect);
  $cartItemsArr = mysqli_fetch_all($cartItemsSelectResult, MYSQLI_ASSOC);

  echo json_encode($cartItemsArr);
?>