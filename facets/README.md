# Facet Filter

## Overview
Facet filters, also known as product filters, allow customers to refine their search results by selecting specific attributes or tags. These filters can significantly enhance the browsing experience by enabling users to quickly find products that match their preferences.
This code snippet can be used to display the product filter in a vertical format on desktop screens and as a drawer filter on mobile screens.

## Installation
To show the facet filter on your collection page, you need to follow the below steps:
 
1. You need to add below mentioned files in appropriate folder in your theme.
    - `snippets/desktop-sidebar-filter.liquid`
    - `snippets/mobile-sidebar-filter.liquid`
    - `snippets/sortby-filter-desktop.liquid`
    - `assets/sidebar-filter.css`
    - `assets/sidebar-filter.js`  
  
2. After adding the files in folders, you need to include the files at where you want to show the facet filters. Include files as shown below:
   ```liquid
     {{ 'sidebar-filter.css' | asset_url | stylesheet_tag }}
     <script src="{{ 'sidebar-filter.js' | asset_url }}" defer="defer"></script>
    
     {% render 'sortby-filter-desktop', collection: collection %} 
     {% render 'desktop-sidebar-filter', results: collection %}
     {% render 'mobile-sidebar-filter', results: collection %}
   ```
3. If your theme has any of the files already, you can merge the code from this files in the existing files.  
4. You should add the id `id="product-grid"` in the product items parent element and Grandparents add the id `id="ProductGridContainer"`.
5. You can change the filter options by updating the `desktop-sidebar-filter.liquid` and `mobile-sidebar-filter.liquid` files.
6. You can change or modify the facet filter design by changing the `sidebar-filter.css` file.
7. After adding the code snippet, test the filter on your collection page. 
8. If you face any errors or issues, check if any JS or CSS are conflicting with the code snippet.

## Conclusion
Implementing facet filters in your Shopify store can significantly improve the user experience and help customers find products more efficiently. By following the steps outlined in this README, you can seamlessly integrate facet filters into your store and enhance its functionality.