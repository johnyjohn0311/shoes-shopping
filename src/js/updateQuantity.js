/**
 * update quantity
*/
let subtractBtns = document.querySelectorAll('.subtractBtn');
let plusBtns = document.querySelectorAll('.plusBtn');
let quantityInputs = document.querySelectorAll('.details__number__input');

plusBtns.forEach((btn, index) => {
  btn.onclick = function() {
    quantityInputs[index].value++;
  }
});

subtractBtns.forEach((btn, index) => {
  btn.onclick = function() {
    if (quantityInputs[index].value > 1) {
      quantityInputs[index].value--;
    }
  }
});

