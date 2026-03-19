let inputTexto = document.querySelector(".input-texto");
let selectIdioma = document.querySelector(".idioma");
let textoTraduzido = document.querySelector(".traducao");

const idiomasMap = {
    "Inglês": "en",
    "Alemão": "de",
    "Japonês": "ja"
};

const vozesMap = {
    "Inglês": "en-US",
    "Alemão": "de-DE",
    "Japonês": "ja-JP"
};

async function traduzir() {
    const textoParaTraduzir = inputTexto.value;
    const idiomaDestino = idiomasMap[selectIdioma.value];

    if (!textoParaTraduzir) return;

    textoTraduzido.innerText = "Traduzindo...";

    let endereco = `https://api.mymemory.translated.net/get?q=${textoParaTraduzir}&langpair=pt-BR|${idiomaDestino}`;

    try {
        let resposta = await fetch(endereco);
        let dados = await resposta.json();
        textoTraduzido.innerText = dados.responseData.translatedText;
    } catch (erro) {
        textoTraduzido.innerText = "Erro ao traduzir.";
    }
}

async function traduzirComAudio() {
    const textoParaTraduzir = inputTexto.value;
    const idiomaNome = selectIdioma.value;
    const idiomaDestino = idiomasMap[idiomaNome];

    if (!textoParaTraduzir) return;

    textoTraduzido.innerText = "Traduzindo...";

    let endereco = `https://api.mymemory.translated.net/get?q=${textoParaTraduzir}&langpair=pt-BR|${idiomaDestino}`;

    try {
        let resposta = await fetch(endereco);
        let dados = await resposta.json();
        let resultado = dados.responseData.translatedText;
        
        textoTraduzido.innerText = resultado;

        const fala = new SpeechSynthesisUtterance();
        fala.text = resultado;
        fala.lang = vozesMap[idiomaNome];
        window.speechSynthesis.speak(fala);

    } catch (erro) {
        textoTraduzido.innerText = "Erro ao traduzir.";
    }
}