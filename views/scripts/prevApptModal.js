const apptsDOM = document.getElementById('appts');
const modalDOM = document.getElementById('prevAppt');

const getAppts = async (id) => {
    const { data: { user }} = await axios.get(`/api/v1/admins/${id}`);
    modalDOM.style.display = 'flex';
    apptsDOM.innerHTML = '';
    await user[0].serviceHistory.forEach((service) => {
        const { clientName, clientEmail, clientPhone, clientServices, apptDate, additionalNotes, clientHairInfo } = service;
        const date = new Date(apptDate);

        const getHairInfo = () => {
            let temp = '';
            for(info in clientHairInfo) temp += `${info}: ${clientHairInfo[info]}\n`;
            return temp;
        }

        console.log(service);
        apptsDOM.innerHTML += `
            <div class="appt">
                <div class="leftHalf">
                    <h2>${ clientName }</h2>
                    <h3>${ clientEmail }</h3>
                    <h3>${ clientPhone }</h3>
                    <h3>${ getHairInfo() }</h3>
                </div>
                <div class="rightHalf">
                    <h2>${ date.toLocaleString('en-US', {dateStyle: 'medium' })} @ ${date.getHours()> 12 ?
                                date.getHours()-12 :
                                date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM' }</h2>
                    <h3>${ clientServices.join(', ') }</h3>
                    <h3>${additionalNotes}</h3>
                </div>
            </div>
        `;
    })
}

const closeAppts = () => {{
    modalDOM.style.display = 'none';
}}