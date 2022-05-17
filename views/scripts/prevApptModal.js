const apptsDOM = document.getElementById('appts');
const modalDOM = document.getElementById('prevAppt');

const getAppts = async (id) => {
    const { data: { user }} = await axios.get(`/api/v1/admins/${id}`);
    modalDOM.style.display = 'flex';
    apptsDOM.innerHTML = '';
    await user[0].serviceHistory.forEach((service) => {
        const { name, email, services, date, time, notes } = service;
        const apptDate = (date && time) ? new Date(Number(date.split('-')[0]), Number(date.split('-')[1]), Number(date.split('-')[2]), Number(time.split(':')[0]), Number(time.split(':')[1])) : undefined;

        apptsDOM.innerHTML += `
            <div class="appt">
                <div class="leftHalf">
                    <h2>${ name }</h2>
                    <h3>${ email }</h3>
                </div>
                <div class="rightHalf">
                    <h2>${ apptDate.toLocaleString('en-US', {dateStyle: 'medium' })} @ ${apptDate.getHours()> 12 ?
                                apptDate.getHours()-12 :
                                apptDate.getHours()}:${apptDate.getMinutes()} ${apptDate.getHours() > 12 ? 'PM' : 'AM' }</h2>
                    <h3>${ services.join(', ') }</h3>
                    <h3>${notes}</h3>
                </div>
            </div>
        `;
    })
}

const closeAppts = () => {{
    modalDOM.style.display = 'none';
}}