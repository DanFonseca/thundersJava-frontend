function carregarAgencias(){

    fetch("http://localhost:8080/agencias")
    .then(res=>res.json())
    .then(res => preencherAgencias(res));

}

function gerarRelatorio(){

}