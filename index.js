const itemContainer = document.querySelector(".items-container")
const storeItem = document.querySelectorAll(".store-item")
const itemName = document.querySelector(".item-name")
const price = document.querySelector(".price")
const cart = document.querySelector(".cart")
const summary = document.querySelector(".summary")
const section = document.querySelector(".section")

const priceItem = {}
const cartPrice = {}

storeItem.forEach(function(item) {
    item.addEventListener("submit", function(event) {
        event.preventDefault()

        const name = item.querySelector(".item-name").textContent
        const itemPrice = parseFloat(item.querySelector(".price").textContent)
        const quantity = item.querySelector(".qty").value
        quantity === "" ? cartPrice[name.toLowerCase()] = itemPrice : cartPrice[name.toLowerCase()] = itemPrice * parseFloat(quantity)

        sum(cartPrice, cart)
        priceItem[name.toLowerCase()] = itemPrice
    })
})

cart.addEventListener("click", function() {
    const div = document.createElement("div")
    div.classList.add("showTotals")
    if(Object.keys(cartPrice).length !== 0) {
        Object.keys(cartPrice).forEach(function(item) {
            const p = document.createElement("p")
            p.innerText = `${cartPrice[item]/priceItem[item]} quantities of ${item} was added. That costs ${cartPrice[item]}`
            div.appendChild(p)
        })
        const total = document.createElement("p")
        total.innerText = `Total cost is ${sum(cartPrice, cart)}`
        div.appendChild(total)
    }
    if(summary.children.length === 1){
        summary.removeChild(summary.children[0])
        summary.appendChild(div)
    } else {
        summary.appendChild(div)
    }
    section.classList.remove("hideTotals")
})

section.addEventListener("click", function() {
    section.classList.toggle("hideTotals")
})



function sum(obj, selector) {
    let s = 0;
    for(quant of Object.values(obj)) {
        s += quant
        selector.textContent = `${Object.keys(obj).length} items : $${s}`
    }
    return s
}
