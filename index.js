

import { menuArray } from "/data.js"

const itemsList = document.getElementById('items-list')
const cart = document.getElementById('cart')
const paymentForm = document.getElementById('pay-form')
const price = document.getElementById('price')
const cartItemContainer = document.getElementById('cart-item-container')
let itemsArray = []
let itemCounts = {}
let cartArray = []
let arrayNames = []


document.addEventListener('click', function(e){
    if(e.target.dataset.addbtn){
        addItem(getItemObj(e.target.dataset.addbtn))
        console.log(e.target.dataset.addbtn)
    }
    if(e.target.dataset.removebtn){
        removeItem(getItemObj(e.target.dataset.removebtn))
    }
    if(e.target.id == 'order-btn'){
        show(paymentForm)
    }
    if(e.target.id == 'pay-btn'){
            e.preventDefault()
            orderComplete()
    }
    })

function getItemObj(chosenItem){
    let itemObj = menuArray.filter(item =>{
        return item.id == chosenItem})[0]
    return itemObj

}


function addItem(itemObj){
    itemsArray.push(itemObj)
    console.log(itemsArray)
    // I call the function to count the items
    getCartObj(itemObj)
    }


function removeItem(itemObj){
    console.log(itemObj)
    // let index = itemsArray.findIndex(object => {
    //     return object.id === itemObj.id
    // })
    // itemsArray.splice(index, 1)
    // console.log(itemsArray)
    // getCartObj(itemObj)
}

function itemsCount(obj){
    // I reset the arrayNames array
    arrayNames = []
    // 
    itemsArray.forEach(item => { arrayNames.push(item.name)})
    let itemCounts = arrayNames.filter(item => {return obj.name === item}).length
    return itemCounts
}

function getCartObj(obj){
    // I create an object with the name of the item, the number of times it appears in the array and the price
    let itemCountsObj = {name: obj.name, 
                         value: itemsCount(obj), 
                         price: obj.price
                        }    
    getCartArray(itemCountsObj)
}

function getCartArray(itemObj){
    // I check if the item is already in the cartArray
    if(cartArray.some(item => {return item.name === itemObj.name})){
        // If it is, I update the value of the item
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




// function hide(div){
//     if(!div.classList.contains('hidden')){
//         div.classList.add('hidden')
//     }
// }
    

function show(div){
    if(div.classList.contains('hidden')){
        div.classList.remove('hidden')
    }
}

function renderCart(index){
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
            <button id="remove-btn" class="remove-btn" data-removebtn="${index}">Remove</button>
            <h3 id='item-price'>$${item.price}</h3>
        </div>
        `
    })
    cartItemContainer.innerHTML = cartHtml
    price.innerHTML = `$${getTotalPrice()}`
    show(cart)
}

function getTotalPrice(){
    let totalPrice = 0
    // I loop through the cartArray to get the total price
    cartArray.forEach(item => {totalPrice += item.price})
    return totalPrice
}

function orderComplete(){
    const orderCompleted = document.getElementById('order-complete')
    //I split the name value string(array) at the space, to get the first name
    const firstName = document.getElementById('card-name').value.split(' ')[0]
    hide(paymentForm)
    hide(cart)
    orderCompleted.innerHTML = `
    <h2 id="thanks">Thanks, ${firstName}! Your order is on its way!</h2>`
    show(orderCompleted)
}

  
    





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


function render(){
    itemsList.innerHTML = mainHtml()
}

render()