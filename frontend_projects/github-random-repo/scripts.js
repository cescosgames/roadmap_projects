// our drop down constants
const clickArea = document.getElementById('clickArea');
const selectedOption = document.getElementById('selectedOption');
const dropdownMenu = document.getElementById('dropdownMenu');
const downCaret = document.getElementById('downCaret');
let listOptions = document.querySelectorAll('.listOption');

// our information variables
let selectedLanguage = '';

// our bool checking if menu is open or not
let isOpen = true

// our html to modify for visual feedback on the random repo
const randRepoTitle = document.getElementById('repoTitle');
const randRepoDescript = document.getElementById('repoDescr');
const randRepoLang = document.getElementById('languageNumText');
const randRepoStars = document.getElementById('starsNumText');
const randRepoForks = document.getElementById('forkNumText');
const randRepoErrs = document.getElementById('errorNumText');
const infoBoxText = document.getElementById('infoBoxText');

// our refresh button
const refreshButt = document.getElementById('refreshButt');

// adding our functionality on load
document.addEventListener("DOMContentLoaded", (event) => {
    // set initial info box
    setDefaultInfo();

    // get our language options from the list
    getLanguages();

    // adding the dropdown functionality here
    addDropDownFunction();

    // add the outside click function to close dropdown by clicking outside
    addOutsideClickFunc();
})


// first we need to fetch the necessary languages from the url provided
async function getLanguages() {
    // get our URL from the project page
    const languagesURL = "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";
    
    try {
        // fetch the language data from the URL
        const languages = await fetch(languagesURL);
        // get the json from the data
        const data = await languages.json();
        // for each language, add an option to our scoller
        data.forEach((language) => {
            // create the list element
            const languageOption = document.createElement('li');
            // add our styling
            languageOption.classList.add('listOption');
            // add our content from the JSON
            languageOption.textContent = language.title;
            // append it to our list
            dropdownMenu.appendChild(languageOption);
        });
        // once we have all our languages appended, give them all functionality
        addListOptionFunction();
    } catch (error) {
        // log the error if it doesn't work
        console.error(error);
    }
}

// then we need to get a random repo that uses the language selected

async function getRandomRepo() {
    // our URL, taken from the github api docs, getting 30 most popular in the language provided
    const repoURL = `https://api.github.com/search/repositories?q=language:${selectedLanguage}&sort=stars&order=desc`;

    try {
        // set the loading info
        setLoadingInfo();
        // fetch from our url
        const repos = await fetch(repoURL);
        // get the json data
        const data = await repos.json();
        // get a random index to select a random repo
        const randIndex = Math.floor(Math.random() * data.items.length);
        // select a random repo using the index
        const randRepo = data.items[randIndex];
        // populate the info
        randRepoTitle.innerText = randRepo.name;
        randRepoLang.innerText = randRepo.language;
        randRepoStars.innerText = randRepo.stargazers_count;
        randRepoForks.innerText = randRepo.forks_count;
        randRepoErrs.innerText = randRepo.open_issues_count;

        // check if we have description
        if (randRepo.description) {
            randRepoDescript.innerText = randRepo.description;
        } else {
            randRepoDescript.innerHTML = '<i>No Description Available For This Project</i>';
        }

        // remove info screen if we loaded correctly
        setNoInfo();

    } catch (error) {
        // set error info if wrong and console log the error
        setErrorInfo();
        console.error(error);
    }
    
}










// the drop down menu functions below

// test function below to close the menu if we click anywhere outside the document, I do not think this is the best approach
function addOutsideClickFunc() {
    document.addEventListener('click', (event) => {
        if(!clickArea.contains(event.target)) {
            if(isOpen) {
                closeDropDown();
            }
        }
    })
}
function addListOptionFunction() {
    listOptions = document.querySelectorAll('.listOption');

    listOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            selectedOption.innerText = option.innerText;
            selectedLanguage = option.innerText
            removeAllSelected();
            option.classList.add('selectedOption');
            closeDropDown();

            getRandomRepo();
        })
    })
}
function removeAllSelected() {
    listOptions.forEach(option => {
        option.classList.remove('selectedOption');
    })
}
function addDropDownFunction() {
    clickArea.addEventListener('click', (event) => {
        toggleDropDown();
    })
}
function toggleDropDown() {
    if(isOpen == true) {
        closeDropDown();
    }
    else {
        openDropDown();
    }
}
function closeDropDown() {
    dropdownMenu.classList.remove('menuOpen');
    downCaret.classList.remove('rotate');
    isOpen = false;
}
function openDropDown() {
    dropdownMenu.classList.add('menuOpen');
    downCaret.classList.add('rotate');
    isOpen = true;
}



// the setting info text functions
function setDefaultInfo() {
    // hide our refreshbutton
    hideRefreshButt();
    // remove hidden and issue, make it visible
    infoBoxText.parentElement.classList.remove('hidden');
    infoBoxText.parentElement.classList.remove('issue');
    infoBoxText.innerText = "Please Select a Language";
}

function setLoadingInfo() {
    // remove hidden, make it visible
    infoBoxText.parentElement.classList.remove('hidden');
    infoBoxText.parentElement.classList.remove('issue');
    infoBoxText.innerText = "Loading, please wait...";
}

function setErrorInfo() {
    // remove hidden, make it visible
    infoBoxText.parentElement.classList.remove('hidden');
    infoBoxText.parentElement.classList.add('issue');
    infoBoxText.innerText = "Error Fetching Repositories";
}

function setNoInfo() {
    // add hidden, make it invisible, this means success so we can show our refresh button here
    infoBoxText.parentElement.classList.add('hidden');
    infoBoxText.parentElement.classList.remove('issue');
    showRefreshButt();
}

// show or hide our refresh button
function showRefreshButt() {
    refreshButt.classList.remove('hidden');
}
function hideRefreshButt() {
    refreshButt.classList.add('hidden');
}
