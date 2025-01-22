# tabs Component
In this project, we were required to create a simple tabs functionality using HTML, CSS, and JS. We needed 4 tabs with the first being active by default.

## How it was made:

**Tech used:** HTML, CSS, JS

My approach with this project was to; 1. Lay out the HTML 2. style it with CSS (styled with first tab selected reference) 3. remove the specific styled CSS and move to JS to apply it using JS.

## Lessons Learned:

Very fun project. The main takeaways here was learning how to remove and apply css tags using JS. My approach to switching tabs was to
remove all active tags, then add an 'active' tag to the content I wanted displayed. I started by applying the tag to the tab itself to highlight which tab 
was active, then using ID's to apply active to the corresponding content.
<br>
For example, each tab had a 'data-tag' that was a string structured as 'tabX'. Then I applied ID's to each 'tab-content' with the relevant 'tabX'. With this
system it was easy to swap between tabs.
