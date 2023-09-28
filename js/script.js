'use strict';
class Product{
    constructor(quantity, price, name)
    {
        // Binding the function to the class instance (this) and replacing the method with a new one.
        this.eventListener = this._removeItem.bind(this)

        // Properties
        this.quantity = quantity
        this.price = price
        this.name = name
        this.item = this._createElement(this.quantity, this.price, this.name)

        this.item.querySelector('.item-delete').addEventListener('click', this.eventListener)
    }

    _createElement(quantity, price, name)
    {
        // Create document fragment to increase performance
        const fragment = document.createDocumentFragment();
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

        // Appending info
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

        cartList.insertBefore(item, document.getElementById('checkout-btn'))

        return item
    }

    _removeItem()
    {   
        // Event function
        this.item.remove()
        document.getElementById('cart-empty').classList.toggle('active')
        document.getElementById('checkout-btn').classList.toggle('active')
        cartList.classList.remove('has-item')

        // Discards event listener
        this.item.querySelector('.item-delete').removeEventListener('click', this.eventListener)
    }
}

// Navigation components
const navMenu = document.getElementById('nav-menu')
const navOpen = document.getElementById('menu-open')
const navClose = document.getElementById('menu-close')

// Cart actions and components
const overlay = document.getElementById('overlay')
const quantity = document.querySelector('[id=quantity] h2')
const quantityAdd = document.querySelector('[id=quantity] [id=quantity-add]')
const quantitySubtract = document.querySelector('[id=quantity] [id=quantity-subtract]')
const itemName = document.getElementById('product-name')
const warning = document.getElementById('warning-message')
const warningMessage = document.querySelector('[id=warning-message] p')

const html = document.querySelector('html') // NEED TO DELETE

// cart components
const cartBtn = document.getElementById('cart-btn')
const cartMenu = document.getElementById('cart')
const cartList = document.getElementById('cart-list')
const cartTitle = document.getElementById('cart-title-container')
const addToCart = document.getElementById('add-to-cart')

// Image preview and selection
let activeImage = 0
let activeLightboxImage = 0

const imageSelection = Array.from(document.getElementById('product-image-selection').children)
const imagePreview = Array.from(document.getElementById('product-image-wrapper').children)

const lightboxImageSelection = Array.from(document.getElementById('lightbox-image-selection').children)
// Sets up lightboxImagePreview array
const lightboxImagePreview = []
for(let i = 0; i < Array.from(document.getElementById('lightbox-image-container').children).length; i++)
{
    const item = Array.from(document.getElementById('lightbox-image-container').children)[i]
    if(item.tagName == 'IMG')
        lightboxImagePreview.push(item)
}

// For carousel functions
const imageSelectionArrows = [
    {'array': Array.from(document.getElementById('lightbox-arrows').children),
     'preview' : lightboxImagePreview,
     'selection' : lightboxImageSelection}, 
    {'array': Array.from(document.getElementById('product-image-container-arrows').children),
     'preview' : imagePreview,
     'selection' : imageSelection}]

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

// Quantity buttons: add or subtract
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

const findActivePreviewImage = (preview) =>{
    let activeElement
    preview.forEach(element =>{
        if(element.classList.contains('active'))
        {
            activeElement = element
        } 
    })
    return activeElement
}

const carousel = (value, preview, selection) =>
{
    const activeElement = findActivePreviewImage(preview)
    activeElement.classList.remove('active')
    if(value == 1)
    {
        if(value + preview.indexOf(activeElement) > preview.length - 1) 
        {
            preview[0].classList.add('active')
            selection[preview.indexOf(activeElement)].classList.remove('active')
            selection[0].classList.add('active')
        }
        else
        {
            preview[preview.indexOf(activeElement) + 1].classList.add('active')
            selection[preview.indexOf(activeElement)].classList.remove('active')
            selection[preview.indexOf(activeElement) + 1].classList.add('active')
        }
    }
    else
    {
        if(value + preview.indexOf(activeElement) < 0) 
        {
            preview[preview.length - 1].classList.add('active')
            selection[preview.indexOf(activeElement)].classList.remove('active')
            selection[preview.length - 1].classList.add('active')
        }
        else
        {
            preview[preview.indexOf(activeElement) - 1].classList.add('active')
            selection[preview.indexOf(activeElement)].classList.remove('active')
            selection[preview.indexOf(activeElement) - 1].classList.add('active')
        }
    }
}

imageSelectionArrows.forEach(obj =>{
    obj['array'].forEach(element =>{
        element.addEventListener('click', () =>{
            if(element.classList.contains('lightbox-next') || element.classList.contains('product-next')) carousel(1, obj.preview, obj.selection)
            else carousel(-1, obj.preview, obj.selection)
        })
    })
})

// image lightbox
imagePreviewing(imageSelection, imagePreview)
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


// Cart button event handler | opens cart menu
cartBtn.addEventListener('click', () =>{
    cartMenu.classList.toggle('active')
    document.body.addEventListener('click', closeCart)
})

// Checks whether if it should close the cart menu or not.
const closeCart = function(e){
    if(e.target.closest('#cart') || e.target.closest('#cart-btn') || e.target.closest('.item-delete')) return
    else
    {
        cartMenu.classList.remove('active')
        
        // Destroy event listener once cart menu is no longer shown
        document.body.removeEventListener('click', closeCart)
    } 
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
    if (isNaN(Number(quantity.textContent))) return
    else if (Number(quantity.textContent) == 0 || cartList.classList.contains('has-item')) showWarning('An error has occured while adding item to cart.')
    else
    {
        const product = new Product(quantity.textContent, 125, itemName.textContent)
        
        // Removing text that appears when cart is empty.
        cartList.classList.toggle('has-item')
        document.getElementById('cart-empty').classList.toggle('active')
        document.getElementById('checkout-btn').classList.toggle('active')
    }
})