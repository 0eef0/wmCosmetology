// const { default: axios } = require("axios");

const accountsDOM = document.getElementById('all-accounts');

let users = [];
let tempUsers = [];
(async () => {
    const { data: { allUsers } } = await axios.get('/api/v1/admins');
    users = allUsers.sort((a, b) => { return (a.name > b.name) ? 1 : -1; });
    console.log(users);

    let usersHTML = Promise.all(users.map(async user => {
        const { _id: id, name, email, accountType } = user;

        let previousAppointments = await axios.get(`/api/v1/appointments/${id}`)
        previousAppointments = previousAppointments.data.appointments;

        mostRecentDate = previousAppointments.length ? new Date(Math.max(...previousAppointments.map(e => new Date(e.appointmentDateTime)))) : null;
        console.log(mostRecentDate);

        return `
            <div class="account">
                <h1 class="name">
                    ${ name }
                </h1>
                <h2 class="email">
                    ${ email }
                </h2>
                <h2 class="lastApptTxt">Last Appointment:</h2>
                <h2 class="lastAppt">${mostRecentDate ? mostRecentDate.toLocaleString() : 'N/A'}</h2>
                <h2 class="acctType">
                    ${ accountType }
                </h2>
                
                ${(mostRecentDate) ? `<button class="moreBtn" onclick="getAppts('${ id }')">More...</button>` : ''}
            </div>
        `
    }))
    usersHTML = (await usersHTML).join('')
    accountsDOM.innerHTML = usersHTML;

    // for(user of tempUsers) {
    //     const { _id: id, name, email, accountType, serviceHistory } = user;
    //     console.log(user)
    //     let date;
    //     // const date = (!(serviceHistory.length || serviceHistory[serviceHistory.length-1].date)) ? new Date(Number(serviceHistory[serviceHistory.length-1].date.split('-')[0]), Number(serviceHistory[serviceHistory.length-1].date.split('-')[1]), Number(serviceHistory[serviceHistory.length-1].date.split('-')[2]), Number(serviceHistory[serviceHistory.length-1].time.split(':')[0]), Number(serviceHistory[serviceHistory.length-1].time.split(':')[1])) : new Date(Number(serviceHistory[serviceHistory.length-1].appointmentDate.split('-')[0]), Number(serviceHistory[serviceHistory.length-1].appointmentDate.split('-')[1]), Number(serviceHistory[serviceHistory.length-1].appointmentDate.split('-')[2]));
    //     if(serviceHistory.length && serviceHistory[serviceHistory.length-1].date) {
    //         date = new Date(Number(serviceHistory[serviceHistory.length-1].date.split('-')[0]), Number(serviceHistory[serviceHistory.length-1].date.split('-')[1]), Number(serviceHistory[serviceHistory.length-1].date.split('-')[2]), Number(serviceHistory[serviceHistory.length-1].time.split(':')[0]), Number(serviceHistory[serviceHistory.length-1].time.split(':')[1]));
    //     } else if(serviceHistory.length && serviceHistory[serviceHistory.length-1].appointmentDate) {
    //         date = new Date(Number(serviceHistory[serviceHistory.length-1].appointmentDate.split('-')[0]), Number(serviceHistory[serviceHistory.length-1].appointmentDate.split('-')[1]), Number(serviceHistory[serviceHistory.length-1].appointmentDate.split('-')[2]));
    //     } else {
    //         date = false;
    //     }
    //     accountsDOM.innerHTML += `
    //         <div class="account">
    //             <h1 class="name">
    //                 ${ name }
    //             </h1>
    //             <h2 class="email">
    //                 ${ email }
    //             </h2>
    //             <h2 class="lastApptTxt">Last Appointment:</h2>
    //             <h2 class="lastAppt">
    //             ${(date) ? `${date.toLocaleString('en-US', {dateStyle: 'medium' })} @ ${date.getHours()> 12 ?
    //                 date.getHours()-12 :
    //                 date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}` : 'N/A'}
    //             </h2>
    //             <h2 class="acctType">
    //                 ${ accountType }
    //             </h2>
    //             ${(date) ? `<button class="moreBtn" onclick="getAppts('${ id }')">More...</button>` : ''}
    //         </div>
    //     `;
    // }
})();

const updateAccounts = () => {
    accountsDOM.innerHTML = '';
    for(user of tempUsers) {
        const { _id: id, name, email, accountType, serviceHistory } = user;
        const date = (serviceHistory[serviceHistory.length-1]) ? new Date(Number(serviceHistory[serviceHistory.length-1].date.split('-')[0]), Number(serviceHistory[serviceHistory.length-1].date.split('-')[1]), Number(serviceHistory[serviceHistory.length-1].date.split('-')[2]), Number(serviceHistory[serviceHistory.length-1].time.split(':')[0]), Number(serviceHistory[serviceHistory.length-1].time.split(':')[1])) : undefined;
        accountsDOM.innerHTML += `
            <div class="account flex-grid-item">
                <h1 class="name">
                    ${ name }
                </h1>
                <h2 class="email">
                    ${ email }
                </h2>
                <h2 class="lastApptTxt">Last Appointment:</h2>
                <h2 class="lastAppt">
                ${(date) ? `${date.toLocaleString('en-US', {dateStyle: 'medium' })} @ ${date.getHours()> 12 ?
                    date.getHours()-12 :
                    date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}` : 'N/A'}
                </h2>
                <h2 class="acctType">
                    ${ accountType }
                </h2>
                ${(date) ? `<button class="moreBtn" onclick="getAppts('${ id }')">More...</button>` : ''}
            </div>
        `;
    }
}

const filterByType = (type) => {
    switch (type) {
        case 'student': 
            tempUsers = users.filter((user) => user.accountType === 'student');
            break;
        case 'teacher': 
            tempUsers = users.filter((user) => user.accountType === 'teacher');
            break;
        case 'admin': 
            tempUsers = users.filter((user) => user.accountType === 'admin');
            break;
        default:
            tempUsers = users;
    }
    updateAccounts();
}

const sortByUser = (order) => {
    if(order == 'a-z') {
        tempUsers = users.sort((a, b) => { return (a.name > b.name) ? 1 : -1; });;
    } else {
        tempUsers = users.sort((a, b) => { return (a.name < b.name) ? 1 : -1; });;
    }
    updateAccounts();
}

const searchUsers = (str) => {
    tempUsers = users.filter(user => JSON.stringify(user).toLowerCase().includes(str.toLowerCase()));
    updateAccounts();
}