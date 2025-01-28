# Accessible Form UI Only
This project asked us to create a form UI using only HTML and CSS, based on a mockup from roadmap.sh. The goal was to focus on creating an accessible form that is usable for
all users, including those with disabilites. 

## How it was made:

**Tech used:** HTML & CSS only

Since this project did not require functionality, this project was made by adding all the required elements and then styling them with CSS. Once the elements were placed and 
styled, I began adding accessiblity features as outlined by the guidelines requested by the project. This included
- Labeling: Ensuring each input form field had a corresponding label element
- Focus states: Styling the focus state so keyboard only users can easily see which field was active
- Error Messaging: Adding space for error messages
- ARIA Attributes: Using ARIA attributes where necessary
- Color Contrast: Using colors that comply with WCAG standards
- Interactive Elements: Making sure that the show/hide passwod button was accesible via keyboard and screen reader and providedd clear feedback

## Visual Example
<img width="654" alt="Screenshot 2025-01-28 at 11 25 18" src="https://github.com/user-attachments/assets/e34ccc79-6296-4074-bb23-3b099ac23272" />

## How To Run The Project

This project does not use any external packages/libraries/componenets. You can run this project by downloading or copying the index.html and styles.css file into a new empty folder
and opening the index.html in your preferred browser.

## Lessons Learned:

I'll be honest, before this project I hadn't given much thought to the importance of well structured and clear accessibility features on the internet. I'm very happy that this
assignment opened up my eyes to the world of accessibility on the internet and I learned a lot reading throught the ARIA guidelines. I still have a lot to learn as I'm not entirely
sure I applied the accessibility concepts in the best way, but I ame excited to continue learning about accessibility in web development.
<br>
One direct example in this project was that I was trying to recreate the circular 'percent completion' bar and I figured I could label it with ARIA labels, but after
reading through their guidelines, I realized the better option was to use the built in HTML progress bar, even if it's not styled the way the project requested from us. This is
another project with lots of room for improvement, such as adding functionality to this form and better understanding best accessibility practices
