

import { menuArray } from "/data.js";

const mainSection = document.getElementById('main')



function mainHtml(){
    let mainHtml = ''

    for (let menuItem of menuArray){
        mainHtml += `
        <div id = "item" class = "item">
        <div id="emoji" class="emoji">
        ${menuItem.emoji}
        </div>
        <div id = "description" class = "description">
        <h2>${menuItem.name}</h2>
        <p>${menuItem.ingredients}</p>
        <h3>$${menuItem.price}</h3>
        </div>
        <button id="add-btn" class="add-btn" data-add="${menuItem.id}">+</button>
        </div>
        `
    }
    return mainHtml
}


function render(){
    mainSection.innerHTML = mainHtml()
}

render()