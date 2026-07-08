console.log("JS работает");

    const cards = document.querySelector(".cards");

fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(data => {

        const product = data[0];

        cards.innerHTML = `
            <div class="card">
                <img src="${product.image}" alt="">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
            </div>
        `;
    });
    
