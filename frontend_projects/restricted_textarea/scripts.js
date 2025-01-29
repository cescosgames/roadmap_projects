const submittedText = document.getElementById('submittedText');
const currentCount = document.getElementById('currentCount');
const maxCount = document.getElementById('maxCount');
// get the relevant dom elements to modify above

let maxCharCount = 250;
// our set limit


// once our document is loaded, add events to our text area; I had a couple idea functions, but ultimately only added updateCharCount(), see below for how it works
document.addEventListener("DOMContentLoaded", (event) => {
    submittedText.addEventListener('input',(event) => {
        // if(event.key === "Enter") {
        //     // I wanted to prevent line breaks, but could not find a clean way to do it here
        //     // alert("enter pressed");
        // }
        // before using maxLength in our html, I was looking into placing a function here to prevent overtyping
        // if (submittedText.value.length = maxCharCount) {
        //     // alert("limit reached");
        // }
        //
        // call our upateCharCount function on 'input' in our textarea
        updateCharCount();
    })
});


// our main functions
function updateCharCount() {
    // get the current character count using value.length on our textarea
    const currentCharCount = submittedText.value.length;

    // set the innterHTML (or innterText, your call) to our currentCharCount as a string
    currentCount.innerHTML = `${currentCharCount}`;

    // if we are at our max count, add the limit class (makes everything red)
    if (currentCharCount === maxCharCount) {
        currentCount.classList.add('limit');
        maxCount.classList.add('limit');
        submittedText.classList.add('limit');
    }
    else { // otherwise, remove the limit class
        currentCount.classList.remove('limit');
        maxCount.classList.remove('limit');
        submittedText.classList.remove('limit');
    }
}