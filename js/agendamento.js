function agendar(){

    var mensagem = {
        nome : document.getElementById("txtNome").value,
        email: document.getElementById("txtEmail").value,
        celular : document.getElementById("txtCelular").value,
        data1 : document.getElementById("txtData").value,
        hora : document.getElementById("txtHora").value,
        observacao : document.getElementById("txtObservacao").value,
        idagencia : document.getElementById("agenciaId").value
    }

    var cabecalho = {
        method:"POST",
        body:JSON.stringify(mensagem),
        headers:{
            "Content-Type":"application/json"
        }
    }

    fetch("http://localhost:8080/agendar" , cabecalho)
    .then(res => res.json())
    .then(res => 
        {
            window.alert("Gravado com sucesso");
        })
    .catch(err => 
        {
            window.alert("Erro");
        });

}

// função para listar todas as agências cadastradas usando o método GET

function carregarAgencias(){

    fetch("http://localhost:8080/agencias")
    .then(res=>res.json())
    .then(res => preencherAgencias(res));

}    

function preencherAgencias(lista){

    var saida = "";

    for (i=0; i<lista.length;i++){
        saida+=
          "option value =  ' " + lista[i].id + " '>" + lista[i].nome;
    }
    document.getElementById("cmbAgencias").innerHTML=saida;
}