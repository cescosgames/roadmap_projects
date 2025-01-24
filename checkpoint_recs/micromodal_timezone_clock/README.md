# Simple webpage showing current time of user with added modal to change timezone
This project builds off the previous project and asked us to enahnce our clock with a modal that allowed users to switch timezones.

## How it was made:

**Tech used:** HTML, CSS, JS, dayjs, micromodal

Building off the previous project, I wanted to keep the concept the same but stick more to the original design and focus on functionality first. To build this project,
I replicated the original clock design first. Then I set up and styled the modal using the micromodal docs as reference. Finally, I implemented functionality using dayjs.

## visual demo
![timezone_clock](https://github.com/user-attachments/assets/49eacf69-4c87-4968-970d-dfc18893fceb)

## Lessons Learned:

While I originally planned on building off the previous project entirely, I remembered that this project asked us to not use bundlers, opting for installing modules using
simple link and script tags in our html instead. So I rebuilt the project with this in mind, and while I thought it would be easier, my mindset was shifted towards 
bundlers and this caused me some delays! Another important lesson I've learned many times, focus on the actual issue instead of what you think the issue is. This will
save you a lot of time! Anyway I got to learn about micromodal and it's pretty incredible. Other than that today was mostly standard learn as you go type work with installing
micromodal directly into the project instead of practicing with it inside another project. <br> Like most of these projects, there is certainly much room for improvement. For 
example, I only included 5 time zones. This was mostly because I could not find documentation listing how dayjs categorizes timezones and what timezones they have. The site
itself also isn't very responsive, specifically the modal. And if I do go back to this project, I would like to explore micromodal more, specifically how to tab across all
elements, including new ones, inside the modal to allow full keyboard functionality.
