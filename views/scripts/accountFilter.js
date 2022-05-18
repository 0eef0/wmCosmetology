const accountsDOM = document.getElementById('all-accounts');
const acctSearchDOM = document.getElementById('account-search');
const acctFilterDOM = document.getElementById('acctType');
const acctOrderDOM = document.getElementById('sort');

let users = [];
let tempUsers = [];

// Filters tempUsers based on the active filters
function filterAccts() {
    tempUsers = users;

    if (acctSearchDOM.value !== '') {
        tempUsers = tempUsers.filter(user => JSON.stringify(user).toLowerCase().includes(acctSearchDOM.value.toLowerCase()));
    }

    switch (acctFilterDOM.value) {
        case 'student':
            tempUsers = tempUsers.filter((user) => user.accountType === 'student');
            break;
        case 'teacher':
            tempUsers = tempUsers.filter((user) => user.accountType === 'teacher');
            break;
        case 'admin':
            tempUsers = tempUsers.filter((user) => user.accountType === 'admin');
            break;
    }

    if (acctOrderDOM.value == 'a-z') {
        tempUsers = tempUsers.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : (a.name.toLowerCase() == b.name.toLowerCase()) ? ((a.email.toLowerCase() > b.email.toLowerCase()) ? 1 : -1) : -1);
    } else {
        tempUsers = tempUsers.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : (a.name.toLowerCase() == b.name.toLowerCase()) ? ((a.email.toLowerCase() < b.email.toLowerCase()) ? 1 : -1) : -1);
    }

    updateAccounts();
}

// Runs filterAccts() every time a filter is changed
acctSearchDOM.addEventListener('input', function () {
    filterAccts();
})
acctFilterDOM.addEventListener('change', function () {
    filterAccts();
});
acctOrderDOM.addEventListener('change', function () {
    filterAccts();
});

(async () => {
    const { data: { allUsers } } = await axios.get('http://localhost:5000/api/v1/admins');
    users = allUsers.sort((a, b) => { return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1; });
    tempUsers = users;
    // console.log(users);
    for (user of tempUsers) {
        const { _id: id, name, email, accountType, serviceHistory } = user;
        // console.log(user);
        let date;
        // const date = (!(serviceHistory.length || serviceHistory[serviceHistory.length-1].date)) ? new Date(Number(serviceHistory[serviceHistory.length-1].date.split('-')[0]), Number(serviceHistory[serviceHistory.length-1].date.split('-')[1]), Number(serviceHistory[serviceHistory.length-1].date.split('-')[2]), Number(serviceHistory[serviceHistory.length-1].time.split(':')[0]), Number(serviceHistory[serviceHistory.length-1].time.split(':')[1])) : new Date(Number(serviceHistory[serviceHistory.length-1].appointmentDate.split('-')[0]), Number(serviceHistory[serviceHistory.length-1].appointmentDate.split('-')[1]), Number(serviceHistory[serviceHistory.length-1].appointmentDate.split('-')[2]));
        if (serviceHistory.length && serviceHistory[serviceHistory.length - 1].date) {
            date = new Date(Number(serviceHistory[serviceHistory.length - 1].date.split('-')[0]), Number(serviceHistory[serviceHistory.length - 1].date.split('-')[1]), Number(serviceHistory[serviceHistory.length - 1].date.split('-')[2]), Number(serviceHistory[serviceHistory.length - 1].time.split(':')[0]), Number(serviceHistory[serviceHistory.length - 1].time.split(':')[1]));
        } else if (serviceHistory.length && serviceHistory[serviceHistory.length - 1].appointmentDate) {
            date = new Date(Number(serviceHistory[serviceHistory.length - 1].appointmentDate.split('-')[0]), Number(serviceHistory[serviceHistory.length - 1].appointmentDate.split('-')[1]), Number(serviceHistory[serviceHistory.length - 1].appointmentDate.split('-')[2]));
        } else {
            date = false;
        }
        accountsDOM.innerHTML += `
            <div class="account flex-grid-item">
                <h1 class="name">
                    ${name}
                </h1>
                <h2 class="email">
                    ${email}
                </h2>
                <h2 class="lastApptTxt">Last Appointment:</h2>
                <h2 class="lastAppt">
                ${(date) ? `${date.toLocaleString('en-US', { dateStyle: 'medium' })} @ ${date.getHours() > 12 ?
                date.getHours() - 12 :
                date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}` : 'N/A'}
                </h2>
                <h2 class="acctType">
                    ${accountType}
                </h2>
                ${(date) ? `<button class="moreBtn" onclick="getAppts('${id}')">More...</button>` : ''}
            </div>
        `;
    }
})();

// Takes the tempUsers array and uses that to create divs with the information
const updateAccounts = () => {
    accountsDOM.innerHTML = '';
    for (user of tempUsers) {
        const { _id: id, name, email, accountType, serviceHistory } = user;
        const date = (serviceHistory[serviceHistory.length - 1]) ? new Date(Number(serviceHistory[serviceHistory.length - 1].date.split('-')[0]), Number(serviceHistory[serviceHistory.length - 1].date.split('-')[1]), Number(serviceHistory[serviceHistory.length - 1].date.split('-')[2]), Number(serviceHistory[serviceHistory.length - 1].time.split(':')[0]), Number(serviceHistory[serviceHistory.length - 1].time.split(':')[1])) : undefined;
        accountsDOM.innerHTML += `
            <div class="account flex-grid-item">
                <h1 class="name">
                    ${name}
                </h1>
                <h2 class="email">
                    ${email}
                </h2>
                <h2 class="lastApptTxt">Last Appointment:</h2>
                <h2 class="lastAppt">
                ${(date) ? `${date.toLocaleString('en-US', { dateStyle: 'medium' })} @ ${date.getHours() > 12 ?
                date.getHours() - 12 :
                date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}` : 'N/A'}
                </h2>
                <h2 class="acctType">
                    ${accountType}
                </h2>
                ${(date) ? `<button class="moreBtn" onclick="getAppts('${id}')">More...</button>` : ''}
            </div>
        `;
    }
}