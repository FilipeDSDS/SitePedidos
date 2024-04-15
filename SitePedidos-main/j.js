// Variáveis globais para o carrinho e total
let carrinho = [];
let total = 0;

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(item, preco) {
    carrinho.push({ item, preco });
    total += preco;
    atualizarCarrinho();
    atualizarTotalCarrinho();
}


// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '';
    carrinho.forEach((item, indice) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="tamanho-font-texto">${item.item} - R$ ${item.preco.toFixed(2)} 
            <button class="material-symbols-outlined icone" onclick="excluirItem(${indice})">delete</button>
            </span>
        `;
        listaCarrinho.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para finalizar o pedido
function finalizarPedido() {
    alert('Pedido finalizado! Total: R$ ' + total.toFixed(2));
    carrinho = [];
    total = 0;
    atualizarCarrinho();
}

// Função para excluir um item do carrinho
function excluirItem(indice) {
    if (confirm(`Tem certeza que deseja excluir o item ${carrinho[indice].item}?`)) {
        total -= carrinho[indice].preco;
        carrinho.splice(indice, 1);
        atualizarCarrinho();
        atualizarTotalCarrinho();
    }
}

function atualizarTotalCarrinho() {
    total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    var menu = document.querySelector('.menu');
    var numeroHamburguer = 0;

    // Função para adicionar um novo hambúrguer ao menu
function adicionarHamburguerMenu(nome, preco, imagemUrl) {
    numeroHamburguer++;
    var novoHamburguer = document.createElement('div');
    novoHamburguer.classList.add('menu-item');
    novoHamburguer.setAttribute('data-numero', numeroHamburguer);

    var imagem = document.createElement('img');
    imagem.src = imagemUrl;
    imagem.alt = nome;
    imagem.classList.add('menu-item');
    novoHamburguer.appendChild(imagem);

    var nomeHamburger = document.createElement('h3');
    nomeHamburger.textContent = nome;
    novoHamburguer.appendChild(nomeHamburger);

    // Símbolo "R$"
    var precoFormatado = 'R$ ' + preco.toFixed(2);

    var precoHam = document.createElement('p');
    precoHam.textContent = precoFormatado;
    novoHamburguer.appendChild(precoHam);

    var botaoAdicionarCarrinho = document.createElement('button');
    botaoAdicionarCarrinho.textContent = 'Adicionar ao Carrinho';
    botaoAdicionarCarrinho.classList.add('buttons', 'bebas-neue-regular');
    botaoAdicionarCarrinho.onclick = function() {
        adicionarAoCarrinho(nome, preco);
    };
    novoHamburguer.appendChild(botaoAdicionarCarrinho);

    var botaoModificar = document.createElement('button');
    botaoModificar.textContent = 'Modificar Hambúrguer';
    botaoModificar.classList.add('buttons', 'bebas-neue-regular');
    botaoModificar.onclick = function() {
        modificarHamburguer(novoHamburguer);
    };
    novoHamburguer.appendChild(botaoModificar);

    var botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir Hambúrguer';
    botaoExcluir.classList.add('buttons', 'bebas-neue-regular');
    botaoExcluir.onclick = function() {
        excluirHamburguer(novoHamburguer);
    };
    novoHamburguer.appendChild(botaoExcluir);

    menu.appendChild(novoHamburguer);
}

function modificarHamburguer(hamburguer) {
    var nomeAtual = hamburguer.querySelector('h3').textContent;
    var precoAtual = parseFloat(hamburguer.querySelector('p').textContent.replace('R$', '').trim());
    var imagemAtual = hamburguer.querySelector('img').src;

    var novoNome = prompt('Digite o novo nome do hambúrguer:', nomeAtual);
    var novoPrecoInput = prompt('Digite o novo preço do hambúrguer (apenas números):', precoAtual);
    var novaImagem = prompt('Digite a nova URL da imagem do hambúrguer:', imagemAtual);

    if (!isNaN(novoPrecoInput) && novoNome !== null && novoPrecoInput !== null) {
        var novoPreco = parseFloat(novoPrecoInput);
        var precoFormatado = 'R$ ' + novoPreco.toFixed(2);

        hamburguer.querySelector('h3').textContent = novoNome;
        hamburguer.querySelector('p').textContent = precoFormatado;
        hamburguer.querySelector('img').src = novaImagem;
        hamburguer.querySelector('img').alt = novoNome;

        hamburguer.querySelector('img').classList.add('menu-item');

        // Atualiza todos os itens no carrinho com os novos valores, se estiverem no carrinho
        carrinho.forEach(item => {
            if (item.item === nomeAtual && item.preco === precoAtual) {
                item.item = novoNome;
                item.preco = novoPreco;
            }
        });
        atualizarCarrinho();
        atualizarTotalCarrinho();

        hamburguer.querySelector('.buttons').onclick = function() {
            adicionarAoCarrinho(novoNome, novoPreco);
        };
    } else {
        alert('Por favor, insira um preço válido para o hambúrguer.');
    }
}

    // Função para excluir um hambúrguer do menu
    function excluirHamburguer(hamburguer) {
        hamburguer.remove();
        alert('Hambúrguer excluído');
    }

    // Evento para adicionar um novo hambúrguer ao menu
    var botaoAdicionarHamburguer = document.getElementById('adicionar-hamburguer');
    botaoAdicionarHamburguer.addEventListener('click', function() {
        var nome = prompt('Digite o nome do hambúrguer:');
        var preco = parseFloat(prompt('Digite o preço do hambúrguer:'));
        var imagemUrl = prompt('Digite a URL da imagem do hambúrguer ou a pasta respectiva em que está a imagem (Ter no final o tipo da imagem: .jpg / .jpeg / .png):');

        if (nome && preco && imagemUrl) {
            adicionarHamburguerMenu(nome, preco, imagemUrl);
        } else {
            alert('Insira todos os valores para adicionar o hambúrguer.');
        }
    });
});
