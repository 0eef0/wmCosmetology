let acc = document.getElementsByClassName("title-row");

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        let panel = this.nextElementSibling;
        let icon = this.lastChild;
        console.log(this.icon);
        console.log(icon);
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.opacity = 0;
            // icon.style.transform = "rotate(180deg)";
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.style.opacity = 1;
            // icon.style.transform = "rotate(-180deg)";
        }
    });
}