# simple todo list
In the JS checkpoint, it was recommended to create a simple to-do list app that allows users to add, edit, and delete items using local storage.

## How it was made:

**Tech used:** HTML, CSS, JS

My approach with this project was to; 1. Lay out the HTML 2. style it with CSS (made an example checklist item) 3. remove all checklist items and move to JS to dynamically add
and remove them.

## Lessons Learned:

This was my first experience adding and removing items entirely in JS and it was a satisfying experience! I initially struggled with dynamically adding
the list components correctly (specifically styling and the X to delete the todo item). After experimenting with what it would look like in HTML it became
easier as I could just 'document.createElement' for the piece I was missing (the x). I need to start learning the icon references as well because initially
I was going to use X instead of '\u00d7'. 
<br>
I also started getting comfortable with 'keydown' elements to make a function that would allow users to input their item with the keyboard while the 
inputbox was selected. I also learned that addEventListeners has a bool argument! This was news to me since the default is set to false. This argument handles
the order of events (i.e. parent->child or child->parent). Neat!

<br>
With this project specifically, I felt like their was a lot of room for improvement in terms of design and functionality. However I am happy with how
the final result came out and might return to this project in the future to improve the whole concept.
