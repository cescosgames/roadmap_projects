const accordionTabs = document.querySelectorAll(".accordionTab");
const accordionCarets = document.querySelectorAll(".downCaret");
// get the tabs and carets from our document. NOTE these are not returned as arrays, these are returned as NodeLists


// our main function to add functionality to each tab
function addFunctionalityToEachTab() {
    // for each tab
    accordionTabs.forEach(element => {
        // add below function on click
        element.addEventListener('click', () => {
            // if we are clicking on an active tab, just 'close' all actives (by close, we mean remove the class active)
            if(element.classList.contains('active')) {
                closeActiveTabs();
            }
            // if we are clicking on another tab, 'close' all tabs first, then add our active class to 'open' the selected tab
            else {
                closeActiveTabs();
                element.classList.add('active');
            }
        })
    })
}

// this is our closeActive tabs function
function closeActiveTabs() {
    // fo each accordion, remove active to ensure they are closed
    accordionTabs.forEach(element => {
        element.classList.remove('active');
    })

    // this was before I switched to rotating in CSS, I was looking into rotating in JS. It's quicker and easier to rotate in CSS
    // accordionCarets.forEach(element => {
    //     element.style.transform = 'rotate(180deg)';
    // })
}

// this calls our addFunctionality function once our page is loaded to ensure no errors occur with connecting before the page is loaded
document.addEventListener("DOMContentLoaded", (event) => {
    // addFunctionalityToEachTab()
    addFunctionalityToEachTab();
})