# Gift product add to cart

## Overview
This is a shopify section file which will allow to add a gift product to cart. Gift product will be added to cart when user will select a product from the list.
    
## Installation
You need to follow the below steps to install add gift product to cart in your shopify theme.
- Copy the file code from `gift-product.liquid` from current git directory.
- Create a new section file in your theme code with same name and paste the copied code in that file.
- You need to include the section file where you want to show the gift product list.
    ```liquid
    {% section 'gift-product' %}
    ``` 
- Copy the file content from `gift-product.js` from current git directory.
- Create a new js file in your theme code with same name and paste the copied code in that file.
- The JS code is in jquery so make sure you have included jquery in your theme.
- If you have not included jquery then you can include it by adding below code in your theme.liquid file.
    ```html
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    ```
- Now you need to include the js file in your theme.liquid file below the jquery CDN link.
    ```html
    <script src="{{ 'gift-product.js' | asset_url }}" defer="defer"></script>
    ```
    