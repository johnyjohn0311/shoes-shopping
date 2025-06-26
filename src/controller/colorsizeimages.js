/**
 * fetching colors from server
 */
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8080/colors.php", true);
xhr.send();
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let colors = JSON.parse(this.responseText);
    localStorage.setItem('colors', JSON.stringify(colors));
  }
}

/**
 * fetching sizes of products from server
 */
var xhr1 = new XMLHttpRequest();
xhr1.open("GET", "http://localhost:8080/sizes.php", true);
xhr1.send();
xhr1.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let sizes = JSON.parse(this.responseText);
    localStorage.setItem('sizes', JSON.stringify(sizes));
  }
}

/**
 * fetching subimages of products from server
 */
var xhr2 = new XMLHttpRequest();
xhr2.open("GET", "http://localhost:8080/subimages.php", true);
xhr2.send();
xhr2.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let subImages = JSON.parse(this.responseText);
    localStorage.setItem('subImages', JSON.stringify(subImages));
  }
}
