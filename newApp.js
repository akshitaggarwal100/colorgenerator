const form = document.querySelector('form');
const randomButton = document.querySelector('#random');
const colors = document.querySelector('#colors');
const limit = document.querySelector('#columns');

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [r, g, b];
}

function hex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

function hsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;

    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

function addColor(r, g, b) {
    if (document.querySelectorAll('#colors div').length < limit.value) {
        const box = document.createElement('div');
        box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        box.classList.add('colorBox');
        box.innerText = `${hex(r, g, b)}
                         ${rgb(r, g, b)}
                         ${hsl(r, g, b)}`
        if (r < 129 && g < 129 || g < 129 && b < 129 || r < 129 && b < 129) {
            box.style.color = 'white';
        }

        colors.appendChild(box);

        const boxes = document.querySelectorAll('#colors div');

        if (document.body.clientWidth < 1080) {
            box.classList.add('horizontal');
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].style.height = `${85 / parseInt(boxes.length)}vh`;
            }
        }
        else {
            box.classList.add('vertical');
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].style.width = `${100 / parseInt(boxes.length)}vw`;
            }
        }
    }

    else {
        alert(`only ${limit.value} colors pallete is valid`)
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    let r = parseInt(form.elements.r.value);
    let g = parseInt(form.elements.g.value);
    let b = parseInt(form.elements.b.value);
    addColor(r, g, b);
})

randomButton.addEventListener('click', function (e) {
    const rgbArray = generateRandomColor();
    let r = rgbArray[0];
    let g = rgbArray[1];
    let b = rgbArray[2];
    addColor(r, g, b);
})
