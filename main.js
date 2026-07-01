const brgBtn = document.querySelector(".burger-btn");

brgBtn.onclick = () => {
    const brgMenu = document.querySelector(".burger");
    brgMenu.classList.toggle("active");
};