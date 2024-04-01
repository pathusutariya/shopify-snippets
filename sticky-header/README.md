# Sticky Header

## Overview
This is a simple code snippet for creating a sticky header on a webpage. A sticky header remains fixed at the top of the viewport as the user scrolls down the page, providing easy access to navigation links or other important information.

## Installation
- To make your site header sticky you just need to follow the below steps.
- You need to make some change in the below mentioned files in your theme code.
    - `header.liquid`
- First of all open `header.liquid` file and add the schema settings that is added in the `sticky-header.liquid` file in current directory.
- Copy the mentioned varible at top of file and paste it in your `header.liquid` file.
- Add class `header--{{ header__class }}` in header tag of your theme's header.
- Copy the CSS and JS code from the `sticky-header.liquid` file and paste it in related files in your theme code.
- Save your files after adding all the changes and check the output in your site.
- If your header can't be sticky then you have to check if any other CSS or JS is conflicting with this code.
  
## Usage

Once installed, the sticky header will automatically stick to the top of the viewport as the user scrolls down the page. You can include your navigation links, logo, or any other content within the header.