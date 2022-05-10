const linksDivDOM = document.querySelector('.links');
const barsDOM = document.querySelector('.fa-bars')

const toggleNav = () => {
    linksDivDOM.classList.toggle("closed");
    barsDOM.classList.toggle("open");
}