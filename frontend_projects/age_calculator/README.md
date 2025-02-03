# Age Calculator
This project tasked us with creating an age calculator using HTML, CSS, and JS. The goal of this project was to solidfy our knowledge with using external packages.


## How it was made:

**Tech used:** HTML, CSS, JS, Luxon

The process was similar to the other projects. Design first, then add functionality. The only outside package used in this project was Luxon which we use to
handle date information.

## Visual Example

![agecalcexample](https://github.com/user-attachments/assets/2a5c87ff-f6db-438a-951d-9f9a1dd6f61a)

## How To Run The Project

To run this project, copy or download the HTML, CSS, and JS files into your own folder. Then make sure you have installed the Luxon library and you should be 
good to run it locally!

## Lessons Learned:

Another package, another lesson in thoroghly reading the documentation. The two reasons this project slowed me down were 1. overthinking how to display
error messages to a user and 2. trying to find workarounds that the luxon library already solved. When I initially saw the project, I thought I would use
what sounded right to me to calculate time differences (date-date), but this didn't exactly work. I experimented a lot until I found out about the .diff function
built into luxon that would return the duration between two dates (aka age). So once again, thoroughly read the documentation before committing to an idea you
have in your head.
<br>
Overall though, I think this project is exactly what I want it to be. I added all the small things I had in my mind to improve it, such as button disabling,
and correct error messages, and I'm happy with the final result. 
<br>
Reviewing the requirements, I am realizing right away I completely missed the first requirement of using a JavaScript datepicker. If I were to revisit this project,
I would certainly use the javascript datepicker. The other requirements however I believe I locked in. Used luxon library to calculate exact age, displayed
the result on the same page, implemented basic validation, and used simple styling to make it responsive. 
