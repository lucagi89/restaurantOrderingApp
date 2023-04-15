

import { menuArray } from "/data.js"

const itemsList = document.getElementById('items-list')
const cart = document.getElementById('cart')
const paymentForm = document.getElementById('pay-form')
let cartArray = []


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
    cartArray.push(itemObj)
    renderCart()
    }

function removeItem(item){
    cartArray.splice(item, 1)
    renderCart()
    if(cartArray.length == 0){
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

function renderCart(){
    const cartItemContainer = document.getElementById('cart-item-container')
    const price = document.getElementById('price')
    let totalPrice = 0
    let cartItemsHtml = ''
    if (cartArray){
     cartArray.forEach(function(cartItem, index){
        totalPrice += cartItem.price
        cartItemsHtml += `
        <div id = "cart-item" class = "cart-item">
            <h2 id="item-name" class="item-name">${cartItem.name}</h2>
            <button id="remove-btn" class="remove-btn" data-removebtn="${index}">Remove</button>
            <h3 id='item-price'>$${cartItem.price}</h3>
        </div>
        `
    })
    price.textContent = `$${totalPrice}`
    cartItemContainer.innerHTML = cartItemsHtml
    show(cart)

}
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