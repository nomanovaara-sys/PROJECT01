console.log("main.js работает");


async function initStore() {
    try {
        // Делаем ОДИН запрос к файлу
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();
        
        if (!products || products.length === 0) return;

    
        // 1. РЕНДЕРИМ ГЛАВНЫЙ ТОВАР (Берем самый первый товар из базы — Dracula)
        const mainProduct = products[0]; 
        const container = document.getElementById('product-container');
        
        // Превращаем массив строк треклиста в HTML с тегами <br>
        const tracklistHtml = mainProduct.tracklist ? mainProduct.tracklist.join('<br>') : '';

        container.innerHTML = `
            <div class="hero">
                <img class="draculaimg" src="${mainProduct.image}" alt="${mainProduct.title}">
                <div class="hero-info">
                    <h1>${mainProduct.title}</h1>
                    <h2>${mainProduct.subtitle || 'Limited Edition CD Single'}</h2>
                    <h3>${mainProduct.price}</h3>

                    <button class="hero-btn">ADD TO CART</button>

                    <p>${mainProduct.description}</p>

                    <h3>Tracklist:</h3>
                    <p>${tracklistHtml}</p>
                </div>
            </div>
        `;
        // 2. РЕНДЕРИМ ОСТАЛЬНЫЕ КАРТОЧКИ В СЕКЦИЮ "SHOP ALL"
       
        const cardsGrid = document.querySelector(".cards");
        if (!cardsGrid) return;
        
        cardsGrid.innerHTML = ''; // Очищаем нижнюю сетку перед заполнением

        // Метод .slice(1) берет ВСЕ товары, КРОМЕ самого первого (Dracula),
        // чтобы он не дублировался внизу страницы
        const shopAllProducts = products.slice(1);

        shopAllProducts.forEach(product => {
            cardsGrid.innerHTML += `
        <div class="card-item">
            <div class="card-img-wrap">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <h4>${product.title}</h4>
            <span>${product.price}</span>
            <button class="card-btn" data-id="${product.id}">ADD TO CART</button>
        </div>
    `;
            // Создаем правильную структуру с нужными CSS классами
            
        });

    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

// Запускаем всю логику строго после загрузки HTML дерева
document.addEventListener('DOMContentLoaded', initStore);

window.onload = function() {
    const headerNav = document.querySelector('.header-nav');
    const headerIcons = document.querySelector('.header-icons');
    const navMenu = document.querySelector('.nav');
    const body = document.body;

    // Проверяем, существуют ли вообще шапка и меню на странице
    if (headerNav && navMenu) {
        
        // 1. Создаем кнопку бургера на лету
        const burgerBtn = document.createElement('button');
        burgerBtn.className = 'burger-menu';
        burgerBtn.setAttribute('aria-label', 'Открыть меню');

        // Создаем 3 полоски внутри кнопки
        for (let i = 0; i < 3; i++) {
            burgerBtn.appendChild(document.createElement('span'));
        }

        // 2. Вставляем бургер ПО ЦЕНТРУ (после логотипа, перед иконками)
        headerNav.insertBefore(burgerBtn, headerIcons);

        // 3. Логика клика (анимация крестика + выдвижение меню)
        burgerBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем баги с кликами по шапке
            burgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // 4. Закрытие меню при клике на любую ссылку внутри него
        const menuLinks = navMenu.querySelectorAll('.nav-right');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
};









