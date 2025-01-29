# Tooltip CSS Only
This project asked us to create a basic tooltip UI using HTML and CSS only, using the provided mockup. The goal was to help understand 
how to use CSS for dynamic effects. Bonus points for different animations for the tooltip. 

## How it was made:

**Tech used:** HTML & CSS only

Similar to the other HTML and CSS only projects, this was made by gathering the elements in HTML, and styling in CSS. No outside libraries or componenets
were used.

## Visual Example

<img width="658" alt="Screenshot 2025-01-29 at 10 45 26" src="https://github.com/user-attachments/assets/d8700211-121a-4aac-8407-f71612ae9031" />

## How To Run The Project

To run this project, all you need to do is download or copy the html and css into an empty folder on your computer and launch on your preferred browser. 

## Lessons Learned:

I underestimated the power of :before and adding multiple classes to an item. My original approach was to create an absolutely positioned div that I would
reposition based on what we were hovering. I quickly realized that wouldn't be the best approach and after researching different approaches online, I realized 
each element could have a tooltip class attached to it that would only be visible on hover, and thanks to :before, I could change the content to accurately
reflect what we were hovering. 
<br>
This was a good reminder to not underestimate plain html and css. Again, there is lots of room for improvement here and if I revisited this project, I would
definitely want to experiment with different tooltip animations and more consistent transitions with the 'bottom-arrow' which right now is not very appealing.
