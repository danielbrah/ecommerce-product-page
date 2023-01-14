'use strict';
const navMenu = document.getElementById('nav-menu')
const navOpen = document.getElementById('menu-open')
const navClose = document.getElementById('menu-close')
const overlay = document.getElementById('overlay')
const quantity = document.querySelector('[id=quantity] h2')
const quantityAdd = document.querySelector('[id=quantity] [id=quantity-add]')
const quantitySubtract = document.querySelector('[id=quantity] [id=quantity-subtract]')
const itemName = document.getElementById('product-name')
const warning = document.getElementById('warning-message')
const warningMessage = document.querySelector('[id=warning-message] p')
const html = document.querySelector('html')
// cart
const cartBtn = document.getElementById('cart-btn')
const cartMenu = document.getElementById('cart')
const cartList = document.getElementById('cart-list')
const cartTitle = document.getElementById('cart-title-container')
const addToCart = document.getElementById('add-to-cart')

// Image preview and selection
const imageSelection = Array.from(document.getElementById('product-image-selection').children)
const imagePreview = Array.from(document.getElementById('product-image-wrapper').children)
const lightboxImageSelection = Array.from(document.getElementById('lightbox-image-selection').children)

// Sets up array
const lightboxImagePreview = []
for(let i = 0; i < Array.from(document.getElementById('lightbox-image-container').children).length; i++)
{
    const item = Array.from(document.getElementById('lightbox-image-container').children)[i]
    if(item.tagName == 'IMG')
        lightboxImagePreview.push(item)
}

const productImage = document.getElementById('product-image-wrapper')
const lightbox = document.getElementById('lightbox')

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
    if(isNaN(Number(quantity.textContent)))
        quantity.textContent = 0
    else
        quantity.textContent = Number(quantity.textContent) + 1
})

quantitySubtract.addEventListener('click', () =>{
    if (Number(quantity.textContent == 0) || isNaN(Number(quantity.textContent)))
        return
    else
        quantity.textContent = Number(quantity.textContent) - 1
})

// Image selection and preview events function
const imagePreviewing = (selection, preview) =>{
    selection.forEach((element, index) => {
        element.addEventListener('click', () => {
            if (element.classList.contains('active'))
            {
                return
            }
            else
            {
                element.classList.toggle('active')
                preview[index].classList.toggle('active') 
                selection.forEach((element, imgIndex)=>{
                    if (imgIndex == index)
                    {
                        return
                    }
                    else
                    {
                        selection[imgIndex].classList.remove('active')
                        preview[imgIndex].classList.remove('active')
                    }
                })
            }
        })
    })
}

imagePreviewing(imageSelection, imagePreview)

// image lightbox
const setLightboxPreviewImage = (element, prevArr, selectArr) =>
{
    for(let i = 0; i < prevArr.length; i++)
    {
        prevArr[i].classList.remove('active')
        selectArr[i].classList.remove('active')

        if (element.getAttribute('src') == prevArr[i].getAttribute('src'))
        {
            prevArr[i].classList.toggle('active')
            selectArr[i].classList.toggle('active')
        }
    }
}

productImage.addEventListener('click', (e) =>{
    if (window.innerWidth > 915)
    {
        lightbox.style.visibility = 'visible'
        lightbox.style.opacity = '1'
        setLightboxPreviewImage(e.target, lightboxImagePreview, lightboxImageSelection)
    }
    else{return}
})

const hideLightbox = () =>{
    lightbox.style.visibility = 'hidden'
    lightbox.style.opacity = '0'
}

document.getElementById('lightbox-svg-container').addEventListener('click', hideLightbox)
document.addEventListener('keydown', e =>{
    if (e.key == 'Escape' && lightbox.style.opacity != 0)
        hideLightbox()
})

imagePreviewing(lightboxImageSelection, lightboxImagePreview)

// cart menu
cartBtn.addEventListener('click', () =>{
    cartMenu.classList.toggle('active')
})

const checkParent = function(element, target)
{
    if (element == target)
    {
        return false
    }
    else
    {
        let parent = element.parentElement
        if (parent == target)
        {
            return false
        }
        else
        {
            while (parent != target)
            {
                parent = parent.parentElement
                if (parent == html)
                {
                    return true
                }
            }
            return false
        }
    }
}

html.addEventListener('click', (e) =>
{
    if (e.target == cartBtn || e.target.className == 'item-delete')
    {
        return
    }
    else
    {
        if (cartMenu.classList.contains('active'))
        {
            if(!checkParent(e.target, addToCart))
            {
                return
            }
            else if (checkParent(e.target, cartMenu))
                cartMenu.classList.remove('active')
            else 
                return
        }
    }
})

const createItem = (quantity, price, name) =>
{
    // Setting image
    const image = document.createElement('img')
    const image2 = document.createElement('img')
    image2.className = 'item-delete'
    image.className = 'item-mini-pic'
    image.src = 'images/image-product-1.jpg'
    image.width = 50
    image.height = 50
    image.alt = 'Image of product 1'
    
    image2.src = 'images/icon-delete.svg'
    image2.alt = 'Delete icon'

    // Creating item text divs
    const itemInfo = document.createElement('div')
    const itemName = document.createElement('p')
    const itemNumbers = document.createElement('div')
    const itemNumbersInfo = document.createElement('p')
    const itemPrice = document.createElement('span')
    const itemQuantity = document.createElement('span')
    const itemCost = document.createElement('strong')

    // Setting classes
    itemNumbers.className = 'item-numbers'
    itemPrice.className = 'item-price'
    itemQuantity.className = 'item-quantity'
    itemCost.className = 'item-cost'
    itemInfo.className = 'item-info'

    // Setting text
    itemName.textContent = name
    itemPrice.textContent = `$${price.toFixed(2)} x `
    itemQuantity.textContent = quantity
    itemCost.textContent = ` $${(price * quantity).toFixed(2)}`

    itemNumbersInfo.appendChild(itemPrice)
    itemNumbersInfo.appendChild(itemQuantity)
    itemNumbersInfo.appendChild(itemCost)

    itemInfo.appendChild(itemName)
    itemInfo.appendChild(itemNumbersInfo)    

    // Creating item div
    const item = document.createElement('div')
    item.className = 'item'
    item.append(image)
    item.append(itemInfo)
    item.append(image2)

    image2.addEventListener('click', () =>
    {
        item.remove()
        document.getElementById('cart-empty').classList.toggle('active')
        document.getElementById('checkout-btn').classList.toggle('active')
        cartList.classList.remove('has-item')
    })

    cartList.insertBefore(item, document.getElementById('checkout-btn'))
}

const showWarning = message => 
{
    warningMessage.textContent = message
    warning.style.opacity = '1'

    setTimeout(() =>{ 
        warning.style.opacity = '0'
    }, 2000)
}

addToCart.addEventListener('click', () =>
{
    if (isNaN(Number(quantity.textContent)))
    {
        return
    }
    else if (Number(quantity.textContent) == 0 || cartList.classList.contains('has-item'))
    {
        if(Number(quantity.textContent) == 0)
            showWarning('No quantity entered!')
        else
            showWarning('Item already added to cart!')
    }
    else
    {
        createItem(Number(quantity.textContent), 125, itemName.textContent)
        cartList.classList.toggle('has-item')
        document.getElementById('cart-empty').classList.toggle('active')
        document.getElementById('checkout-btn').classList.toggle('active')
    }
})