var priceCounter = 0;

let acc = document.getElementsByClassName('title-row');
let date = document.getElementById('date-input');
let time = document.getElementById('time-input');
let checkboxes = document.getElementsByClassName('checkbox');
let estimatedPrice = document.getElementById('estimated-price');
let displayDate = document.getElementById('display-date');
let displayTime = document.getElementById('display-time');
let noDate = document.getElementById('no-date');

// Accordion Logic
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
        /* Toggle between adding and removing the 'active' class,
        to highlight the button that controls the panel */
        this.classList.toggle('accordionActive');

        /* Toggle between hiding and showing the active panel */
        let panel = this.nextElementSibling;
        let icon = this.lastChild;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.opacity = 0;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            panel.style.opacity = 1;
        }
    });
}

// Price Counter Logic
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function () {
        if (this.checked) {
            priceCounter += Number(this.value);
            estimatedPrice.innerHTML = `Estimated Price: $${priceCounter}`;
        } else {
            priceCounter -= Number(this.value);
            estimatedPrice.innerHTML = `Estimated Price: $${priceCounter}`;
        }
    });
}

function readableDate(time) {
    time = time.split(':');
    time.push('AM');
    if (time[0] == 0) {
        time[0] = 12;
    } else if (time[0] == 12) {
        time[2] = 'PM';
    } else if (time[0] > 12) {
        time[0] -= 12;
        time[2] = 'PM';
    }
    return `@ ${time.slice(0, 2).join(':')} ${time[2]}`;
}

date.addEventListener('change', function () {
    displayDate.innerHTML = new Date(date.value).toLocaleString('en-US', { dateStyle: 'medium' });
    noDate.style.display = 'none';
})

time.addEventListener('change', function () {
    displayTime.innerHTML = readableDate(time.value);
    noDate.style.display = 'none';
})