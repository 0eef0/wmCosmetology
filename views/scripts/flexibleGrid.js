const flexGrids = document.getElementsByClassName('flex-grid');
const gridGap = 8; // Grid gap on each side of the grid item in px

// Calculates width of the grid and the first item, and changes the columns based on that
function gridColumnWidth(flexGrid, flexGridItems) {
    const gridWidth = flexGrid.offsetWidth;
    const itemWidth = flexGridItems[0].offsetWidth + (gridGap*2);
    const widthPercent = `${(1/Math.floor(gridWidth/itemWidth))*100}%`
    flexGrid.style.gridTemplateColumns = `repeat(auto-fill, ${widthPercent})`;
}

// Takes all grids and makes sure the gridItems exists before running the gridColumnWidth() function
function columns() {
    for (let i = 0; i < flexGrids.length; i++) {
        let flexGridItems = flexGrids[i].getElementsByClassName('flex-grid-item');
        const checkItems = setInterval(() => {
            flexGridItems = flexGrids[i].getElementsByClassName('flex-grid-item');
            if (flexGridItems.length > 0) {
                clearInterval(checkItems);
                gridColumnWidth(flexGrids[i], flexGridItems);
            }
        }, 50)
    }
}

// Runs the columns calculation when the website loads
columns();

// Checks the column sizes based on the window width
window.addEventListener('resize', function() {
    columns();
})