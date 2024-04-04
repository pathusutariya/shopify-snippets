# Sticky Content

## Overview
This snippet will help you to stick any content on the page. This is useful when you want to show some content on the page and you want to make sure that it is always visible to the user.

## Installation
To make the sticky content at the bottom of the page, you need to follow the below steps:

- You need to create a JS file in the asset folder in your theme code to add the JS for the sticky content.
- After creating the JS file, you need to add the JS file link in the `theme.liquid` file as shown below:
    ```html
    <script src="{{ 'sticky-content-at-bottom.js' | asset_url }}" defer="defer"></script>
    ```
- After adding including the file, copy the JS from the `sticky-scroll.js` of current repository.
- Paste the copied JS in the `sticky-scroll.js` file of your theme code.
- You need to add a class `'header-wrapper'` in the header tag to make sticky content. it is necessory to add this class.   
- Copy the below mentioned JS code and paste it in `theme.liquid` file before the closing of the body tag.
    ```html
    <script>
      window.Theme = window.Theme || {};
      window.Theme.mediaQueries = {
        sm: '(min-width: 600px)',
        md: '(min-width: 719px)',
        lg: '(min-width: 1024px)',
        xl: '(min-width: 1280px)',
        xxl: '(min-width: 1536px)',
        portrait: '(orientation: portrait)'
      };
    </script>
    ```
- You can change the media queries as per your requirement that matches with your theme.
- You need to add the parent element on which you want to make the sticky content.
- Add the below element as parent element of the sticky content:
    ```html
    <sticky-scroll-direction data-min-sticky-size="md">
        <!-- Your sticky content goes here -->
    </sticky-scroll-direction>
  ```
- In the parent element of `sticky-scroll-direction`, you need to add the data attribute `data-sticky-height-elems=""`.
- In the `data-sticky-height-elems=""`, add the selector of the sticky content.
- For example, if you want to make the sticky content of the class `sticky-content` then you need to add the selector of the sticky content as shown below:
    ```html
    <div data-sticky-height-elems=".sticky-content">
        <sticky-scroll-direction data-min-sticky-size="md">
            <!-- Your sticky content goes here -->
        </sticky-scroll-direction>
    </div>
    ```
- To stick the content, you need to add the `position: sticky;` to the sticky content element.
- By position sticky, the content will stick to the top of the page with the help of JS.
- By adding the `display: block;`, the content will stick to the bottom of the page.

## Usage
Once the Sticky Content feature is implemented in your Shopify theme, the specified content elements will stick to the bottom of their container while scrolling. Users can interact with the sticky content as they navigate through the page on website, providing a seamless browsing experience.

## Compatibility
The Sticky Content feature is compatible with modern web browsers in all Shopify themes. It adapts to only desktop devices and is not supported on mobile and tablet devices.