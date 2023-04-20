

import { menuArray } from "/data.js"

const itemsList = document.getElementById('items-list')
const cart = document.getElementById('cart')
const paymentForm = document.getElementById('pay-form')
let itemsArray = []
let itemCounts = {}


document.addEventListener('click', function(e){
    if(e.target.dataset.addbtn){
        addItem(e.target.dataset.addbtn)
    }
    if(e.target.dataset.removebtn){
        removeItem(e.target.dataset.removebtn)
    }
    if(e.target.id == 'order-btn'){
        show(paymentForm)
    }
    if(e.target.id == 'pay-btn'){
            e.preventDefault()
            orderComplete()
    }
    })




function addItem(idItem){
    const itemObj = menuArray.filter(function(item){
        return item.id == idItem})[0]
    itemsArray.push(itemObj)
    itemsCountFunction(itemObj)
    }

function itemsCountFunction(obj){
    const arrayNames = []
    itemsArray.forEach(item => { arrayNames.push(item.name)})
    itemCounts = arrayNames.filter(item => {return obj.name === item}).length
    let itemCountsObj = {name: obj.name, value: itemCounts}    
    
    console.log(itemCountsObj)
    renderCart(itemCountsObj)
}



function removeItem(item){
    itemsArray.splice(item, 1)
    renderCart()
    if(itemsArray.length == 0){
        cart.classList.add('hidden')
    }
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



function hide(div){
    if(!div.classList.contains('hidden')){
        div.classList.add('hidden')
    }
}
    

function show(div){
    if(div.classList.contains('hidden')){
        div.classList.remove('hidden')
    }
}

function renderCart(name, value){
    const cartItemContainer = document.getElementById('cart-item-container')
    const price = document.getElementById('price')
    let letterS = ''
    let totalPrice = 0
    let cartItemsHtml = ''

    if(value>1){
        letterS = 's'
    }
    else{
        letterS = ''
    }
        let itemObj = itemsArray.filter(function(item){ 
            return item.name === name})[0]
        totalPrice += itemObj.price
        cartItemsHtml += `
        <div id = "cart-item" class = "cart-item">
            <h2 id="item-name" class="item-name">${itemObj.value} ${itemObj.name}${letterS}</h2>
            <button id="remove-btn" class="remove-btn" data-removebtn="x">Remove</button>
            <h3 id='item-price'>$${itemObj.price*cartItem.value}</h3>
        </div>
        `
    }
    price.textContent = `$${totalPrice}`
    cartItemContainer.innerHTML = cartItemsHtml
    show(cart)

}





function mainHtml(){
    let listHtml = ''

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