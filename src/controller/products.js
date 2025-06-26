/**
 * fetching products from server
 */
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8080/products.php", true);
xhr.send();
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let products = JSON.parse(this.responseText);
    localStorage.setItem('products', JSON.stringify(products));
  }
}