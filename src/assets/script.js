/**
 * @file Adds functionality to the shopping cart (adding/removing products, computing totals).
 * @author Algorithmic Programmer
 */


/**
 * @type {Array.<Object>}
 * @typedef {Object} product
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 * @property {number} productId
 * @property {string} image
*/
const products=[
   {
      name: 'Cherry',
      price: 1.99,
      quantity: 0,
      productId: 1,
      image: 'images/cherry.jpg'
   },
   {
      name: 'Orange',
      price: 0.99,
      quantity: 0,
      productId: 2,
      image: 'images/orange.jpg'

   },
   {
      name: 'Strawberry',
      price: 1.25,
      quantity: 0,
      productId: 3,
      image: 'images/strawberry.jpg'

   }
];


/**
 * @type {Array.<Object>}
 */
const cart=[];


/**
 * @function getProductById
 * @desc helper function that gets the correct product based on productId
 * @arg {number} productId
 * @returns {Object}
 */
   function getProductById(productId) {
       return products.find((product) => product.productId === productId);
   }


/**
 * @function addProductToCart
 * @desc adds a product to the cart if it is not already in the cart
 * @arg {number} productId
*/
   function addProductToCart(productId) {
      increaseQuantity(productId);
      const product = new getProductById(productId);
      if(!cart.includes(product)) cart.push(product);
   }


/**
 * @function increaseQuantity
 * @desc increases the product's quantity
 * @arg {number} productId
*/
  function increaseQuantity(productId) {
     const product = getProductById(productId);
     product.quantity++;
  }


/**
 * @function decreaseQuantity
 * @desc decreases the quantity of the product and removes it from the cart if the quantity is 0
 * @arg {number} productId
*/
   function decreaseQuantity(productId){
      const product = getProductById(productId);
      product.quantity--;
      if(product.quantity === 0) removeProductFromCart(productId);
   }


/**
 * function removeProductFromCart
 * @desc removes select product from cart
 * @arg {number} productId
*/
    function removeProductFromCart(productId) {
       const index = cart.findIndex((product) => product.productId === productId);
       cart[index].quantity=0;
       cart.splice(index, 1);
    }


/**
 * @function cartTotal
 * @desc iterates through the cart to compute the total price of everything in the cart
 * @returns {number} cartSum
 */
   function cartTotal() {
      let cartSum =0;
      for(let i=0; i<cart.length; i++){
           let itemTotal = cart[i].price * cart[i].quantity;
           cartSum+=itemTotal;
      }
      return cartSum;
   }


/**
 * @function emptyCart
 * @desc empties the products from the cart
*/
   function emptyCart() {
      cart.length = 0;
   }


/**
 * @type {number}
*/
let totalPaid=0;


/**
 * @function pay
 * @desc computes the remaining balance after customer pays for the items in their cart; value can be negative or positive
 * @arg {number} amount
 * @returns {number} remainingBalance
*/
  function pay(amount){
     totalPaid += amount;
     let remainingBalance = totalPaid - cartTotal();
     if(remainingBalance >=0){
        totalPaid=0;
        emptyCart();
     }
     return remainingBalance;
  }


module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
}
