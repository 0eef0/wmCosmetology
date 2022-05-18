const apptsDOM = document.getElementById('appts');
const modalDOM = document.getElementById('prevAppt');

const getAppts = async (id) => {
    const {data: {appointments}} = await axios.get(`/api/v1/appointments/${id}`);
    modalDOM.style.display = 'flex';
    apptsDOM.innerHTML = '';
    console.log(appointments)
    await appointments.forEach((service) => {
        if(!(service.walkIn == undefined)) {
        const { name, email, services, appointmentDateTime: date, notes } = service;

        apptsDOM.innerHTML += `
            <div class="appt">
                <div class="leftHalf">
                    <h2>${ name }</h2>
                    <h3>${ email }</h3>
                </div>
                <div class="rightHalf">
                    <h2>${ date.toLocaleString() }</h2>
                    <h3>Services: ${ services.join(', ') }</h3>
                    <h3>Additional Notes: ${notes}</h3>
                </div>
            </div>
        `;
        } else {
            const { name, email, serviceRequest, appointmentDate, additionalInformation, city, state, dateOfBirth, address, growthPattern, hairClassification, hairCondition, hairDensity, hairElasticity, hairLength, hairPorosity, hairTexture, scalpCondition, imageUrls } = service;
            const apptDate = (appointmentDate) ? new Date(Number(appointmentDate.split('-')[0]), Number(appointmentDate.split('-')[1]), Number(appointmentDate.split('-')[2])) : undefined;
            const birthDate = (dateOfBirth) ? new Date(Number(dateOfBirth.split('-')[0]), Number(dateOfBirth.split('-')[1]), Number(dateOfBirth.split('-')[2])) : undefined;

            const getImgs = () => {
                let imgs = [];
                imageUrls.forEach((url) => {
                    imgs.push(`<img src=${url} />`)
                })
                return imgs;
            }

            apptsDOM.innerHTML += `
                <div class="appt">
                    <div class="leftHalf">
                        <h2>${ name }</h2>
                        <h3>${ city }, ${ state }</h3>
                        <h3>${ address }</h3>
                        <h3>DOB: ${ birthDate.toLocaleString('en-US', {dateStyle: 'medium' }) }</h3>
                        <h3>${ email }</h3>
                        <div class="modalImgs">
                            ${ getImgs() }
                        </div>
                    </div>
                    <div class="rightHalf">
                        <h2>${ apptDate.toLocaleString('en-US', {dateStyle: 'medium' })}</h2>
                        <h3>Services: ${ serviceRequest }</h3>
                        <h3>Additional Notes: ${additionalInformation}</h3>
                        <h3>Hair Growth Pattern: ${ growthPattern }</h3>
                        <h3>Hair Classification: ${ hairClassification }</h3>
                        <h3>Hair Condition: ${ hairCondition }</h3>
                        <h3>Hair Density: ${ hairDensity }</h3>
                        <h3>Hair Elasticity: ${ hairElasticity }</h3>
                        <h3>Hair Length: ${ hairLength }</h3>
                        <h3>Hair Porosity: ${ hairPorosity }</h3>
                        <h3>Hair Texture: ${ hairTexture }</h3>
                        <h3>Scalp Condition: ${ scalpCondition }</h3>
                    </div>
                </div>
            `;
        }
    })
}

const closeAppts = () => {{
    modalDOM.style.display = 'none';
}}