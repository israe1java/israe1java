// ==========================================
// CHAVES BURGUER - LÓGICA DO CARRINHO
// ==========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let nextItemId = parseInt(localStorage.getItem("nextItemId")) || 1;

let selectedModalidade = ""; // 'Mesa', 'Retirada' ou 'Delivery'

const cartItems = document.getElementById("cartItems");
const totalElement = document.getElementById("total");
const countElement = document.getElementById("count");
const sendButton = document.getElementById("send");
const clearCartBtn = document.getElementById("clearCartBtn");
const toast = document.getElementById("toast");

// Botões de escolha do bloco do carrinho
const showTableFormBtn = document.getElementById("showTableFormBtn");
const tableForm = document.getElementById("tableForm");
const showPickupFormBtn = document.getElementById("showPickupFormBtn");
const pickupForm = document.getElementById("pickupForm");
const showDeliveryFormBtn = document.getElementById("showDeliveryFormBtn");
const deliveryForm = document.getElementById("deliveryForm");

// Campos de Delivery & Pagamento
const payMoney = document.getElementById("payMoney");
const payCard = document.getElementById("payCard");
const payPix = document.getElementById("payPix");
const changeContainer = document.getElementById("changeContainer");
const deliveryChangeInput = document.getElementById("deliveryChangeInput");
const deliveryCepInput = document.getElementById("deliveryCepInput");

const availableExtras = [
    { name: "Bife hambúrguer frango", price: 5.50 },
    { name: "Bife hambúrguer boi", price: 5.00 },
    { name: "Bife hambúrguer picanha 120g", price: 6.00 },
    { name: "Blend", price: 6.00 },
    { name: "Calabresa", price: 3.50 },
    { name: "Catupiry", price: 5.50 },
    { name: "Cheddar", price: 5.50 },
    { name: "Cebola", price: 3.50 },
    { name: "Cebola caramelizada", price: 4.00 },
    { name: "Frango desfiado", price: 7.00 },
    { name: "Barbecue sachê", price: 3.50 },
    { name: "Molho verde sachê", price: 3.00 },
    { name: "Mussarela", price: 6.00 },
    { name: "Presunto", price: 6.00 },
    { name: "Queijo prato", price: 5.00 },
    { name: "Ovo", price: 2.50 },
    { name: "Passas", price: 1.00 },
    { name: "Azeitona", price: 1.00 },
    { name: "Milho", price: 2.00 },
    { name: "Abacaxi", price: 3.00 },
    { name: "Salsicha", price: 2.50 },
    { name: "Bacon", price: 7.00 },
    { name: "Bacon fatiado", price: 6.00 }
];

// Lógica de busca automática de CEP via ViaCEP (Gratuito e sem API do Google)
if (deliveryCepInput) {
    deliveryCepInput.addEventListener("blur", () => {
        let cep = deliveryCepInput.value.replace(/\D/g, '');

        if (cep.length !== 8) return;

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById("deliveryStreetInput").value = data.logradouro || "";
                    document.getElementById("deliveryNeighborhoodInput").value = data.bairro || "";
                    document.getElementById("deliveryCityInput").value = data.localidade || "";
                    document.getElementById("deliveryNumberInput").focus();
                } else {
                    alert("CEP não encontrado.");
                }
            })
            .catch(() => {
                console.error("Erro ao buscar o CEP.");
            });
    });
}

function hideAllForms() {
    if (tableForm) tableForm.classList.add("hide");
    if (pickupForm) pickupForm.classList.add("hide");
    if (deliveryForm) deliveryForm.classList.add("hide");
}

if (showTableFormBtn) {
    showTableFormBtn.addEventListener("click", () => {
        hideAllForms();
        tableForm.classList.remove("hide");
        selectedModalidade = "Mesa";
    });
}

if (showPickupFormBtn) {
    showPickupFormBtn.addEventListener("click", () => {
        hideAllForms();
        pickupForm.classList.remove("hide");
        selectedModalidade = "Retirada";
    });
}

if (showDeliveryFormBtn) {
    showDeliveryFormBtn.addEventListener("click", () => {
        hideAllForms();
        deliveryForm.classList.remove("hide");
        selectedModalidade = "Delivery";
    });
}

// Controle de exibição do troco no dinheiro
if (payMoney && payCard && payPix && changeContainer) {
    [payMoney, payCard, payPix].forEach(radio => {
        radio.addEventListener("change", () => {
            if (payMoney.checked) {
                changeContainer.classList.remove("hide");
            } else {
                changeContainer.classList.add("hide");
                deliveryChangeInput.value = "";
            }
        });
    });
}

function saveCartState() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("nextItemId", nextItemId.toString());
}

function formatMoney(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderCart() {
    if (!cartItems) return;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty">
                Seu carrinho está vazio.<br>
                Volte ao cardápio para adicionar lanches.
            </div>
        `;
        if (totalElement) totalElement.textContent = formatMoney(0);
        if (countElement) countElement.textContent = "0 itens";
        return;
    }

    cart.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";

        const header = document.createElement("div");
        header.className = "cart-item-header";

        const name = document.createElement("h3");
        const sameProductsCount = cart.filter(p => p.productId === item.productId).length;
        if (sameProductsCount > 1) {
            const itemOrder = cart.filter((p, i) => p.productId === item.productId && i <= index).length;
            name.textContent = `${item.name} (#${itemOrder})`;
        } else {
            name.textContent = item.name;
        }

        const extrasTotal = item.selectedExtrasPerSubItem.flat().reduce((sum, extra) => sum + extra.price, 0);
        const itemSubtotal = (item.price + extrasTotal) * item.quantity;

        const price = document.createElement("span");
        price.className = "item-price";
        price.textContent = formatMoney(itemSubtotal);

        header.append(name, price);

        const description = document.createElement("p");
        description.className = "item-description";
        description.textContent = item.desc;

        const controls = document.createElement("div");
        controls.className = "item-controls";

        const minus = document.createElement("button");
        minus.className = "quantity-button";
        minus.type = "button";
        minus.textContent = "−";
        minus.addEventListener("click", () => {
            cart.splice(index, 1);
            saveCartState();
            renderCart();
        });

        const quantity = document.createElement("span");
        quantity.className = "quantity";
        quantity.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.className = "quantity-button";
        plus.type = "button";
        plus.textContent = "+";
        plus.addEventListener("click", () => {
            cart.push({ ...item, itemId: nextItemId++ });
            saveCartState();
            renderCart();
        });

        const remove = document.createElement("button");
        remove.className = "remove-button";
        remove.type = "button";
        remove.textContent = "Remover";
        remove.addEventListener("click", () => {
            cart = cart.filter(i => i.itemId !== item.itemId);
            saveCartState();
            renderCart();
        });

        controls.append(minus, quantity, plus, remove);
        itemElement.append(header, description, controls);

        if (item.itemsCount > 0 && item.cat !== "Bebidas") {
            for (let subIdx = 0; subIdx < item.itemsCount; subIdx++) {
                const subitemBlock = document.createElement("div");
                subitemBlock.className = "subitem-block";

                if (item.itemsCount > 1) {
                    const subTitle = document.createElement("div");
                    subTitle.className = "subitem-title";
                    subTitle.textContent = `🍔 Lanche ${subIdx + 1}`;
                    subitemBlock.appendChild(subTitle);
                }

                const observation = document.createElement("textarea");
                observation.className = "observation";
                observation.rows = 2;
                observation.placeholder = item.itemsCount > 1 ? `Obs Lanche ${subIdx + 1}...` : "Observações: sem cebola...";
                observation.value = item.observationsPerSubItem[subIdx] || "";
                observation.addEventListener("input", (e) => {
                    item.observationsPerSubItem[subIdx] = e.target.value;
                    saveCartState();
                });
                subitemBlock.appendChild(observation);

                const extrasContainer = document.createElement("div");
                extrasContainer.className = "extras-container";
                const extrasTitle = document.createElement("strong");
                extrasTitle.className = "extras-title";
                extrasTitle.textContent = "🚀 GOSTARIA DE TURBINAR O SEU LANCHE ?";
                extrasContainer.appendChild(extrasTitle);

                const extrasList = document.createElement("div");
                extrasList.className = "extras-list";

                availableExtras.forEach(extra => {
                    const label = document.createElement("label");
                    label.className = "extra-option";
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = item.selectedExtrasPerSubItem[subIdx].some(e => e.name === extra.name);
                    checkbox.addEventListener("change", (e) => {
                        if (e.target.checked) {
                            item.selectedExtrasPerSubItem[subIdx].push(extra);
                        } else {
                            item.selectedExtrasPerSubItem[subIdx] = item.selectedExtrasPerSubItem[subIdx].filter(e => e.name !== extra.name);
                        }
                        saveCartState();
                        renderCart();
                    });
                    label.append(checkbox, ` ${extra.name} (+${formatMoney(extra.price)})`);
                    extrasList.appendChild(label);
                });

                extrasContainer.appendChild(extrasList);
                subitemBlock.appendChild(extrasContainer);
                itemElement.appendChild(subitemBlock);
            }
        }

        cartItems.appendChild(itemElement);
    });

    const total = cart.reduce((sum, item) => {
        const extrasTotal = item.selectedExtrasPerSubItem.flat().reduce((eSum, extra) => eSum + extra.price, 0);
        return sum + (item.price + extrasTotal) * item.quantity;
    }, 0);

    const qty = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalElement) totalElement.textContent = formatMoney(total);
    if (countElement) countElement.textContent = qty + (qty === 1 ? " item" : " itens");
}

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        if (cart.length === 0) { alert("O carrinho já está vazio!"); return; }
        if (confirm("Tem certeza de que deseja limpar o carrinho?")) {
            cart = [];
            saveCartState();
            renderCart();
        }
    });
}

if (sendButton) {
    sendButton.addEventListener("click", () => {
        if (cart.length === 0) { alert("Adicione itens ao carrinho."); return; }
        if (!selectedModalidade) { alert("Por favor, selecione como deseja receber o pedido (Mesa, Retirada ou Delivery)."); return; }

        let locationDetails = {};
        let receipt = "";
        let locationTextFormatted = "";

        if (selectedModalidade === "Mesa") {
            const name = document.getElementById("tableNameInput").value.trim();
            const tableNumber = document.getElementById("tableNumberInput").value.trim();
            if (!name || !tableNumber) { alert("Preencha o Nome e o Número da Mesa."); return; }
            
            locationDetails = { name, tableNumber };
            receipt += `CLIENTE: ${name}\n`;
            receipt += `MESA: ${tableNumber}\n`;
            locationTextFormatted = `🪑 LOJA - MESA ${tableNumber} (${name})`;

        } else if (selectedModalidade === "Retirada") {
            const name = document.getElementById("pickupNameInput").value.trim();
            const phone = document.getElementById("pickupPhoneInput").value.trim();
            if (!name || !phone) { alert("Preencha o Nome e o Telefone para Retirada."); return; }

            locationDetails = { name, phone };
            receipt += `RETIRADA POR: ${name}\n`;
            receipt += `TELEFONE: ${phone}\n`;
            locationTextFormatted = `🛍️ RETIRADA (${name})`;

        } else if (selectedModalidade === "Delivery") {
            const name = document.getElementById("deliveryNameInput").value.trim();
            const phone = document.getElementById("deliveryPhoneInput").value.trim();
            const cep = document.getElementById("deliveryCepInput").value.trim();
            const street = document.getElementById("deliveryStreetInput").value.trim();
            const number = document.getElementById("deliveryNumberInput").value.trim();
            const neighborhood = document.getElementById("deliveryNeighborhoodInput").value.trim();
            const city = document.getElementById("deliveryCityInput").value.trim();
            const reference = document.getElementById("deliveryRefInput").value.trim();

            let selectedPayment = "";
            if (payMoney && payMoney.checked) selectedPayment = "Dinheiro em Espécie";
            else if (payCard && payCard.checked) selectedPayment = "Cartão (Maquininha com Motoboy)";
            else if (payPix && payPix.checked) selectedPayment = "Pix (Maquininha / Acertar com Motoboy)";

            // CEP não entra na checagem de obrigatoriedade (!)
            if (!name || !phone || !street || !number || !neighborhood || !city || !reference) {
                alert("Preencha todos os campos obrigatórios do endereço e contato.");
                return;
            }
            if (!selectedPayment) {
                alert("Por favor, selecione a forma de pagamento.");
                return;
            }

            let changeInfo = deliveryChangeInput ? deliveryChangeInput.value.trim() : "";
            if (selectedPayment === "Dinheiro em Espécie" && !changeInfo) {
                changeInfo = "Não informado / Sem troco";
            }

            locationDetails = {
                name,
                phone,
                cep: cep || "Não informado",
                street,
                number,
                neighborhood,
                city,
                reference,
                paymentMethod: selectedPayment,
                change: changeInfo
            };

            receipt += `CLIENTE: ${name}\n`;
            receipt += `TELEFONE: ${phone}\n`;
            if (cep) receipt += `CEP: ${cep}\n`;
            receipt += `RUA: ${street}, Nº ${number}\n`;
            receipt += `BAIRRO: ${neighborhood}\n`;
            receipt += `CIDADE: ${city}\n`;
            receipt += `OBS/REF: ${reference}\n`;
            locationTextFormatted = `🛵 DELIVERY (${name})`;
        }

        receipt += "============================\n";

        cart.forEach(item => {
            receipt += `${item.quantity}x ${item.name}\n`;
            item.selectedExtrasPerSubItem.forEach((extras, subIdx) => {
                const hasObs = item.observationsPerSubItem && item.observationsPerSubItem[subIdx].trim() !== "";
                const hasExtras = extras.length > 0;
                if (hasObs || hasExtras) {
                    receipt += `  ↳ Obs: ${hasObs ? item.observationsPerSubItem[subIdx].trim() : ''}`;
                    if (hasExtras) receipt += ` [+ ${extras.map(e => e.name).join(", ")}]`;
                    receipt += `\n`;
                }
            });
        });

        const total = cart.reduce((sum, item) => {
            const extrasTotal = item.selectedExtrasPerSubItem.flat().reduce((eSum, extra) => eSum + extra.price, 0);
            return sum + (item.price + extrasTotal) * item.quantity;
        }, 0);

        const newOrderForAdm = {
            id: Math.floor(1000 + Math.random() * 9000),
            clientName: locationDetails.name || "Cliente",
            modalidade: selectedModalidade,
            locationText: locationTextFormatted,
            details: locationDetails,
            receiptText: receipt,
            total: total,
            status: "pendente",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        let admOrders = JSON.parse(localStorage.getItem("admOrders")) || [];
        admOrders.unshift(newOrderForAdm);
        localStorage.setItem("admOrders", JSON.stringify(admOrders));

        let fullReceiptDisplay = "CHAVES BURGUER\nCOMANDA DO PEDIDO\n" + receipt + `\nTOTAL: ${formatMoney(total)}`;

        if (toast) {
            toast.innerHTML = `
                <h3>✓ Pedido enviado com sucesso!</h3>
                <p>Encaminhado para a cozinha:</p>
                <pre>${fullReceiptDisplay}</pre>
            `;
            toast.classList.add("show");
            toast.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        cart = [];
        saveCartState();
        setTimeout(() => { renderCart(); }, 1500);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});