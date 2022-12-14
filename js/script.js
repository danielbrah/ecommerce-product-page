const navMenu = document.getElementById('nav-menu')
const navOpen = document.getElementById('menu-open')
const navClose = document.getElementById('menu-close')
const overlay = document.getElementById('overlay')
const quantity = document.querySelector('[id=quantity] h2')
const quantityAdd = document.querySelector('[id=quantity] [id=quantity-add]')
const quantitySubtract = document.querySelector('[id=quantity] [id=quantity-subtract]')
const html = document.querySelector('html')

// cart
const cartBtn = document.getElementById('cart-btn')
const cartMenu = document.getElementById('cart')
const cartList = document.getElementById('cart-list')
const cartTitle = document.getElementById('cart-title-container')

// Image preview and selection
const imageSelection = Array.from(document.getElementById('product-image-selection').children)
const imagePreview = Array.from(document.getElementById('product-image-wrapper').children)

// navigation
navOpen.addEventListener('click', (e) =>{
    navMenu.classList.toggle('active')
    overlay.classList.toggle('active')
    cartMenu.classList.remove('active')
})

navClose.addEventListener('click', (e) =>{
    navMenu.classList.toggle('active')
    overlay.classList.toggle('active')
})

// quantity
quantityAdd.addEventListener('click', () =>{
    quantity.textContent = Number(quantity.textContent) + 1
})

quantitySubtract.addEventListener('click', () =>{
    if (Number(quantity.textContent == 0))
        return
    else
        quantity.textContent = Number(quantity.textContent) - 1
})

// Image selection and preview events
imageSelection.forEach((element, index) => {
    element.addEventListener('click', () => {
        if (element.classList.contains('active'))
        {
            return
        }
        else
        {
            element.classList.toggle('active')
            imagePreview[index].classList.toggle('active') 
            imageSelection.forEach((element, imgIndex)=>{
                if (imgIndex == index)
                {
                    return
                }
                else
                {
                    imageSelection[imgIndex].classList.remove('active')
                    imagePreview[imgIndex].classList.remove('active')
                }
            })
        }
    })
})

// cart menu
cartBtn.addEventListener('click', () =>{
    cartMenu.classList.toggle('active')
})

html.addEventListener('click', (e) =>{
    if (e.target == cartList || e.target == cartTitle) 
    {
        return
    }
    else
    {
        if(e.target != cartBtn)
        {
            if(cartMenu.classList.contains('active'))
                cartMenu.classList.toggle('active')
        }
    }
})


