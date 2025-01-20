// our constants
// const getProfileButton = document.getElementById('getText')
// const getUsersButton = document.getElementById('getUsers')
// const getAPIButton = document.getElementById('getAPI')
// const addAPIButton = document.getElementById('addAPI') // get our form
const fetchGitHubProfileButton = document.getElementById('getProfileButton')
const githubURLinputField = document.getElementById('githubURL')
const baseURL = 'https://api.github.com/users/'

// on start
document.addEventListener("DOMContentLoaded", (event) => {
    fetchGitHubProfileButton.addEventListener('click',getProfile);

    /*
    getProfileButton.addEventListener('click',getText); // adding our click button function
    getUsersButton.addEventListener('click',getUsers); // adding our json function
    getAPIButton.addEventListener('click',getAPI); // adding our online API function thanks to JSONPlaceholder by typicode
    addAPIButton.addEventListener('submit', addAPI); // Adding our addAPI function to our form submit element
    */
  });


function getProfile() {
    // get the URL we need (the githubapi user fetch + their username added on)
    let finalURL = baseURL.concat(githubURLinputField.value)

    // recieve their json information
    fetch(finalURL) // fetch from our URL
        .then((res) => res.json()) // return our fetch (res)ponse as a json file
        .then((data) => { // pass that json in the next function
            let output = data.bio
            
            if(output === null) {
                //alert("match")
                output = "User exists, no bio found"
            }

            if(output === undefined) {
                //alert("undefined")
                output = "User not found, please check username"
            }

            document.getElementById('output').innerHTML = output; // get the output again, and set it equal to our new output!
    })
    .catch((error) => alert('ERROR')) // this isn't catching anything because nothing is going wrong, an empty username search or invalid one still returns a successful response
    // if I want to validate the response, I would be better off using '.ok' instead of the === undefined I currently have. 
    
    githubURLinputField.value = "" // resetting after we search
}






// below are our functions we used to learn about the fetch API, going over fetch from a local text file, a json text file, a remote json file, and adding to a remote json file
// thanks to traversy media, typicode, and other resources for providing information and resources to learn about the fetch api
// the previous code will all be commented out, and I will be creating my own github fetch function above as listed by roadmap

// our functions
// first one to recieve information from a txt file
// function getText() {
//     // fetch takes in a parameter like a URL or file
//     // fetch('sample.txt')
//     // .then(function(res) {
//     //     //console.log(res.text()) // for debugging, can return things like res.text(), res.json() etc.
//     //     return res.text() // returning our text
//     // })
//     // .then(function(data) { // need another .then after returning our res.text() in order to convert it into what we are looking for (the text itself)
//     //     console.log(data) // log it
//     // }) 

//     //can make the above look a lot prettier using => function instead
//     fetch('sample.txt') //this says the same as above, replacing function with =>
//     .then((res) => res.text()) 
//     .then((data) => {
//         document.getElementById('output').innerHTML = data;
//     })
//     .catch((error) => console.log(err)) // can add a .catch to try and catch errors

//     // fetch returns a 'promise', a placeholder for the response we are going to get. The promise requires '.then'
//     // '.then' takes in a function with res (response) as an argument
// }

// // second one to recieve information from a json file
// function getUsers() {
//     fetch('sample.json') // get our json file as parameter for our fetch request
//     .then((res) => res.json()) // have our .then function return the .json file
//     .then((data) => { // after we returned our json, pass it as a paramter for our next function NOTE: data/any valid word is just a parameter representing the value returned by the previous .then() callback
//         let output = '<h2>Users</h2>';
//         data.forEach(function(user) { // can use for each with any array! 
//             output += `
//             <ul>
//                 <li>ID: ${user.id}</li>
//                 <li>Name: ${user.name}</li>
//                 <li>Email: ${user.email}</li>
//             </ul>
//             `; // styling above in html, just like Unity and Godot, can use ${variable} to add what you need
//         }) // now we have finished our for each loop (for each user, return this html list)
//         document.getElementById('output').innerHTML = output; // get the output again, and set it equal to our new output!
//     })
// }

// // third function to recieve API data (in json format)
// function getAPI() {
//     fetch('https://jsonplaceholder.typicode.com/posts') // this is from JSON placeholder created by typicode, thanks typicode!
//       .then((res) => res.json()) // return our fetch (res)ponse as a json file
//       .then((data) => { // pass that json in the next function
//         let output = '<h2>Users</h2>'; // similar to above
//         data.forEach(function(post) { // for each again on the posts saved in the json file
//             output += `
//             <div>
//                 <h3>${post.title}</h3>
//                 <p>${post.body}</p>
//             </div
//             `; // styling above in html, just like Unity and Godot, can use ${variable} to add what you need
//         }) // now we have finished our for each loop (for each user, return this html list)
//         document.getElementById('output').innerHTML = output; // get the output again, and set it equal to our new output!
//     })
// }

// // fourth function, this function (not actually functional) adds a post to the JSON placeholder database online (again, not actally, just testing)
// function addAPI(event) { // since we are using our form, add event as input
//     event.preventDefault(); // if the event does not get explicitly handled, don't take action as normal

//     let title = document.getElementById('title').value; // get the value of our title input in our form
//     let body = document.getElementById('body').value; // same as above, but for our body input

//     fetch('https://jsonplaceholder.typicode.com/posts', { // takes in 2 parameters
//         method:'POST',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-type':'application/json'
//         },
//         body:JSON.stringify({title:title, body:body})
//     })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
// }