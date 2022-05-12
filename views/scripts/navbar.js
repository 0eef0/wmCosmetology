const linksDivDOM = document.querySelector('.links');
const barsDOM = document.querySelector('.fa-bars');
const navLinks = document.getElementsByClassName('link');
let navbarDOM = document.getElementsByClassName('navbar')[0];
const scheduleDOM = document.getElementById('schedule');

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
if (window.location.pathname == "/") {
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