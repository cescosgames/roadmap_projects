const cookiebox = document.querySelector(".cookiesPopUpHolder") // get our cookies pop up
const fades = document.querySelectorAll(".fade") // find all faded elements

// experimenting with new approaches, using onclick this time instead of adding event listener
// see html for attaching our function to our button

// when we accept cookies, remove the active tag to hide our popup
function acceptCookies() {
    cookiebox.classList.remove('active') // removing the active tag
    saveConsentPref()
    unfade()
}

// for closing out the cookie tab
function closeCookieTab() {
    cookiebox.classList.remove('active') // removing the active tag
    unfade()
}

// using local storage to remember user preferences NOTE: local storage can only store strings. Switched from true/false to yes/no to emphasize it is not bool
function saveConsentPref() {
    localStorage.setItem('consent', 'yes')
}
// option to clear our consent
function clearConsentPref() {
    localStorage.removeItem('consent')
}

// unfade everything
function unfade() {
    fades.forEach(fade => fade.classList.remove('fade'))
}

// when we start, we want to add the cookies if user hasn't already accepted before
function showCookies() {
    const currentConsent = localStorage.getItem('consent') || 'no'; // default to false if nothing is declared NOTE: THIS IS NOT A BOOL, string only 
    if (currentConsent === 'no') {
        cookiebox.classList.add('active') // adding the active tag
    }  
    else {
        cookiebox.classList.remove('active') // adding the active tag
        unfade()
    }
    
}

// when content is loaded, call this functino
document.addEventListener("DOMContentLoaded", () => {
    clearConsentPref() // for testing purposes 
    showCookies()
})