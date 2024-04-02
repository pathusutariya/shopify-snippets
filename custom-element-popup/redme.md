# Custom Element Pop-up

## Overview
The custom element pop-up is used to show the pop-up on the button click. The pop-up is responsive and can be used on any device. The pop-up is created using HTML, CSS, and JavaScript. you can show any content in the popup like images, text, videos, etc.

## Installation
To make the custom element pop-up work on your website, you need to follow the below steps:
- Copy the file content from `custom-elemet-popup.liquid` from current git directory.
- Create a new snippet in your theme code with same name and paste the copied code in it.
- Get the CSS and JS files from the assets folder and add them to your theme assets folder.
- Include the CSS and JS files where you want to use the pop-up.
- You need to add the below code in the button on which you want the popup to open.
    ```html
    data-popup-id="popup_main-1" data-popup-button
    ```
- Make sure that the data-popup-id is same as the id of the pop-up div.
- If your site has more than one custom popup, then you need to set different ids for each popup and button.
- After adding the files in folders and attributes in the button, test the pop-up by clicking on the button.
- If the pop-up is not working, check the console for any errors.
- If you are still facing any issues, check if any other JS or CSS is conflicting with the pop-up file.
