const navAList = document.querySelectorAll("nav>a[href]");
console.log(`1. nav links = ${navAList}`);
const firstProductItem = document.querySelector(".product-list>.product-item");
console.log(`2. first product item in product-list = ${firstProductItem}`);
const cartImg = document.querySelector(".cart img");
console.log(`3. cart img = ${cartImg}`);
const productItemPriceList = document.querySelectorAll(".product-list .product-item .price");
console.log(`4. product item price  = ${productItemPriceList}`);
const productItemImgList = document.querySelectorAll(".product-list .product-item img");
console.log(`5. product item image lists = ${productItemImgList}`)
const searchBarButton = document.querySelector(".search-bar button");
console.log(`6. search bar button = ${searchBarButton}`);
const footerParagraph = document.querySelector("footer p");
console.log(`7. footer paragraph = ${footerParagraph}`);
const evenNumberedProductItems = document.querySelectorAll(".product-list .product-item:nth-child(even)");
console.log(`8. even numbered product item = ${evenNumberedProductItems}`)
const accountImage = document.querySelector(".account img");
console.log(`9. account image = ${accountImage}`);
const companyInfo = document.querySelector('nav a[href="#about"]');
console.log(`10. company info = ${companyInfo}`)

