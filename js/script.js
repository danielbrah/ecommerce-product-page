const navMenu = document.getElementById('nav-menu')
const navOpen = document.getElementById('menu-open')
const navClose = document.getElementById('menu-close')
const overlay = document.getElementById('overlay')
const quantity = document.querySelector('[id=quantity] h2')
const quantityAdd = document.querySelector('[id=quantity] [id=quantity-add]')
const quantitySubtract = document.querySelector('[id=quantity] [id=quantity-subtract]')

navOpen.addEventListener('click', (e) =>{
    navMenu.classList.toggle('active')
    overlay.classList.toggle('active')
})

navClose.addEventListener('click', (e) =>{
    navMenu.classList.toggle('active')
    overlay.classList.toggle('active')
})

quantityAdd.addEventListener('click', () =>{
    quantity.textContent = Number(quantity.textContent) + 1
})

quantitySubtract.addEventListener('click', () =>{
    if (Number(quantity.textContent == 0))
        return
    else
        quantity.textContent = Number(quantity.textContent) - 1
})
