const euros = Intl.NumberFormat("es", {style: "currency", currency: "EUR"});
console.log(euros.format(10));
const pounds = Intl.NumberFormat("en", {style: "currency", currency: "GBP"});
console.log(pounds.format(1000));