// 1. CHAMAR GARÇOM
const callWaiterBtn = document.getElementById("callWaiterBtn");

if (callWaiterBtn) {
    callWaiterBtn.addEventListener("click", () => {
        alert("🔔 O garçom foi chamado e já está a caminho da sua mesa!");
    });
}

// 2. CADASTRO DE CLIENTE
const customerForm = document.getElementById("customerForm");
const formToast = document.getElementById("formToast");

if (customerForm) {
    customerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Captura dos dados
        const customerData = {
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            documentNumber: document.getElementById("documentNumber").value.trim(),
            birthDate: document.getElementById("birthDate").value,
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: {
                street: document.getElementById("street").value.trim(),
                number: document.getElementById("number").value.trim(),
                neighborhood: document.getElementById("neighborhood").value.trim(),
                city: document.getElementById("city").value.trim(),
                complement: document.getElementById("complement").value.trim()
            }
        };

        // Validação dos campos obrigatórios
        if (!customerData.firstName || !customerData.lastName || !customerData.documentNumber || !customerData.birthDate) {
            alert("Por favor, preencha todos os campos obrigatórios (*).");
            return;
        }

        // SALVA O NOME NO NAVEGADOR PARA USAR NA COMANDA DO CARDÁPIO
        const fullName = `${customerData.firstName} ${customerData.lastName}`;
        localStorage.setItem("customerName", fullName);

        // Exibição do resultado simulado
        formToast.innerHTML = `
            <h3>✓ Cadastro realizado com sucesso!</h3>
            <p>Olá <b>${fullName}</b>, seu cadastro foi registrado.</p>
            <p>Agora você já pode acessar o cardápio para fazer o seu pedido.</p>
            <a href="cardapio_index.html" class="go-to-menu-btn">🍔 Acessar Cardápio Agora</a>
        `;

        formToast.classList.add("show");
        formToast.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
}