# Sticky Header

## About
This snippet will help you to make your site header sticky.

## Installation
- To make your site header sticky you just need to follow the below steps.
- Files in this folder that you have to add in related folders in your theme code:
    - `sticky-header.liquid`
- If your theme has this type of file then you can merge the code from this file to your theme file otherwise you need to create a snippet like this and have to add in your theme.
- After adding the file in your theme code, you have to add the below code in your theme code file where you want the sticky header to appear.
  ```liquid
  {% section 'sticky-header' %}
  ```

## Usage

- Once installed, the sticky header will automatically stick to the top of the viewport as the user scrolls down the page. You can include your navigation links, logo, or any other content within the header.
- If your header can't be sticky then you have to check if any other CSS or JS is conflicting with this code.
- You can customize the sticky header as per your need by changing the CSS in related CSS file.