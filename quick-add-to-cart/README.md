
# Quick Add to cart bar

## Introduction

The Quick Add to Cart Bar is a user interface feature designed to enhance the user experience by providing convenient access to the shopping cart functionality while browsing a product page. This feature is particularly useful where users frequently browse through various products and may want to add items to their cart without having to scroll back to the top of the page.

## Implementation

- The Quick Add to Cart Bar is implemented as a fixed-positioned bar located at the bottom of the product page. As the user scrolls down the page, the bar remains visible, allowing users to easily add the product to their cart without interrupting their browsing experience.
  #### Features
    - Fixed Position: The bar remains fixed at the bottom of the viewport, ensuring it is always visible to the user.
    - Add to Cart Button: The primary action button allows users to quickly add the product to their cart with a single click.
    - Product Information: The bar may display essential product information such as name, price, and quantity selector for easy reference.
    - Responsive Design: The Quick Add to Cart Bar is designed to be responsive and compatible with various screen sizes and devices.

## Installation
1. You need to add below mentioned files in your theme code if not already present.
   - `quick-cart.liquid`
   - `quick-cart.js`
   - `quick-cart.css`
   - If you have already added these files then you can skip this step.
2. Include the `quick-cart.liquid` snippet in the main-product section, after the liquid code ends and before the schema settings.
   ```liquid
    {% render 'quick-cart' %}
   ```
3. Find the id that is shown in product form in product page and copy the id.
4. On product page find the id of the form and replace the id in `quick-cart.js` with the id you copied in previous step.
   ```liquid
    {% assign product_form_id = 'product-form-' | append: section.id %}
   ```
   Replace `product-form-` and add the id that is shown in product form in product page.
5. You have to also change the selector of quantity selector in `quick-cart.js` as shown in quantity selector in product form to change the quantity and add to cart.
6. Add JS and CSS files in your theme code assets folder.
7. After adding the files and making the changes in the `quick-cart.liquid` file, you can check the product page and you will see the quick add to cart bar at the bottom of the page.
8. You can also change the look and feel of the bar by changing the css in `quick-cart.css` file.
9. If the bar is not visible or not working properly then you can check the console for any errors or any conflicts with other scripts in the page.

## Conclusion

- The Quick Add to Cart Bar is a valuable enhancement to any e-commerce website, providing users with seamless access to the shopping cart functionality while browsing product pages. By implementing this feature, you can improve user engagement and streamline the shopping experience, ultimately leading to increased conversions and customer satisfaction.

