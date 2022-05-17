const flexGrids = document.getElementsByClassName('flex-grid');
let columnCount;

function columns() {
    for (let i = 0; i < flexGrids.length; i++) {
        const flexGridItems = flexGrids[i].getElementsByClassName('flex-grid-item');
        console.log(flexGridItems);
        const gridWidth = flexGrids[i].offsetWidth;
        const itemWidth = flexGridItems[0].offsetWidth;
        if (condition) {
            console.log(gridWidth, itemWidth);
        }
    }
}

columns();

window.addEventListener('resize', function() {
    columns();
})