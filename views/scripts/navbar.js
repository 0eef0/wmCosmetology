const linksDivDOM = document.querySelector('.links');
const barsDOM = document.querySelector('.fa-bars');
const navLinks = document.getElementsByClassName('link');
let navbarDOM = document.getElementsByClassName('navbar')[0];
const scheduleDOM = document.getElementById('schedule');
const logoutBtn = document.getElementById('logout');
const newUserBtn = document.getElementById('createUser');

const toggleNav = () => {
    linksDivDOM.classList.toggle("closed");
    barsDOM.classList.toggle("open");
}

// Adds Active class to current page
for (let i = 0; i < navLinks.length; i++) {
    if (`/${navLinks[i].id}` == window.location.pathname) {
        navLinks[i].classList.add('active');
    }
}

// Adds active class based on where you're scrolled to
if (window.location.pathname == '/') {
    let scrollPos = window.scrollY;
    let scheduleOffset = scheduleDOM.offsetTop - navbarDOM.clientHeight;
    if (scrollPos >= scheduleOffset) { 
        navLinks[0].classList.remove('active');
        navLinks[1].classList.add('active');
    }

    window.addEventListener('scroll', function () {
        let scrollPos = window.scrollY;
        let scheduleOffset = scheduleDOM.offsetTop - navbarDOM.clientHeight;

        if (scrollPos >= scheduleOffset) { 
            navLinks[0].classList.remove('active');
            navLinks[1].classList.add('active');
        } else { 
            navLinks[0].classList.add('active');
            navLinks[1].classList.remove('active');
        }
    })
}

// Logout Functionality
logoutBtn && logoutBtn.addEventListener('click', async () => {
    console.log('AddEventListener works');
    await axios.post('/admins/logout');
})

// Gets current user and all their information
const getCurrentUser = async () => {
    let currentUser = await axios.get('/api/v1/admins/current');
    currentUser = currentUser.data.user;
    // console.log(currentUser, currentUser.accountType);
    if (currentUser) {
        if (currentUser.accountType == 'admin') {
            newUserBtn.style.visibility = 'visible';
            newUserBtn.style.display = 'grid';
        }
    }
}
getCurrentUser();