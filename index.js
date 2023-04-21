

import { menuArray } from "/data.js"

const itemsList = document.getElementById('items-list')
const cart = document.getElementById('cart')
const paymentForm = document.getElementById('pay-form')
const price = document.getElementById('price')
const cartItemContainer = document.getElementById('cart-item-container')
const payForm = document.getElementById('pay-form')
// I create an array to store the items added to the cart
let itemsArray = []
// I create an array to store the items in the cart and their number of times they appear
let cartArray = []
let arrayNames = []

// function to render the menu
function mainHtml(){
    let listHtml = ''
    // I loop through the menuArray to create the html
    for (let menuItem of menuArray){
        listHtml += `
        <div id = "item" class = "item">
        <div id="emoji" class="emoji">
        ${menuItem.emoji}
        </div>
        <div id = "description" class = "description">
        <h2>${menuItem.name}</h2>
        <p>${menuItem.ingredients}</p>
        <h3>$${menuItem.price}</h3>
        </div>
        <button id="add-btn" class="add-btn" data-addbtn="${menuItem.id}">+</button>
        </div>
        `
    }
    return listHtml
}

// I create an event listener to listen for clicks on all the buttons on the page
document.addEventListener('click', function(e){
    if(e.target.dataset.addbtn){
        addItem(getItemObj(e.target.dataset.addbtn))
        hide(orderCompleted)
    }
    if(e.target.dataset.removebtn){
        removeItem(getItemObj(e.target.dataset.removebtn))
    }
    if(e.target.id == 'order-btn'){
        show(paymentForm)
    }
    })


// I create a function to get the selected item object from the menuArray
function getItemObj(chosenItem){
    let itemObj = {}
    // I filter the menuArray to get the object with the id or name that matches the chosenItem
    itemObj = menuArray.filter(item => 
        {return item.id == chosenItem || item.name == chosenItem})[0]
    return itemObj
    }
function addItem(itemObj){
    // I add the item to the itemsArray
    itemsArray.push(itemObj)
    //I call the function to count the items
    getCartObj(itemObj)
    }
function removeItem(itemObj){
    // I get the index of the item in the itemsArray
    let index = itemsArray.findIndex(object => {
        return object.id === itemObj.id
    })
    // I remove the item from the itemsArray
    itemsArray.splice(index, 1)
    // I get the index of the item in the cartArray
    let indexCartArray = cartArray.findIndex(object => {
        return object.name === itemObj.name
    })
    // I update the quantity of the items in cartArray and the summed price
    cartArray[indexCartArray].value -= 1
    cartArray[indexCartArray].price -= itemObj.price
    // I remove the item from the cartArray if the quantity is 0
    if(cartArray[indexCartArray].value === 0){
        cartArray.splice(indexCartArray, 1)
    }
    renderCart()
}
// I create a function to render the number of a certain item in the cart
function itemsCount(obj){
    // I reset the arrayNames array
    arrayNames = []
    // I use arrayNames to store the only the names of the items in the itemsArray
    itemsArray.forEach(item => { arrayNames.push(item.name)})
    // I do this to count the number of times the item appears in the array
    let itemCounts = arrayNames.filter(item => {return obj.name === item}).length
    // I return the number of times the item appears in the array
    return itemCounts
}
// I create a function to get the object of a single item with the name, 
//number of times it appears in the array and the price
function getCartObj(obj){
    let itemCountsObj = {name: obj.name, 
                         value: itemsCount(obj), 
                         price: obj.price
                        } 
    // I call the function to add the item to the cartArray
    getCartArray(itemCountsObj)
}
// this function adds the item to the cartArray or updates the quantity and price
//this way I can loop through the cartArray to render the cart
function getCartArray(itemObj){
    // I check if the item is already in the cartArray
    if(cartArray.some(item => {return item.name === itemObj.name})){
        // If it is, I find it's index in cartArray
    let index = cartArray.findIndex(item => {return item.name === itemObj.name})
    // I update the value of the item and the price
    cartArray[index].value = itemObj.value
    cartArray[index].price = itemObj.price*itemObj.value
    }else{
        // If it isn't, I add the item to the cartArray
        cartArray.push(itemObj)
    }
    renderCart()

}
// function to hide an element when is not needed
function hide(div){
    if(!div.classList.contains('hidden')){
        div.classList.add('hidden')
    }
}
// function to show an element when needed    
function show(div){
    if(div.classList.contains('hidden')){
        div.classList.remove('hidden')
    }
}

function renderCart(){
    if (!cartArray.length == 0){
        show(cart)
    }else{
        hide(cart)
    }
    // I create an 's' variable to add in case of more than one item
    let letterS = ''
    // I create a variable to store the cart html
    let cartHtml = ''
    // I loop through the cartArray to create the html
    cartArray.forEach(item =>{
        if(item.value>1){
            letterS = 's'
        }else{
            letterS = ''
        }
    cartHtml += `
        <div id = "cart-item" class = "cart-item">
            <h2 id="item-name" class="item-name">${item.value} ${item.name}${letterS}</h2>
            <button id="remove-btn" class="remove-btn" data-removebtn="${item.name}">Remove</button>
            <h3 id='item-price'>$${item.price}</h3>
        </div>
        `
    })
    cartItemContainer.innerHTML = cartHtml
    price.innerHTML = `$${getTotalPrice()}`
}

function getTotalPrice(){
    let totalPrice = 0
    // I loop through the cartArray to get the total price
    cartArray.forEach(item => {totalPrice += item.price})
    return totalPrice
}

payForm.addEventListener('submit', function(e){
    // I prevent the default behaviour of the form
    e.preventDefault()

    const orderCompleted = document.getElementById('order-complete')
    const nameInput = document.getElementById('card-name')
    const cardNumberInput = document.getElementById('card-number')
    const cvvInput = document.getElementById('card-cvv')
    const nameCustomer = new FormData(payForm).get('name')
    const nameOnly = /^[a-zA-Z]+$/
    if (!nameOnly.test(nameInput.value)) {
        nameInput.classList.add('red')
        alert("Please enter a valid name.")
        return false;
    }


    // Validate the card number input using a regular expression
  const cardNumberRequirement = /^\d+$/
  if (!cardNumberRequirement.test(cardNumberInput.value)) {
        cardNumberInput.classList.add('red')
        alert("Please enter a valid card number.")
        return false;
        }


  // Validate the cvv input
  if (cvvInput.value.length !== 3) {
    cvvInput.classList.add('red')
    alert("Please enter a valid CVV.");
    return false;
  }

  //I split the name value string(array) at the space, to get the first name
  const firstName = nameCustomer.split(' ')[0]
  // I render the order completed message
  orderCompleted.innerHTML = `
  <h2 id="thanks">Thanks, ${firstName}! Your order is on its way!</h2>`
  show(orderCompleted)
  // I hide the payment form and the cart
  hide(paymentForm)
  hide(cart)
  initialize()

  // If all input values are valid, submit the form
  return true;
}
)

 function initialize(){
    // I reset the arrays
  itemsArray = []
  cartArray = []
  arrayNames = []
    // I reset the cart html
    cartItemContainer.innerHTML = ''
    // I reset the price
    price.innerHTML = ''
    // I hide the order completed message
    hide(orderComplete)
   //empty the form data
    payForm.reset()
    // I call the function to render the items
    render()
}



function render(){
    itemsList.innerHTML = mainHtml()
}

render()