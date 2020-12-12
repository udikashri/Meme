'use strict'
var gCanvas;
var gCtx;

function init() {
    renderImageInput()
    renderModalImgs()
    setCanvas()
}

function renderImageInput(val) {
    if (val) {
        var imgs = getImages()
        var currImg = imgs.filter(function(img) {
            if (img.name === val || img.id === val) {
                renderCanvas(img)
                gMeme.selectedImgId = img.id
                document.querySelector('.canvas-text').value = ''
                var elImgList = document.querySelector('select[name=imgList]');
                elImgList.value = img.name
            }
        })
        return
    }
    var imgs = getImages()
    var strHtmls = imgs.map(function(img) {
        return `
        <option value="${img.name}">${img.name}</option>
        `
    })
    renderCanvas(imgs[0])
    var elImgList = document.querySelector('select[name=imgList]');
    elImgList.innerHTML = strHtmls.join('')
}

function renderCanvas(img) {
    drawImg(img.id || img);
}

function renderCanvasUpload(img) {
    if (img) {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function renderModalImgs(sorted) {
    var sortedOrAll = (sorted) ? sorted : getImages()
    var strHtmls = sortedOrAll.map(function(img) {
        return `
<div class="img-preview">
    <img class="card-img" onclick="closeModal(); renderImageInput(${img.id}) "  src="img/${img.id}.jpg">
</div> 
`
    })
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}

function onAddLine() {

}

function onOpenModal() {
    document.querySelector('.modal').hidden = false;
    document.querySelector('.main-container').style.display = 'none'
    document.querySelector('.main-nav').style.display = 'none'
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvasUpload)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}