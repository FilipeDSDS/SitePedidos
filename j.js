let carrinho = [];
let total = 0;

function adicionarAoCarrinho(item, preco) {
    carrinho.push({item, preco});
    total += preco;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '';
    carrinho.forEach((item, indice) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.item} - R$ ${item.preco.toFixed(2)} 
            <button class="material-symbols-outlined icone" onclick="excluirItem(${indice})">delete</button>
            </span>
            
        `;
        listaCarrinho.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarPedido() {
    alert('Pedido finalizado! Total: R$ ' + total.toFixed(2));
    carrinho = [];
    total = 0;
    atualizarCarrinho();
}

function excluirItem(indice) {
    if (confirm(`Tem certeza que deseja excluir o item ${carrinho[indice].item}?`)) {
        total -= carrinho[indice].preco;
        carrinho.splice(indice, 1);
        atualizarCarrinho();
    }
}