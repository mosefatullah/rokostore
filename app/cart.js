document.addEventListener("DOMContentLoaded", function () {
 var selectedCartSize = 0;

 function selectedCartSizeMath() {
  document.querySelector(".__cart_body .top .selectItem span").innerText =
   selectedCartSize;
 }

 /* Cart Go to Shipping Button */
 var cartGoToShipping = function () {
  if (selectedCartSize <= 0) {
   document.querySelectorAll(".__cart_body .bottom button")[1].disabled = true;
  } else if (selectedCartSize > 0) {
   document.querySelectorAll(".__cart_body .bottom button")[1].disabled = false;
  }
 };
 /* End Cart Go to Shipping Button */

 /* Cart Total */
 var cartPriceTotalMath = function () {
  let cartTotalPrice = document.querySelector(
   ".__cart_body .top .cartPriceTotal"
  );
  let cartItemsTotal = document.querySelectorAll(".__cart_body .middle li");
  let totalPrice = 0;
  cartItemsTotal.forEach(function (item) {
   if (item.querySelector(".cartSelect").checked) {
    totalPrice +=
     parseInt(item.querySelector(".cartPrice .price").innerText) *
     parseInt(item.querySelector(".cartSize .input").innerText);
   }
  });
  cartTotalPrice.innerText = totalPrice;
  selectedCartSizeMath();
  if (selectedCartSize === cartItemsTotal.length && cartItemsTotal.length > 0) {
   document.getElementById("selectAllCart").checked = true;
  }
 };
 cartPriceTotalMath();
 /* End Cart Total */

 /* Cart Select */
 var selectOneCart = function () {
  let cartSelect = document.querySelectorAll(
   ".__cart_body .middle li .cartSelect"
  );
  cartSelect.forEach(function (item) {
   item.addEventListener("click", function () {
    item.parentElement.parentElement.classList.toggle("active");
    document.getElementById("selectAllCart").checked = false;
    if (item.checked) selectedCartSize++;
    else if (!item.checked && selectedCartSize >= 0) selectedCartSize--;
    cartPriceTotalMath();
    selectedCartSizeMath();
    cartGoToShipping();
   });
  });
 };
 selectOneCart();

 var selectAllCart = function () {
  let selectAllBtn = document.getElementById("selectAllCart");
  let allCarts = document.querySelectorAll(".__cart_body .middle li");
  let totalCartNumber = document.querySelector(".selectItem b");
  totalCartNumber.innerText = allCarts.length;
  selectAllBtn.addEventListener("click", function () {
   if (selectAllBtn.checked) {
    selectedCartSize = 0;
    allCarts.forEach(function (item) {
     item.className = "active";
     item.querySelector(".cartSelect").checked = true;
     selectedCartSize++;
    });
    cartPriceTotalMath();
    selectedCartSizeMath();
    cartGoToShipping();
    return;
   } else {
    allCarts.forEach(function (item) {
     item.classList.remove("active");
     item.querySelector(".cartSelect").checked = false;
     selectedCartSize = 0;
    });
    cartPriceTotalMath();
    selectedCartSizeMath();
    cartGoToShipping();
    return;
   }
  });
  if (selectedCartSize <= 0) {
   document.getElementById("selectAllCart").checked = false;
   if (allCarts.length <= 0) {
    document.querySelector(
     ".__cart_body .top .selectItem input"
    ).disabled = true;
   } else {
    document.querySelector(
     ".__cart_body .top .selectItem input"
    ).disabled = false;
   }
  }
 };
 selectAllCart();

 /* End Cart Select */

 /* Cart Size */
 let cartItems = document.querySelectorAll(".__cart_body .middle li");
 cartItems.forEach(function (item) {
  let btnPlus = item.querySelector(".btn-plus");
  let btnMinus = item.querySelector(".btn-minus");
  let quantityInput = item.querySelector(".cartSize .input");

  btnPlus.addEventListener("click", function () {
   let currentValue = parseInt(quantityInput.innerText);
   quantityInput.innerText = currentValue + 1;
   cartPriceTotalMath();
  });

  btnMinus.addEventListener("click", function () {
   let currentValue = parseInt(quantityInput.innerText);
   if (currentValue > 1) {
    quantityInput.innerText = currentValue - 1;
    cartPriceTotalMath();
   }
  });
 });

 /* End Cart Size */

 /* Cart Delete */
 let cartDelete = document.querySelectorAll(
  ".__cart_body .middle li .cartDelete"
 );
 cartDelete.forEach(function (item) {
  item.addEventListener("click", function () {
   setTimeout(function () {
    item.parentElement.parentElement.parentElement.remove();
    cartPriceTotalMath();
    if (
     item.parentElement.parentElement.parentElement.querySelector(
      ".left .cartSelect"
     ).checked
    )
     selectedCartSize--;
    selectAllCart();
    selectedCartSizeMath();
    cartGoToShipping();
   }, 200);
  });
 });
 /* End Cart Delete */

 /* Cart Auto Selected */
 var cartAutoSelected = function () {
  let allCarts = document.querySelectorAll(".__cart_body .middle li");
  selectedCartSize = allCarts.length;
  allCarts.forEach(function (item) {
   document.getElementById("selectAllCart").checked = true;
   item.querySelector(".cartSelect").checked = true;
   item.classList.toggle("active");
   cartPriceTotalMath();
   selectedCartSizeMath();
   selectedCartSizeMath();
  });
 };
 cartAutoSelected();
 cartGoToShipping();
 /* End Cart Auto Selected */
});
