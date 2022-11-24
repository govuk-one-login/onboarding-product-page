const element = document.getElementById("heroMainImage");
let iterations = 0;
let timeout = null;

element.addEventListener("click", toggleEasterEgg);

function toggleEasterEgg() {
    if (++iterations == 5) {
        element.classList.toggle("easterEgg");
        if (element.classList.contains("easterEgg")) {
            element.setAttribute("src", "/assets/images/product-illustration_govuk_signin_bee.png");
        } else {
            element.setAttribute("src", "/assets/images/product-illustration_govuk_signin.png");
        }
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => (iterations = 0), 1500);
}
