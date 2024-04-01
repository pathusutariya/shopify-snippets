function setRecentlyViewedProducts() {
    const productData = window.Shopify.productData;
    const productList = [productData];
    const currProductPageTitle = productData.productTitle;
    const productDataString = JSON.stringify(productList);
    const localData = localStorage.getItem("recentlyViewedProduct");
    const numberOfProducts = 4;

    if (!localData) {
        localStorage.setItem("recentlyViewedProduct", productDataString);
    } else {
        const oldProductData = JSON.parse(localData);
        const countProductData = (oldProductData.match(/productTitle/g) || []).length;
        const sameProduct = oldProductData.includes(currProductPageTitle);
        let jsonRespArr;

        if (countProductData < numberOfProducts && !sameProduct) {
            jsonRespArr = [...oldProductData, ...productList];
        } else if (countProductData >= numberOfProducts && !sameProduct) {
            oldProductData.shift();
            jsonRespArr = [...oldProductData, ...productList];
        }

        if (jsonRespArr) {
            localStorage.setItem("recentlyViewedProduct", JSON.stringify(jsonRespArr));
        }
    }
}
setRecentlyViewedProducts();

function getRecentlyViewedProducts() {
    const productData = JSON.parse(localStorage.getItem("recentlyViewedProduct"));
    const recentlyViewedHtml = [];

    productData.forEach(item => {
        if (item.productTitle) {
            recentlyViewedHtml.unshift(`
    <li class="grid__item">
     <div class="card-wrapper">
        <div class="cart__inner_image">
          <div>
            <img class="motion-reduce" src="${item.productImg}" width="${item.imgWidth}" height="${item.imgHeight}"  loading="lazy" alt="${item.productImageAltText}"/>
          </div>
         </div>
         <div class="card__content">
           <div class="card__information">
             <h3 class="card__heading h5">
             <a class="full-unstyled-link" href="${item.productUrl}">${item.productTitle}</a></h3>
               <div class="card-information">
                 <div class="price ">
                   <div class="price__container">
                     <div class="price-item price-item--regular">
                         ${item.productPrice}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
    </li>
   `);
        }
    });

    const newProductData = `${recentlyViewedHtml.join("")}`;
    const recentlyViewedElements = document.querySelectorAll('.recently-viewed');

    recentlyViewedElements.forEach(wishlistItem => {
        wishlistItem.innerHTML = newProductData;
    });
}
document.addEventListener("DOMContentLoaded", getRecentlyViewedProducts);