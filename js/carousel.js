// These variables help keep track of when an image from the selection is clicked, the lightbox image will be shown as the clicked image.
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


imagePreviewing(imageSelection, imagePreview)

imagePreviewing(lightboxImageSelection, lightboxImagePreview)
document.addEventListener('keydown', e =>{
    if (e.key == 'Escape' && lightbox.style.opacity != 0)
        hideLightbox()
})

document.getElementById('lightbox-svg-container').addEventListener('click', hideLightbox)