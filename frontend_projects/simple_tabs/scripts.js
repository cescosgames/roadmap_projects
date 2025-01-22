document.addEventListener('DOMContentLoaded', function() {

    const tabcontents = document.querySelectorAll(".tab-content") // will return our tab contents into an array
    const tabButtons = document.querySelectorAll(".tab-button") // will return our tab buttons into an array
    // NOTE JS can't read hyphens, need to use camelCase

    tabButtons.forEach(tabButton => { // for each button
        tabButton.addEventListener('click',function() { // add a function
            tabButtons.forEach(tabButton => tabButton.classList.remove('active')) // remove all active 
            this.classList.add('active') // add active to THIS (button we are clicking)
            // now we have taken care of modifying the tab to reflect which one is active, next is content

            tabcontents.forEach(tabContent => tabContent.classList.remove('active')) // remove all active content

            // display the correct content - how do we approach this? I'll try using data and ID's
            const targetContent = document.getElementById(this.getAttribute('data-target'));
            targetContent.classList.add('active')
        })
    })

    tabButtons[0].classList.add('active') // set the first tab as active
    tabcontents[0].classList.add('active') // and set the first content as active on start

})