function agendar(){

        //Converção na formatação de data.
        var Data = document.getElementById("txtData").value;
        var ano = Data.substring(0,4);
        var mes = Data.substring(5,7);
        var dia = Data.substring(8);
        var dataFormatada = dia + "/" + mes + "/" + ano;

    var mensagem = {
        nome_cli : document.getElementById("txtNome").value,
        email_cli: document.getElementById("txtEmail").value,
        celular_cli : document.getElementById("txtCelular").value,
        data : dataFormatada,
        hora : document.getElementById("txtHora").value,
        observacao : document.getElementById("txtObservacao").value,
        agencia:{id:document.getElementById("cmbAgencias").value }        
    }
    window.alert(JSON.stringify(mensagem));  
    window.alert("passei aqui");  
    var cabecalho = {
        method:"POST",
        body:JSON.stringify(mensagem),
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json"
        }
    }
    window.alert(cabecalho);  

    fetch("http://localhost:8080/agendar", cabecalho)
    .then(res => res.json())
    .then(res => {
            window.alert("Gravado com sucesso");
        })
    .catch(err => 
        {
            window.alert("Erro");
        });
    }

// função para listar todas as agências cadastradas usando o método GET

function carregarAgencias(){

    // somar 1 dia a data atual
        var hoje = new Date();  
        var ano1 = hoje.getFullYear();
        var mes1 = hoje.getMonth();
        var dia1 = hoje.getDate()+1;
        var dataAgenda = ano1.concat(mes1, dia1);

        var Dt = 20200814
        if (Data <= dataAgenda){
            window.alert("Data menor ou igual a data atual");
        }



       
       

    //dt.setDate(dt.getDate() + 1);

    window.alert(dataAgenda);

    fetch("http://localhost:8080/agencias")
    .then(res=>res.json())
    .then(res => preencherAgencias(res));

}    

function preencherAgencias(lista){

    var saida = "";

    for (i=0; i<lista.length;i++){
        saida+=
          "<option value =  ' " + lista[i].id + " '>" + lista[i].nomeAgencia  + "</option>";
    }
    document.getElementById("cmbAgencias").innerHTML=saida;
}
