const newUserForm = document.getElementById('create-user-form');
const modals = document.getElementsByClassName('modal-container-brk');
const modalTitles = document.getElementsByClassName('modal-title');
const accountInputDOM = document.getElementById('account-input');

// Submits new user to the api
newUserForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const passwordCheckInput = document.getElementById('password-check-input');
    const accountInput = document.getElementById('account-input');

    let curAccounts = await axios.get('/api/v1/admins');
    curAccounts = curAccounts.data.allUsers;
    let accExists = false;

    // If an account already exists, the program stops
    for (let i = 0; i < curAccounts.length; i++) {
        if (curAccounts[i].email === emailInput.value) {
            modals[2].style.display = 'flex';
            accExists = true;
            return;
        }
    }

    if (!/@west-mec.org\s*$/.test(emailInput.value)) { // Checks if the email is a West MEC email
        modals[1].style.display = 'flex';
        return;
    } else if (accountInput.value == 'default') { // If the select option is default, the program stops
        modals[3].style.display = 'flex';
        return;
    } else if (passwordInput.value !== passwordCheckInput.value) { // If the passwords aren't the same, the program stops
        modals[4].style.display = 'flex';
        return;
    } else if (!accExists) { // If all conditions are met, shows success modal
        modalTitles[0].style.color = 'green';
        modals[0].style.display = 'flex';
    }

    const newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        accountType: accountInput.value
    }

    try {
        await axios.post('/api/v1/admins', newUser);
    } catch (error) {
        console.log(error);
    }
})

// Closes the Modal
for (let i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function() {
        modals[i].style.display = 'none';
        if (i === 0) {
            location.reload();
        }
    });
}

// Makes Default option gray
accountInputDOM.addEventListener('change', function() {
    if (accountInputDOM.value !== 'default') {
        accountInputDOM.style.color = 'black';
    }
})