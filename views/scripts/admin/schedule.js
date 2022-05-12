const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

let apptsDOM = document.getElementById('appts-container');
let acc = document.getElementsByClassName('title-row');
let cancelBtns = document.getElementsByClassName('cancel-appointment');
let modals = document.getElementsByClassName('modal-container-brk');
let modalTitles = document.getElementsByClassName('modal-title');
let modalsYes = document.getElementsByClassName('confirm-btn');
let modalsNo = document.getElementsByClassName('deny-btn');
let addNotes = document.getElementsByClassName('add-notes');

// Makes Times readable
function readableTime(time) {
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
    return `${time.slice(0, 2).join(':')} ${time[2]}`;
}

// Makes Dates Readable
function readableDate(date) {
    let newDate = date.split('-');
    newDate = new Date([Number(newDate[0]), Number(newDate[1]), Number(newDate[2])]).toLocaleString('en-US', { dateStyle: 'medium' });
    return newDate;
}

async function getAppts() {
    let appts = await axios.get('/api/v1/appointments');
    appts = appts.data.appointments;
    appts = appts.sort((a, b) => (a.date > b.date) ? 1 : (a.date === b.date) ? ((a.time > b.time) ? 1 : -1) : -1)
    let newAppts = [];

    for (let i = 0; i < appts.length; i++) {
        newAppts.push(`
            <div class="modal-container-brk">
                <div class="cancel-modal">
                    <h1 class="modal-title">Warning!</h1>
                    <p>Are you sure you want to cancel ${appts[i].name}'s appointment?</p>
                    <div class="modal-btns">
                        <button class="confirm-btn">Yes</button>
                        <button class="deny-btn">No</button>
                    </div>
                </div>
            </div>
            <div class="appointment-card">
                <div class="col">
                    <h1 class="service-names">${formatter.format(appts[i].services)}</h1>
                    ${appts[i].notes != '' ? `
                        <div class="accordion">
                            <div class="title-row appt-card-title-row">
                                <p class="more-notes-title">Additional Notes</p>
                                <i class="fas fa-angle-down"></i>
                            </div>
                            <div class="panel">
                                <p class="add-notes">${appts[i].notes}</p>
                            </div>
                        </div>
                    ` : ''}

                    <p class="date">${readableDate(appts[i].date)} @ ${readableTime(appts[i].time)}</p>
                    <h1 class="name">${appts[i].name}</h1>
                </div>
                <div class="col right">
                    <p class="estimated-price">Estimated Price: $${appts[i].price}</p>

                    <button class="cancel-appointment btn btn-3">Cancel</button>
                </div>
            </div>
        `);
    }
    apptsDOM.innerHTML = newAppts.join('');

    // Cancel Button Logic
    for (let i = 0; i < appts.length; i++) {
        cancelBtns[i].addEventListener('click', async function() {
            modals[i+1].style.display = "flex";
            modals[i+1].style.visibility = "visible";
            modalTitles[i+1].style.color = "red";

            modalsYes[i].addEventListener('click', async function () {
                try {
                    await axios.delete(`/api/v1/appointments/${appts[i]._id}`);
                    location.reload();
                } catch (error) {
                    console.log(error.response.data);
                    modals[0].style.display = "flex";
                    modalTitles[0].style.color = "red";
                }
            })

            modalsNo[i].addEventListener('click', function() {
                modals[i+1].style.display = "none";
                modals[i+1].style.visibility = "hidden";
            })
        })
    }

    // Accordion Logic
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function() {
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
}
getAppts();

// Closes the Modal
for (let i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function() {
        modals[i].style.display = "none";
    });
}