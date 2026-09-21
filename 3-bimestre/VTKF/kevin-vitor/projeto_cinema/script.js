const cartoesFilmes = document.querySelectorAll(".cartao-filme");
const modalFilme = document.querySelector("#modal-filme");
const fecharModal = document.querySelector("#fechar-modal");

const imagemDetalhe = document.querySelector("#imagem-detalhe");
const tituloDetalhe = document.querySelector("#titulo-detalhe");
const generoDetalhe = document.querySelector("#genero-detalhe");
const anoDetalhe = document.querySelector("#ano-detalhe");
const descricaoDetalhe = document.querySelector("#descricao-detalhe");

const botoesEstrelas = document.querySelectorAll("#avaliacao-estrelas button");
const textoAvaliacao = document.querySelector("#texto-avaliacao");
const textoReview = document.querySelector("#texto-review");
const salvarAvaliacao = document.querySelector("#salvar-avaliacao");
const mensagemAvaliacao = document.querySelector("#mensagem-avaliacao");

const campoPesquisa = document.querySelector("#campo-pesquisa");
const botaoPesquisa = document.querySelector("#botao-pesquisa");
const nenhumFilme = document.querySelector("#nenhum-filme");
const contadorFilmes = document.querySelector("#contador-filmes");

const listaAvaliacoes = document.querySelector("#lista-avaliacoes");

let notaSelecionada = 0;
let filmeAtual = null;

const textosNotas = {
    1: "1 estrela — não gostei",
    2: "2 estrelas — poderia ser melhor",
    3: "3 estrelas — gostei",
    4: "4 estrelas — muito bom",
    5: "5 estrelas — perfeito!"
};

function obterChave(titulo) {
    return `trex-avaliacao-${titulo}`;
}

function atualizarContador(quantidade) {
    contadorFilmes.textContent =
        `${quantidade} ${quantidade === 1 ? "filme encontrado" : "filmes encontrados"}`;
}

function atualizarEstrelas() {
    botoesEstrelas.forEach(botao => {
        const valor = Number(botao.dataset.nota);

        botao.classList.toggle(
            "selecionada",
            valor <= notaSelecionada
        );
    });
}

function abrirFilme(cartao) {
    filmeAtual = cartao;

    const imagem = cartao.querySelector("img");

    imagemDetalhe.src = imagem.src;
    imagemDetalhe.alt = imagem.alt;

    tituloDetalhe.textContent = cartao.dataset.titulo;
    generoDetalhe.textContent = cartao.dataset.genero;
    anoDetalhe.textContent = `Ano: ${cartao.dataset.ano}`;
    descricaoDetalhe.textContent = cartao.dataset.descricao;

    notaSelecionada = 0;
    textoReview.value = "";
    mensagemAvaliacao.textContent = "";
    textoAvaliacao.textContent = "Escolha de 1 a 5 estrelas.";

    const avaliacaoSalva = localStorage.getItem(
        obterChave(cartao.dataset.titulo)
    );

    if (avaliacaoSalva) {
        const avaliacao = JSON.parse(avaliacaoSalva);

        notaSelecionada = avaliacao.nota;
        textoReview.value = avaliacao.texto || "";

        textoAvaliacao.textContent =
            `${textosNotas[notaSelecionada]} — sua avaliação anterior`;
    }

    atualizarEstrelas();

    modalFilme.classList.add("aberto");
    modalFilme.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-aberto");

    fecharModal.focus();
}

function fecharFilme() {
    modalFilme.classList.remove("aberto");
    modalFilme.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-aberto");
}

function pesquisarFilmes() {
    const pesquisa = campoPesquisa.value.trim().toLowerCase();
    let quantidade = 0;

    cartoesFilmes.forEach(cartao => {
        const titulo = cartao.dataset.titulo.toLowerCase();
        const genero = cartao.dataset.genero.toLowerCase();

        const encontrou =
            titulo.includes(pesquisa) ||
            genero.includes(pesquisa);

        cartao.style.display = encontrou ? "" : "none";

        if (encontrou) {
            quantidade++;
        }
    });

    nenhumFilme.hidden = quantidade !== 0;

    atualizarContador(quantidade);
}

function criarEstrelas(nota) {
    return "★".repeat(nota) + "☆".repeat(5 - nota);
}

function carregarAvaliacoes() {
    listaAvaliacoes.innerHTML = "";

    cartoesFilmes.forEach(cartao => {
        const titulo = cartao.dataset.titulo;

        const avaliacaoSalva = localStorage.getItem(
            obterChave(titulo)
        );

        if (!avaliacaoSalva) {
            return;
        }

        const avaliacao = JSON.parse(avaliacaoSalva);
        const imagem = cartao.querySelector("img");

        const cartaoAvaliacao = document.createElement("article");
        cartaoAvaliacao.className = "cartao-avaliacao";

        const poster = document.createElement("div");
        poster.className = "poster-avaliacao";

        const imagemAvaliacao = document.createElement("img");
        imagemAvaliacao.src = imagem.getAttribute("src");
        imagemAvaliacao.alt = imagem.getAttribute("alt");

        poster.appendChild(imagemAvaliacao);

        const conteudo = document.createElement("div");
        conteudo.className = "conteudo-avaliacao";

        const cabecalho = document.createElement("div");
        cabecalho.className = "cabecalho-avaliacao";

        const tituloAvaliacao = document.createElement("h3");
        tituloAvaliacao.textContent = titulo;

        const estrelas = document.createElement("span");
        estrelas.className = "estrelas-avaliacao";
        estrelas.textContent = criarEstrelas(avaliacao.nota);

        cabecalho.appendChild(tituloAvaliacao);
        cabecalho.appendChild(estrelas);

        conteudo.appendChild(cabecalho);

        if (avaliacao.texto) {
            const texto = document.createElement("p");
            texto.className = "texto-avaliacao-salva";
            texto.textContent = avaliacao.texto;

            conteudo.appendChild(texto);
        }

        cartaoAvaliacao.appendChild(poster);
        cartaoAvaliacao.appendChild(conteudo);

        listaAvaliacoes.appendChild(cartaoAvaliacao);
    });
}

cartoesFilmes.forEach(cartao => {
    const botao = cartao.querySelector(".abrir-filme");

    botao.addEventListener("click", () => {
        abrirFilme(cartao);
    });
});

botoesEstrelas.forEach(botao => {
    botao.addEventListener("click", () => {
        notaSelecionada = Number(botao.dataset.nota);

        atualizarEstrelas();

        textoAvaliacao.textContent =
            textosNotas[notaSelecionada];

        mensagemAvaliacao.textContent = "";
    });
});

salvarAvaliacao.addEventListener("click", () => {
    if (!filmeAtual) {
        return;
    }

    if (notaSelecionada === 0) {
        mensagemAvaliacao.textContent =
            "Escolha uma nota antes de salvar sua avaliação.";

        mensagemAvaliacao.style.color = "#ff9aaa";

        return;
    }

    const avaliacao = {
        nota: notaSelecionada,
        texto: textoReview.value.trim()
    };

    localStorage.setItem(
        obterChave(filmeAtual.dataset.titulo),
        JSON.stringify(avaliacao)
    );

    mensagemAvaliacao.textContent =
        "Sua avaliação foi salva!";

    mensagemAvaliacao.style.color = "#9fe6b5";

    carregarAvaliacoes();
});

fecharModal.addEventListener("click", fecharFilme);

document.querySelector("[data-fechar-modal]").addEventListener(
    "click",
    fecharFilme
);

document.addEventListener("keydown", evento => {
    if (
        evento.key === "Escape" &&
        modalFilme.classList.contains("aberto")
    ) {
        fecharFilme();
    }
});

campoPesquisa.addEventListener("input", pesquisarFilmes);

botaoPesquisa.addEventListener("click", pesquisarFilmes);

atualizarContador(cartoesFilmes.length);
carregarAvaliacoes();
