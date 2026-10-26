// ==========================================
// CHAVES BURGUER - CARDÁPIO DE PRODUTOS
// ==========================================

const products = [
    { id: 101, cat: "Combos", name: "Combo Dogão Chaves + Coca lata", desc: "1 Dogão Chaves + 1 Coca-Cola lata", price: 20.00, itemsCount: 1 },
    { id: 102, cat: "Combos", name: "Combo 4 X-Egg Bacon + Kuat 2 L", desc: "4 X-Egg Bacon + 1 Kuat de 2 litros", price: 75.00, itemsCount: 4 },
    { id: 103, cat: "Combos", name: "Combo 2 X-Egg Bacon + Mate Couro", desc: "2 X-Egg Bacon + Mate Couro 1 L + 2 fritas pequenas", price: 49.99, itemsCount: 2 },
    { id: 104, cat: "Combos", name: "Combo 2 X-Tudo + Mate Couro", desc: "2 X-Tudo + Mate Couro 1 litro", price: 45.00, itemsCount: 2 },
    { id: 105, cat: "Combos", name: "Combo X-Egg Bacon + Coca + Fritas", desc: "1 X-Egg Bacon + Coca lata + batata frita pequena", price: 26.99, itemsCount: 1 },
    { id: 106, cat: "Combos", name: "Combo Chicken Burguer", desc: "1 Chicken Burguer + Coca lata + batata frita", price: 38.00, itemsCount: 1 },
    { id: 107, cat: "Combos", name: "Combo Cheese Bacon", desc: "1 Cheese Bacon + Coca lata + batata frita", price: 30.00, itemsCount: 1 },

    { id: 1, cat: "Tradicionais", name: "Hambúrguer Simples", desc: "Pão, bife de hambúrguer, batata palha e salada", price: 10.00, itemsCount: 1 },
    { id: 2, cat: "Tradicionais", name: "Hambúrguer Especial", desc: "Pão, bife de hambúrguer, ovo, batata palha, milho e salada", price: 12.00, itemsCount: 1 },
    { id: 3, cat: "Tradicionais", name: "X-Egg Burguer", desc: "Pão, bife de hambúrguer, ovo, presunto, mussarela, batata palha e salada", price: 13.50, itemsCount: 1 },
    { id: 4, cat: "Tradicionais", name: "X-Burguer", desc: "Pão, bife de hambúrguer, mussarela, batata palha, milho e salada", price: 12.00, itemsCount: 1 },
    { id: 5, cat: "Tradicionais", name: "X-Egg Bacon", desc: "Pão, bife de hambúrguer, ovo, bacon, mussarela, batata palha, milho e salada", price: 17.00, itemsCount: 1 },
    { id: 6, cat: "Tradicionais", name: "X-Bacon", desc: "Pão, bife de hambúrguer, bacon, mussarela, batata palha, milho e salada", price: 15.00, itemsCount: 1 },
    { id: 7, cat: "Tradicionais", name: "Franburguer", desc: "Pão, bife de hambúrguer de frango, ovo, bacon, mussarela, batata palha, milho e salada", price: 17.00, itemsCount: 1 },
    { id: 8, cat: "Tradicionais", name: "X-Egg Frango", desc: "Pão, bife de frango, ovo, frango desfiado, catupiry, batata palha, milho e salada", price: 18.00, itemsCount: 1 },
    { id: 9, cat: "Tradicionais", name: "X-Tudo", desc: "Pão, bife de hambúrguer, ovo, bacon, presunto, mussarela, abacaxi, batata palha, milho e salada", price: 20.00, itemsCount: 1 },
    { id: 10, cat: "Tradicionais", name: "X-Tudo Especial", desc: "Pão, bife de hambúrguer, ovo, bacon, frango desfiado, catupiry, abacaxi, batata palha, presunto, mussarela, milho e salada", price: 22.00, itemsCount: 1 },
    { id: 11, cat: "Tradicionais", name: "X-Egg Picanha", desc: "Pão, bife de picanha 120 g, ovo, bacon, presunto, mussarela, batata palha, milho e salada", price: 20.50, itemsCount: 1 },
    { id: 12, cat: "Tradicionais", name: "Chaves Burguer", desc: "Pão, bife bovino, bife de frango, ovo, bacon, frango desfiado, catupiry, calabresa, abacaxi, presunto, mussarela, batata palha, milho, salada, passas e azeitona", price: 26.00, itemsCount: 1 },

    { id: 13, cat: "Artesanais", name: "Cheese Burguer", desc: "Pão brioche, blend 120 g, queijo prato, alface, tomate e molho especial", price: 20.00, itemsCount: 1 },
    { id: 14, cat: "Artesanais", name: "Cheese Bacon", desc: "Pão brioche, blend 120 g, bacon, ovo, mussarela, alface, tomate e molho especial", price: 24.00, itemsCount: 1 },
    { id: 15, cat: "Artesanais", name: "Classic Burguer", desc: "Pão brioche, blend 120 g, cheddar, bacon, cebola caramelizada, alface, tomate e molho especial", price: 28.00, itemsCount: 1 },
    { id: 16, cat: "Artesanais", name: "Chicken Burguer", desc: "Pão brioche, frango empanado 120 g, mussarela, cream cheese, alface, tomate e molho especial", price: 32.00, itemsCount: 1 },
    { id: 17, cat: "Artesanais", name: "Cheese Bacon Duplo", desc: "Pão brioche, 2 blends de 120 g, 4 fatias de bacon, mussarela, alface, tomate e molho especial", price: 34.00, itemsCount: 1 },

    { id: 18, cat: "Mistos", name: "Misto Quente", desc: "Pão, 2 presuntos e 2 mussarelas", price: 10.50, itemsCount: 1 },
    { id: 19, cat: "Mistos", name: "Mistão", desc: "Pão, 2 presuntos, 2 mussarelas e frango desfiado", price: 13.00, itemsCount: 1 },

    { id: 20, cat: "Hot Dogs", name: "Hot Dog Simples", desc: "Pão, salsicha e batata palha", price: 9.00, itemsCount: 1 },
    { id: 21, cat: "Hot Dogs", name: "Hot Dog Especial", desc: "Pão, salsicha, mussarela, batata palha e milho", price: 10.00, itemsCount: 1 },
    { id: 22, cat: "Hot Dogs", name: "Dogão Chaves", desc: "Pão, 2 salsichas, presunto, frango desfiado, catupiry, batata palha e milho", price: 15.00, itemsCount: 1 },

    { id: 31, cat: "Fritas", name: "Batata frita c/ queijo 300g (Pequena)", desc: "Batata frita crocante coberta com queijo derretido (300g)", price: 18.00, itemsCount: 1 },
    { id: 32, cat: "Fritas", name: "Batata frita c/ queijo 600g (Grande)", desc: "Porção generosa de batata frita com queijo derretido (600g)", price: 23.00, itemsCount: 1 },

    { id: 23, cat: "Bebidas", name: "Coca-Cola 2 Litros", desc: "Refrigerante Coca-Cola 2 L", price: 14.00, itemsCount: 0 },
    { id: 24, cat: "Bebidas", name: "Fanta Laranja 2 Litros", desc: "Refrigerante Fanta Laranja 2 L", price: 13.00, itemsCount: 0 },
    { id: 25, cat: "Bebidas", name: "Mate Couro 1 Litro", desc: "Refrigerante Mate Couro 1 L", price: 9.00, itemsCount: 0 },
    { id: 26, cat: "Bebidas", name: "Coca-Cola 1 Litro", desc: "Refrigerante Coca-Cola 1 L", price: 10.00, itemsCount: 0 },
    { id: 27, cat: "Bebidas", name: "Coca-Cola Lata 350ml", desc: "Refrigerante Coca-Cola em lata", price: 7.00, itemsCount: 0 },
    { id: 28, cat: "Bebidas", name: "Coca-Cola 600 ml", desc: "Refrigerante Coca-Cola 600 ml", price: 8.50, itemsCount: 0 },
    { id: 29, cat: "Bebidas", name: "Brahma Lata 375ml", desc: "Cerveja Brahma em lata", price: 6.00, itemsCount: 0 },
    { id: 30, cat: "Bebidas", name: "Heineken Long Neck", desc: "Cerveja Heineken long neck", price: 10.00, itemsCount: 0 }
];

function formatMoney(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function updateCartBadge() {
    const cartCountBadge = document.getElementById("cartCountBadge");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) cartCountBadge.textContent = totalQty;
}

function renderMenu() {
    const menuContainer = document.getElementById("menu");
    if (!menuContainer) return;
    
    menuContainer.innerHTML = "";

    const categories = [...new Set(products.map(p => p.cat))];
    categories.sort((a, b) => (a === "Combos" ? -1 : b === "Combos" ? 1 : 0));

    categories.forEach(category => {
        const section = document.createElement("div");
        section.className = "category";

        const title = document.createElement("h3");
        title.className = "category-title";
        title.textContent = category;

        const list = document.createElement("div");
        list.className = "product-list";

        products.filter(p => p.cat === category).forEach(product => {
            const card = document.createElement("article");
            card.className = "product";

            const info = document.createElement("div");
            info.className = "product-info";
            info.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <span class="product-price">${formatMoney(product.price)}</span>
            `;

            const addButton = document.createElement("button");
            addButton.className = "add-button";
            addButton.textContent = "+";
            addButton.type = "button";
            addButton.title = "Adicionar " + product.name;

            addButton.addEventListener("click", () => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let nextItemId = parseInt(localStorage.getItem("nextItemId")) || 1;
                const count = product.itemsCount !== undefined ? product.itemsCount : 1;

                cart.push({
                    itemId: nextItemId++,
                    productId: product.id,
                    cat: product.cat,
                    name: product.name,
                    desc: product.desc,
                    price: product.price,
                    quantity: 1,
                    itemsCount: count,
                    selectedExtrasPerSubItem: Array.from({ length: count }, () => []),
                    observationsPerSubItem: Array.from({ length: count }, () => "")
                });

                localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("nextItemId", nextItemId.toString());
                updateCartBadge();

                alert(`✓ ${product.name} adicionado ao carrinho!`);
            });

            card.append(info, addButton);
            list.appendChild(card);
        });

        section.append(title, list);
        menuContainer.append(section);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderMenu();
    updateCartBadge();

    // Chamar Garçom
    const callWaiterBtn = document.getElementById("callWaiterBtn");
    if (callWaiterBtn) {
        callWaiterBtn.addEventListener("click", () => {
            let tableNum = prompt("Digite o número da sua mesa:");
            if (!tableNum) return;

            let waiterCalls = JSON.parse(localStorage.getItem("waiterCalls")) || [];
            waiterCalls.push({
                tableNumber: tableNum,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            localStorage.setItem("waiterCalls", JSON.stringify(waiterCalls));
            alert(`🔔 O garçom foi chamado para a Mesa ${tableNum}!`);
        });
    }
});