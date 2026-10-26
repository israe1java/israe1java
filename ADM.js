// ==========================================
// CHAVES BURGUER - PAINEL ADM (KANBAN)
// ==========================================

const listPendente = document.getElementById("listPendente");
const listPreparo = document.getElementById("listPreparo");
const listPronto = document.getElementById("listPronto");
const listCancelado = document.getElementById("listCancelado");

const countPendente = document.getElementById("countPendente");
const countPreparo = document.getElementById("countPreparo");
const countPronto = document.getElementById("countPronto");

const waiterCallsList = document.getElementById("waiterCallsList");
const waiterCallsCount = document.getElementById("waiterCallsCount");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

function formatMoney(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Função para imprimir a comanda do pedido com destaque de Pagamento
function printOrderReceipt(order) {
    let detalhesExtra = "";
    let pagamentoHtml = "";

    if (order.modalidade === "Delivery") {
        detalhesExtra = `📍 Rua: ${order.details.street}, Nº ${order.details.number}\n🌆 ${order.details.neighborhood} - ${order.details.city}\n📞 Tel: ${order.details.phone}\n💡 Ref: ${order.details.reference}`;
        
        let infoTroco = order.details.change ? ` (${order.details.change})` : "";
        pagamentoHtml = `
            <div style="border: 2px solid #000; padding: 6px; margin: 8px 0; font-weight: bold; font-size: 13px; text-align: center;">
                💳 PAGAMENTO: ${(order.details.paymentMethod || 'NÃO INFORMADO').toUpperCase()}${infoTroco ? '<br>' + infoTroco : ''}
            </div>
        `;
    } else if (order.modalidade === "Retirada") {
        detalhesExtra = `🛍️ Retirada por: ${order.details.name}\n📞 Tel: ${order.details.phone}`;
        if (order.details.paymentMethod) {
            pagamentoHtml = `
                <div style="border: 1px dashed #000; padding: 4px; margin: 6px 0; font-weight: bold;">
                    💳 PAGAMENTO: ${order.details.paymentMethod.toUpperCase()}
                </div>
            `;
        }
    } else if (order.modalidade === "Mesa") {
        detalhesExtra = `🪑 Mesa nº: ${order.details.tableNumber}`;
    }

    const printWindow = window.open("", "_blank", "width=400,height=600");
    if (!printWindow) {
        alert("Por favor, permita pop-ups para imprimir a comanda.");
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Comanda - Pedido #${order.id}</title>
            <style>
                body {
                    font-family: monospace, monospace;
                    font-size: 12px;
                    color: #000;
                    margin: 0;
                    padding: 10px;
                    width: 280px;
                }
                .header {
                    text-align: center;
                    border-bottom: 1px dashed #000;
                    padding-bottom: 8px;
                    margin-bottom: 8px;
                }
                .header h2 {
                    margin: 0;
                    font-size: 16px;
                }
                .info-block {
                    border-bottom: 1px dashed #000;
                    padding-bottom: 8px;
                    margin-bottom: 8px;
                }
                .items {
                    white-space: pre-wrap;
                    font-size: 11px;
                    border-bottom: 1px dashed #000;
                    padding-bottom: 8px;
                    margin-bottom: 8px;
                }
                .total {
                    font-size: 14px;
                    font-weight: bold;
                    text-align: right;
                }
                .footer {
                    text-align: center;
                    margin-top: 10px;
                    font-size: 10px;
                }
                @media print {
                    @page { margin: 0; }
                    body { margin: 0.5cm; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>CHAVES BURGUER</h2>
                <p>--- COMANDA DE PRODUÇÃO ---</p>
                <strong>PEDIDO #${order.id}</strong><br>
                <small>Horário: ${order.time || 'N/I'}</small>
            </div>

            <div class="info-block">
                <strong>Cliente:</strong> ${order.clientName || 'Cliente'}<br>
                <strong>Modalidade:</strong> ${order.locationText || order.modalidade.toUpperCase()}<br>
                ${detalhesExtra.replace(/\n/g, '<br>')}
            </div>

            ${pagamentoHtml}

            <div class="items">
<strong>ITENS DO PEDIDO:</strong>
${order.receiptText}
            </div>

            <div class="total">
                TOTAL: ${formatMoney(order.total)}
            </div>

            <div class="footer">
                ================================<br>
                Chaves Burguer • Bom Apetite!
            </div>

            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 500);
                };
            <\/script>
        </body>
        </html>
    `);

    printWindow.document.close();
}

// Renderiza a lista de pedidos distribuídos em 3 colunas + cancelados
function loadAdmOrders() {
    let orders = JSON.parse(localStorage.getItem("admOrders")) || [];

    // Limpa os containers
    if (listPendente) listPendente.innerHTML = "";
    if (listPreparo) listPreparo.innerHTML = "";
    if (listPronto) listPronto.innerHTML = "";
    if (listCancelado) listCancelado.innerHTML = "";

    // Filtra por status
    const pendentes = orders.filter(o => !o.status || o.status === "pendente");
    const emPreparo = orders.filter(o => o.status === "preparo");
    const prontos = orders.filter(o => o.status === "pronto");
    const cancelados = orders.filter(o => o.status === "cancelado");

    // Atualiza contadores
    if (countPendente) countPendente.textContent = pendentes.length;
    if (countPreparo) countPreparo.textContent = emPreparo.length;
    if (countPronto) countPronto.textContent = prontos.length;

    // Renderizar Pendentes
    if (pendentes.length === 0) {
        listPendente.innerHTML = `<div class="empty-adm">Nenhum pedido pendente.</div>`;
    } else {
        pendentes.forEach(order => listPendente.appendChild(createOrderCard(order)));
    }

    // Renderizar Em Preparo
    if (emPreparo.length === 0) {
        listPreparo.innerHTML = `<div class="empty-adm">Nenhum pedido em preparo.</div>`;
    } else {
        emPreparo.forEach(order => listPreparo.appendChild(createOrderCard(order)));
    }

    // Renderizar Prontos
    if (prontos.length === 0) {
        listPronto.innerHTML = `<div class="empty-adm">Nenhum pedido pronto.</div>`;
    } else {
        prontos.forEach(order => listPronto.appendChild(createOrderCard(order)));
    }

    // Renderizar Cancelados
    if (cancelados.length === 0) {
        listCancelado.innerHTML = `<div class="empty-adm">Nenhum pedido cancelado no histórico.</div>`;
    } else {
        cancelados.forEach(order => listCancelado.appendChild(createOrderCard(order)));
    }
}

// Função auxiliar para criar cada cartão de pedido
function createOrderCard(order) {
    const card = document.createElement("div");
    card.className = `order-adm-card status-${order.status || 'pendente'}`;

    const header = document.createElement("div");
    header.className = "order-header-adm";

    const titleInfo = document.createElement("div");
    titleInfo.innerHTML = `
        <h3>Pedido #${order.id}</h3>
        <small style="color: var(--white); font-weight: bold;">👤 ${order.clientName || 'Cliente'}</small>
    `;

    const badge = document.createElement("span");
    badge.className = "order-badge-modalidade";
    badge.textContent = order.locationText || order.modalidade.toUpperCase();

    header.append(titleInfo, badge);

    const body = document.createElement("div");
    body.className = "order-body-adm";

    let detalhesExtra = "";
    let pagamentoCardHtml = "";

    if (order.modalidade === "Delivery") {
        detalhesExtra = `📍 Rua: ${order.details.street}, Nº ${order.details.number}\n🌆 ${order.details.neighborhood} - ${order.details.city}\n📞 Tel: ${order.details.phone}\n💡 Ref: ${order.details.reference}`;
        
        let trocoTxt = order.details.change ? ` (${order.details.change})` : "";
        pagamentoCardHtml = `<div style="background: #2b1f13; border: 1px solid var(--orange); padding: 4px 8px; border-radius: 4px; color: var(--orange); font-weight: bold; margin-top: 4px;">💳 Pagamento: ${(order.details.paymentMethod || 'A combinar')}${trocoTxt}</div>`;
    } else if (order.modalidade === "Retirada") {
        detalhesExtra = `🛍️ Retirada por: ${order.details.name}\n📞 Tel: ${order.details.phone}`;
        if (order.details.paymentMethod) {
            pagamentoCardHtml = `<div style="background: #2b1f13; border: 1px solid var(--orange); padding: 4px 8px; border-radius: 4px; color: var(--orange); font-weight: bold; margin-top: 4px;">💳 Pagamento: ${order.details.paymentMethod}</div>`;
        }
    } else if (order.modalidade === "Mesa") {
        detalhesExtra = `🪑 Mesa nº: ${order.details.tableNumber}`;
    }

    body.innerHTML = `
        <div style="font-size: 11px; color: var(--orange); margin-bottom: 4px;">${detalhesExtra.replace(/\n/g, '<br>')}</div>
        ${pagamentoCardHtml}
        <div class="order-items-list" style="margin-top: 6px;">${order.receiptText}</div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
            <strong>Total: ${formatMoney(order.total)}</strong>
            <span style="font-size: 10px; color: var(--gray);">${order.time || ''}</span>
        </div>
    `;

    const footer = document.createElement("div");
    footer.className = "order-footer-adm";

    // Botão universal de impressão
    const btnPrint = document.createElement("button");
    btnPrint.className = "btn-imprimir";
    btnPrint.textContent = "🖨️ Imprimir";
    btnPrint.title = "Imprimir comanda deste pedido";
    btnPrint.addEventListener("click", () => printOrderReceipt(order));
    footer.appendChild(btnPrint);

    // Botões condicionais conforme o status atual
    if (!order.status || order.status === "pendente") {
        const btnPreparo = document.createElement("button");
        btnPreparo.className = "btn-preparo";
        btnPreparo.textContent = "👨‍🍳 Aceitar → Preparo";
        btnPreparo.addEventListener("click", () => {
            updateOrderStatus(order.id, "preparo");
            printOrderReceipt(order); // Impressão automática ao aceitar
        });
        footer.appendChild(btnPreparo);
    }

    if (order.status === "preparo") {
        const btnPronto = document.createElement("button");
        btnPronto.className = "btn-pronto";
        btnPronto.textContent = "✅ Marcar como Pronto";
        btnPronto.addEventListener("click", () => updateOrderStatus(order.id, "pronto"));
        footer.appendChild(btnPronto);
    }

    if (order.status !== "cancelado") {
        const btnCancelar = document.createElement("button");
        btnCancelar.className = "btn-cancelar";
        btnCancelar.textContent = "❌ Cancelar";
        btnCancelar.addEventListener("click", () => updateOrderStatus(order.id, "cancelado"));
        footer.appendChild(btnCancelar);
    } else {
        const btnRemover = document.createElement("button");
        btnRemover.className = "btn-cancelar";
        btnRemover.textContent = "🗑️ Excluir Definitivamente";
        btnRemover.addEventListener("click", () => deleteOrderPermanently(order.id));
        footer.appendChild(btnRemover);
    }

    card.append(header, body, footer);
    return card;
}

// Mover pedido de coluna alterando seu status
function updateOrderStatus(orderId, newStatus) {
    let orders = JSON.parse(localStorage.getItem("admOrders")) || [];
    orders = orders.map(order => {
        if (order.id === orderId) {
            order.status = newStatus;
        }
        return order;
    });
    localStorage.setItem("admOrders", JSON.stringify(orders));
    loadAdmOrders();
}

// Remover definitivamente do histórico de cancelados
function deleteOrderPermanently(orderId) {
    if (confirm("Deseja apagar este pedido cancelado permanentemente?")) {
        let orders = JSON.parse(localStorage.getItem("admOrders")) || [];
        orders = orders.filter(order => order.id !== orderId);
        localStorage.setItem("admOrders", JSON.stringify(orders));
        loadAdmOrders();
    }
}

// Limpar apenas o histórico de pedidos cancelados
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
        if (confirm("Deseja apagar todo o histórico de pedidos cancelados?")) {
            let orders = JSON.parse(localStorage.getItem("admOrders")) || [];
            orders = orders.filter(order => order.status !== "cancelado");
            localStorage.setItem("admOrders", JSON.stringify(orders));
            loadAdmOrders();
        }
    });
}

// Gestão de Chamados de Garçom
function loadWaiterCalls() {
    if (!waiterCallsList) return;
    let calls = JSON.parse(localStorage.getItem("waiterCalls")) || [];

    if (waiterCallsCount) {
        waiterCallsCount.textContent = `${calls.length} chamado${calls.length === 1 ? '' : 's'} pendente${calls.length === 1 ? '' : 's'}`;
    }

    if (calls.length === 0) {
        waiterCallsList.innerHTML = `<div class="empty-adm">Nenhum chamado de garçom no momento.</div>`;
        return;
    }

    waiterCallsList.innerHTML = "";

    calls.forEach((call, index) => {
        const card = document.createElement("div");
        card.className = "waiter-card";

        card.innerHTML = `
            <div>
                🪑 <strong>Mesa ${call.tableNumber}</strong>
                <div style="font-size: 11px; color: var(--gray);">${call.time}</div>
            </div>
        `;

        const attendBtn = document.createElement("button");
        attendBtn.className = "attend-btn";
        attendBtn.textContent = "Atendido ✓";
        attendBtn.addEventListener("click", () => {
            calls.splice(index, 1);
            localStorage.setItem("waiterCalls", JSON.stringify(calls));
            loadWaiterCalls();
        });

        card.appendChild(attendBtn);
        waiterCallsList.appendChild(card);
    });
}

// Atualização automática em tempo real
setInterval(() => {
    loadAdmOrders();
    loadWaiterCalls();
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
    loadAdmOrders();
    loadWaiterCalls();
});