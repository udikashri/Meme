'use strict'
var gCanvas;
var gTxtCanvas
var gBarHeight = 30
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gCoor;

var gImgs = [{
    id: 1,
    name: 'Tramp',
    keywords: ['happy', 'president', 'man', 'people', 'funny']
}, {
    id: 2,
    name: 'Puppys',
    keywords: ['happy', 'dogs', 'animals']
}, {
    id: 3,
    name: 'Baby-And-Puppy',
    keywords: ['happy', 'dogs', 'animals', 'kids']
}, {
    id: 4,
    name: 'Cat',
    keywords: ['happy', 'animals']
}, {
    id: 5,
    name: 'Serious-Boy',
    keywords: ['happy', 'kids', 'people', 'funny']
}, {
    id: 6,
    name: 'Ancient-Aliens',
    keywords: ['happy', 'man', 'people', 'actors']
}, {
    id: 7,
    name: 'Cute-Boy',
    keywords: ['happy', 'kids', 'people']
}, {
    id: 8,
    name: 'Johnny-Depp',
    keywords: ['happy', 'man', 'people', 'actors']
}, {
    id: 9,
    name: 'Funny-Boy',
    keywords: ['happy', 'people', 'funny']
}, {
    id: 10,
    name: 'Obama',
    keywords: ['happy', 'president', 'man', 'people']
}, {
    id: 11,
    name: 'Angelina-Jolie',
    keywords: ['happy', 'modal', 'women', 'people', 'actors']
}, {
    id: 12,
    name: 'Avri-Gilad',
    keywords: ['happy', 'mans', 'people']
}, {
    id: 13,
    name: 'Leonardo-Dicaprio',
    keywords: ['happy', 'mans', 'people', 'actors']
}, {
    id: 14,
    name: 'Laurence-Fishburne',
    keywords: ['happy', 'mans', 'people', 'actors']
}, {
    id: 15,
    name: 'Shon-Bin',
    keywords: ['happy', 'mans', 'people', 'actors']
}, {
    id: 16,
    name: 'Patrick',
    keywords: ['happy', 'mans', 'people']
}, {
    id: 17,
    name: 'Putin',
    keywords: ['happy', 'president', 'people']
}, {
    id: 18,
    name: 'Gal-Gadot',
    keywords: ['happy', 'modal', 'women', 'people', 'actors']
}, ];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        id: 1,
        txt: '',
        size: 30,
        align: 'center',
        color: 'black',
        borderColor: 'black',
        font: 'Ariel',
        x: 150,
        y: 30,
        moveToggle: false
    }]
}

function setCanvas() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
}

function getImages() {
    return gImgs
}

function drawImg(imgId) {
    var img = new Image();
    img.width = 400
    img.heigth = 400
    img.src = `img/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }

    return
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function drawText(text, x, y) {
    if (text || text === '') {
        gMeme.lines[gMeme.selectedLineIdx].txt = text
    }
    var img = new Image;
    img.src = `img/${gMeme.selectedImgId}.jpg`;
    img.width = 400
    img.heigth = 400
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawCharts(x)
    }
}

function drawCharts(val) {
    gMeme.lines.forEach((line, idx) => {
        if (val || val === 0) {
            gMeme.lines[gMeme.selectedLineIdx].x = val
        }
        gCtx.beginPath()
        gCtx.font = `${gMeme.lines[idx].size}px ${gMeme.lines[idx].font}`
        gCtx.textAlign = `${gMeme.lines[idx].align}`
        gCtx.fillStyle = `${gMeme.lines[idx].color}`
        gCtx.strokeStyle = `${gMeme.lines[idx].borderColor}`
        gCtx.fillText(gMeme.lines[idx].txt, gMeme.lines[idx].x, gMeme.lines[idx].y)
        gCtx.strokeText(gMeme.lines[idx].txt, line.x, line.y)
        gCtx.lineWidth = '1.5'
        gCtx.closePath()
    })
}

function move(ev) {

    if (ev.type === 'mousedown') {
        moveCanvas(ev)
        gMeme.lines[gMeme.selectedLineIdx].moveToggle = true
    }
    if (ev.type === 'mouseup') {
        if (!gMeme.lines[gMeme.selectedLineIdx].moveToggle) return
        moveCanvas1(ev, gCoor, )
    }

    function moveCanvas(ev) {
        var x = ev.clientX;
        var y = ev.clientY;
        gCoor = [x, y]
        return
    }

    function moveCanvas1(ev, ) {
        var x = ev.clientX;
        var y = ev.clientY;
        var moveX = x - gCoor[0]
        var moveY = y - gCoor[1]
        if (gMeme.lines[gMeme.selectedLineIdx].moveToggle) {
            gMeme.lines[gMeme.selectedLineIdx].x += moveX / 2
            gMeme.lines[gMeme.selectedLineIdx].y += moveY / 2
        }
        drawText(gMeme.selectedLineIdx.txt)
        gMeme.lines[gMeme.selectedLineIdx].moveToggle = false
    }
}

function setTxtColor(color) {
    if (color) {
        gMeme.lines[gMeme.selectedLineIdx].color = color
        gCtx.beginPath()
        gCtx.fillStyle = `${gMeme.lines[gMeme.selectedLineIdx].color}`
        drawText(gMeme.lines[gMeme.selectedLineIdx].txt)
        gCtx.closePath()
    }
}

function setBorderColor(color) {
    if (color) {
        gMeme.lines[gMeme.selectedLineIdx].borderColor = color
        gCtx.beginPath()
        gCtx.strokeStyle = `${gMeme.lines[gMeme.selectedLineIdx].borderColor}`
        drawText(gMeme.lines[gMeme.selectedLineIdx].txt)
        gCtx.closePath()
    }
}

function setFontSize(UpOrdown) {
    if (UpOrdown === 'up') {
        gMeme.lines[gMeme.selectedLineIdx].size += 10
    } else { gMeme.lines[gMeme.selectedLineIdx].size -= 10 }
    gCtx.font = `${gMeme.lines[gMeme.selectedLineIdx].size}px ${gMeme.lines[gMeme.selectedLineIdx].font}`
    drawText(gMeme.lines[gMeme.selectedLineIdx].txt)
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
    drawText(gMeme.lines[gMeme.selectedLineIdx].txt)
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function closeModal() {
    document.querySelector('.modal').hidden = true
    document.querySelector('.main-container').style.display = 'flex'
    document.querySelector('.main-nav').style.display = 'flex'
}

function searchKeywords(val) {
    var sorted = [];
    console.log(val);
    gImgs.forEach((img) => {
        img.keywords.forEach((keyword) => {
            if (val.length >= 3) { var checkWord = keyword.includes(val) }
            if (keyword === val || val.includes(keyword) || checkWord) {
                console.log('hi')
                sorted.push(img)
            }
        })
    })
    if (sorted.length) renderModalImgs(sorted)
    else renderModalImgs(gImgs)
}

function alignTo(val) {
    if (val === 'left') {
        gMeme.lines[gMeme.selectedLineIdx].align = 'left'
        drawText(gMeme.lines[gMeme.selectedLineIdx].txt, 0)
    } else if (val === 'center') {
        gMeme.lines[gMeme.selectedLineIdx].align = 'center'
        drawText(gMeme.lines[gMeme.selectedLineIdx].txt, 150)
    } else if (val === 'right') {
        gMeme.lines[gMeme.selectedLineIdx].align = 'right'
        drawText(gMeme.lines[gMeme.selectedLineIdx].txt, 300)
    }
}

function changeLine() {
    gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx >= gMeme.lines.length) { gMeme.selectedLineIdx = 0 }
    drawText()
    document.querySelector('.canvas-text').value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function createLine() {
    var id = 2
    var y;
    if (gMeme.selectedLineIdx === 0) {
        y = 130
    } else y = 80, ++id
    gMeme.lines.push({
        id: id,
        txt: '',
        size: 30,
        align: 'center',
        color: 'black',
        borderColor: 'black',
        font: 'Ariel',
        x: 150,
        y: y
    })
    changeLine()
}

function removeLine() {
    document.querySelector('.canvas-text').value = ''
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
    drawText()
}