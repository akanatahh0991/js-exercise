const unique = new Set("unique");
console.log(unique); // Set(5) { 'u', 'n', 'i', 'q', 'e' }

unique.forEach((v, i) => {
    console.log(v, i);
})