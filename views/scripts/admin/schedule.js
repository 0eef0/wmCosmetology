const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

let apptsDOM = document.getElementById('appts-container');

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

function readableDate(date) {
    let newDate = date.value.split('-');
    displayDate.innerHTML = new Date([Number(newDate[0]), Number(newDate[1]), Number(newDate[2])]).toLocaleString('en-US', { dateStyle: 'medium' });
}

async function getAppts() {
    let appts = await axios.get('/api/v1/appointments');
    let newAppts = [];

    appts = appts.data.appointments;
    console.log('Appointments', appts);
    for (let i = 0; i < appts.length; i++) {
        newAppts.push(`
            <div class="appointment-card">
                <div class="col">
                    <h1 class="service-names">${formatter.format(appts[i].services)}</h1>

                    <p class="date">${appts[i].date} @ ${readableTime(appts[i].time)}</p>
                    <h1 class="name">${appts[i].name}</h1>
                </div>
                <div class="col right">
                    <p class="estimated-price">Estimated Price: $${appts[i].price}</p>

                    <button class="cancel-appointment btn btn-3">Cancel</button>
                </div>
            </div>
        `);
    }
    apptsDOM.innerHTML = newAppts;
}
getAppts();