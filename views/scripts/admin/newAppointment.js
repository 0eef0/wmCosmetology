var priceCounter = 0;
var serviceArr = [];

let acc = document.getElementsByClassName('title-row');
let date = document.getElementById('date-input');
let time = document.getElementById('time-input');
let checkboxes = document.getElementsByClassName('checkbox');
let labels = document.getElementsByClassName('checkbox-label');
let estimatedPrice = document.getElementById('estimated-price');
let displayDate = document.getElementById('display-date');
let displayTime = document.getElementById('display-time');
let noDate = document.getElementById('no-date');
let formDOM = document.getElementById('new-appt-form');
let modals = document.getElementsByClassName('modal-container-brk');
let modalTitles = document.getElementsByClassName('modal-title');
let modalBtns = document.getElementsByClassName('modal-close-btn');

// Accordion Logic
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
        /* Toggle between adding and removing the 'active' class,
        to highlight the button that controls the panel */
        this.classList.toggle('accordionActive');

        /* Toggle between hiding and showing the active panel */
        let panel = this.nextElementSibling;
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
            serviceArr.push(labels[i].innerHTML);
            console.log(serviceArr);
            estimatedPrice.innerHTML = `Estimated Price: $${priceCounter}`;
        } else {
            priceCounter -= Number(this.value);
            serviceArr = serviceArr.filter(service => service == labels[i].innerHTML);
            console.log(serviceArr);
            estimatedPrice.innerHTML = `Estimated Price: $${priceCounter}`;
        }
    });
}

// Changes time from military to regular
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

// Changes the date in the price calculator
date.addEventListener('change', function () {
    let newDate = date.value.split('-');
    displayDate.innerHTML = new Date([Number(newDate[0]), Number(newDate[1]), Number(newDate[2])]).toLocaleString('en-US', { dateStyle: 'medium' });
    noDate.style.display = 'none';
})

// Changes the time in the price calculator
// time.addEventListener('change', function () {
//     displayTime.innerHTML = readableDate(time.value);
//     noDate.style.display = 'none';
// })

// Submits appointment to the API
formDOM.addEventListener('submit', async function (e) {
    e.preventDefault();

    const newAppt = {
        name: document.getElementById('name-input').value,
        appointmentDateTime: document.getElementById('date-input').value,
        email: document.getElementById('email-input').value,
        services: serviceArr,
        price: priceCounter,
        notes: document.getElementById('add-notes').value,
        completedBy: "N/A",
        walkIn: false
    }

    try {
        await axios.post('/api/v1/admins/newVisit', newAppt);
        modals[0].style.display = "flex";
        modalTitles[0].style.color = "green";
    } catch (error) {
        console.log(error.response.data);
        modals[1].style.display = "flex";
        modalTitles[1].style.color = "red";
    }
})

// Closes the Modal
for (let i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function () {
        modals[i].style.display = "none";
        if (i == 0) {
            location.reload();
        }
    });
}