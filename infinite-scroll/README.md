# Infinite Scroll Function for Shopify

## Overview
Infinite scrolling is a technique used to enhance user experience by loading more products dynamically as the user scrolls down the collection page, eliminating the need for pagination. This documentation provides a guide on implementing infinite scrolling in Shopify collections.

## Features
- Endless scrolling - scroll to the bottom of the content to load next.
- Endless click - Like endless scroll but click a link to load the next pages.

## Installation
To make the infinite scroll functionality work on your Shopify store, follow the steps below:
- Copy the code from `ajaxinate.min.js` and paste it in the JS file of your theme code and add JS file in your theme assets. 
- You need to copy the code from the section `infinite_scroll.liquid` and paste it in your theme code.
- If your theme code has layout for the infinite scroll then you can merge the code with your existing code otherwise you can add the above mention file in your theme code.
- Include the section `infinite_scroll.liquid` in your code where you want to show the infinite scroll.
- Add the `ajax-loader.gif` as well in the assets folder of your theme code to show the loader while loading the next page.
- If you don't want to use the code from the section `infinite_scroll.liquid` then you can use your custom selector and set it as container in JS to implement the infinite scroll.
- It it necessary to add the pagination code of infinite scroll to make collection or blog page work with infinite scroll.
- For the pagination or load more text you can use the code mentioned below:
    ```liquid
    <div id="AjaxinatePagination">
        {% if paginate.next %}
            <a href="{{ paginate.next.url }}">Loading More</a>
        {% endif %}
    </div>
    ```
- Set up your collection or blog template,for example:

<code>>_liquid</code>

    {% paginate collection.products by 3 %}
        <div id="AjaxinateLoop" >
        {% for product in collection.products %}
            {% include 'product-grid-item' %}
        {% endfor %}
        </div>
    
        <div id="AjaxinatePagination">
        {% if paginate.next %}
            <a href="{{ paginate.next.url }}">Loading More</a>
        {% endif %}
        </div>
    {% endpaginate %}

- Initialize it in your script file or inline


## Settings
If you wish to change the names of the selectors you can pass them in with the following settings.

| Option | Default | Type | Description 
| ------ | ------ |  ------ | ------ |
| pagination | #AjaxinatePagination | String | A selector to identify the pagination container. |
| container | #AjaxinateLoop | String | A selector to identify the grid that you want to duplicate. |
| method | scroll | String | Can be changed to click to that users must click to load more. |
| offset | 0 | Integer | Decrease the distance required to scroll before sending a request. |
| loadingText | Loading | String | Change the text of the pagination link during a request. |
| callback | null | Function | A function fired after the new page has been loaded. |

## Methods

### .destroy()
Description: Stop Ajaxinate from running and unbind the event listeners

<code>>_javascript</code>

    // Create a new ajaxinate instance
        const endlessCollection = new Ajaxinate();
    // Destroy the instance
        endlessCollection.destroy();

## Testing

- After implementing the above steps, test the infinite scrolling functionality thoroughly to ensure it works as expected across different devices and browsers.

## Conclusion

- Congratulations! You have successfully implemented infinite scrolling in your Shopify collection, providing a seamless browsing experience for your customers.