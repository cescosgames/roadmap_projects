# checkpoint JS Calculator
In this project, we were asked to create a basic calculator app that allows users to perform basic arithmetic operations. For design inspiration, 
I referenced a childs calculator that featured addition, subtraction, multiplication, division and negative operators.

## How it was made:

**Tech used:** HTML, CSS, JS

Copying the design of a childs calculator, I gathered all the necessary elements in HTML and did a quick style in CSS using a simple color scheme. 
Then I set up my JS and button inputs, attaching functions to buttons directly in HTML rather than in the JS itself.

## Lessons Learned:

A calculator seems so simple but it's the small things that one needs to focus on. For example, the negative operator - how to effectively implement it?
Ultimately I found a solution that worked for me in having a function that flipped whatever variable we were working on to positive or negative but initially
I ran into issues with situations such as when the variable was NaN or Null like when you first initialize the calculator. Definitely lots of room for 
improvement with this project, for example how to handle the variable we were currently working on while selecting an operator. For example, you are working
on your second variable and accidentally hit + or -, how should someone handle that? In my case, I changed the original operator but I can see how this could
be frustrating for users. How do real calculators handle this? Wish I had one to reference.
<br>
Anyway, I'm rambling now but it was fun creating the different functions and having them all interact with each other.
