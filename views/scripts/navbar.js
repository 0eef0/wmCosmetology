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
    await axios.post('/admins/logout');
})

// Gets current user and all their information
const getCurrentUser = async () => {
    await axios.get('/api/v1/admins/current')
        // .then(response => response.json())
        .then((response) => {
            const { data } = response;
            const { user } = data;
            console.log(response);
            if (!user) {
                return;
            } else {
                if (user.accountType == 'admin') {
                    newUserBtn.style.visibility = 'visible';
                    newUserBtn.style.display = 'grid';
                }
            }
        })
}
getCurrentUser();