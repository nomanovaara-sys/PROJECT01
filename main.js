const burgerBtn = document.querySelector(".burger-btn");
const burger = document.querySelector(".burger");

burgerBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    burgerBtn.classList.toggle("active");
    burger.classList.toggle("active");
});


document.addEventListener("click", () => {
    burgerBtn.classList.remove("active");
    burger.classList.remove("active");
});


burger.addEventListener("click", (event) => {
    event.stopPropagation();
});