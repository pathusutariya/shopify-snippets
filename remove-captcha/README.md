# Remove Captcha

## Overview
With this code, you can remove the CAPTCHA validation on form submit in shopify. To remove the CAPTCHA validation on form submit in Shopify, you typically need to modify the code that handles form submission, which is usually found in the theme files. Here's a general guide on how to approach this:

## Installation
You need to make changes in below mentioned files to remove the captcha on form submission.

- Copy the below code and paste it in form tag in which you want to remove the captcha.
  ```javascript
   onsubmit='window.Shopify.recaptchaV3.addToken(this, "create_customer"); return false;'
  ```
- Get the id of form that you want to remove the captcha validation and replace the form id in the code.

## Conclusion
After making the above changes, the CAPTCHA validation should be removed from the form submission in Shopify. This will allow users to submit the form without having to complete the CAPTCHA verification.
