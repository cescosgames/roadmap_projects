// get our menu button
const menuButt = document.getElementById("menu-btn");
// get our menu
const mobileNav = document.getElementById("menu-absolute");



document.addEventListener("DOMContentLoaded", (event) => {
    addButtonFunction();
});

function addButtonFunction() {
    menuButt.addEventListener('click', () => {
        menuButt.classList.toggle('open');
        mobileNav.classList.toggle('flex');
        mobileNav.classList.toggle('hidden');
    })
}