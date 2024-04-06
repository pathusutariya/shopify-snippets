## Pass Image with item while "Adding to Cart"

## Overview
This functionality is used to pass image with product while adding to cart. This functionality is implemented using cropper.js, heic2any.min.js and html2canvas.min.js. By this functionality user can upload image from product page and that image will be passed with product when adding to cart.

### Installation
- You need to add all the below mentioned files in assets folder of your theme code.
  - `cropper.js`
  - `heic2any.min.js` 
  - `html2canvas.min.js`
  - `custom.js`
  
- Include all the above files in your theme code just like below code.
    ```liquid
    {{ 'cropper.js' | asset_url | script_tag }}
    {{ 'heic2any.min.js' | asset_url | script_tag }}
    {{ 'html2canvas.min.js' | asset_url | script_tag }}
    {{ 'custom.js' | asset_url | script_tag }}
    ```
- Go to layout folder and open the `theme.liquid` file.
- Copy the HTML from the class `upload-image-warpper` element and paste it in your theme code where you want to show the image upload section and pass on add to cart. 
- You can customize the layout, style and design as per your requirement.

## Usage
- You can upload image by click on upload button.
- You can also remove image by click on remove button.
- After uploading image, click on add to cart button to pass image with product to cart.