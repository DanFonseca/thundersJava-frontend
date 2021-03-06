function gerarRelatorio() {
   let usuarioLogado = localStorage.getItem("logado");

   if (!usuarioLogado) {
      window.location = 'index.html';
   } else {
      carregarAgencias()
      console.log('');
   }
   var usuarioJson = JSON.parse(usuarioLogado);
   document.getElementById("perfil").innerHTML =
      "<h3> Usuário: " + usuarioJson.nome + "</h3>";

   let dataAgendamento = document.getElementById("dataAgendamento").value
   let agencia = document.getElementById("agencia").value
   let cliente = document.getElementById("cliente").value


   if (dataAgendamento == "" && agencia != 0 && cliente == "") {

      fetch('http://localhost:8080/agendamentoNomeAgencia/' + devolveAgencia(agencia))
         .then(res => res.json())
         .then(res => {
            console.log(res);
            retornarAgendamentoPorAgencia(res)
         })
   }

   if (dataAgendamento == "" && agencia == 0 && cliente == "" ||
      dataAgendamento != "" && agencia != 0 && cliente != "") {
      fetch('http://localhost:8080/agendamentos')
         .then(res => res.json())
         .then(res => {
            console.log(res);
            retornarAgendamentos(res)
         })

   }

   if (dataAgendamento != "" && agencia == 0 && cliente == "") {

      //Converção na formatação de data.
      var Data = dataAgendamento;
      var ano = Data.substring(0, 4);
      var mes = Data.substring(5, 7);
      var dia = Data.substring(8);
      var dataFormatada = dia + "-" + mes + "-" + ano;

      var dmy = dataFormatada.split("-");
      var dtInformada = new Date(dmy[2], dmy[1] - 1, dmy[0]);


      let timestamp = dtInformada;
      let data = new Date(timestamp);

      let formatado = data.toLocaleDateString("pt-BR").split("/")[0] + "-" + data.toLocaleDateString("pt-BR").split("/")[1] + "-" + data.toLocaleDateString("pt-BR").split("/")[2]

      fetch('http://localhost:8080/agendamentoData/' + formatado)
         .then(res => res.json())
         .then(res => {
            console.log(res);
            retornarAgendamentoPorData(res)
         })
   }


   if (dataAgendamento == "" && agencia == 0 && cliente != "") {
      fetch('http://localhost:8080/agendamentoNomeCliente/' + cliente)
         .then(res => res.json())
         .then(res => {
            console.log(res);
            retornarAgendamentoPorData(res)
         })
   }

   //Nome agencia e data
   if (dataAgendamento != "" && agencia != 0 && cliente == "") {
      
      //Converção na formatação de data.
      var Data = dataAgendamento;
      var ano = Data.substring(0, 4);
      var mes = Data.substring(5, 7);
      var dia = Data.substring(8);
      var dataFormatada = dia + "-" + mes + "-" + ano;

      var dmy = dataFormatada.split("-");
      var dtInformada = new Date(dmy[2], dmy[1] - 1, dmy[0]);


      let timestamp = dtInformada;
      let data = new Date(timestamp);

      let formatado = data.toLocaleDateString("pt-BR").split("/")[0] + "-" + data.toLocaleDateString("pt-BR").split("/")[1] + "-" + data.toLocaleDateString("pt-BR").split("/")[2]

      fetch('http://localhost:8080/agendamentoAgenciaAndData/' + devolveAgencia(agencia) + '/' + formatado)
         .then(res => res.json())
         .then(res => {
            console.log(res);
            retornarAgendamentoPorData(res)
         })



   }


   //Nome agencia e nome cliente
   if (dataAgendamento == "" && agencia != 0 && cliente != "") {
      
      if (agencia == 1) {
         agencia = 'Mooca';
      } else if (agencia == 2) {
         agencia = 'Interlagos';
      } else if (agencia == 3) {
         agencia = 'Jabaquara'
      } else if (agencia == 4) {
         agencia = 'Morumbi'
      }


      fetch('http://localhost:8080/agendamentoAgenciaCliente/' + devolveAgencia(agencia) + '/' + cliente + '')
         .then(res => res.json())
         .then(res => {
            console.log(res);
            retornarAgendamentoPorData(res)
         })
   }


   //Nome do cliente e data
   if (dataAgendamento != "" && agencia == 0 && cliente != "") {

      //Converção na formatação de data.
      var Data = dataAgendamento;
      var ano = Data.substring(0, 4);
      var mes = Data.substring(5, 7);
      var dia = Data.substring(8);
      var dataFormatada = dia + "-" + mes + "-" + ano;

      var dmy = dataFormatada.split("-");
      var dtInformada = new Date(dmy[2], dmy[1] - 1, dmy[0]);

      let data = new Date(dtInformada);

      let formatado = data.toLocaleDateString("pt-BR").split("/")[0] + "-"
         + data.toLocaleDateString("pt-BR").split("/")[1] + "-"
         + data.toLocaleDateString("pt-BR").split("/")[2]


      fetch('http://localhost:8080/agendamentonomeClienteData/' + cliente + '/' + formatado)
         .then(res => res.json())
         .then(res => {
            console.log(res);
            retornarAgendamentoPorData(res)
         })

   }
}


function devolveAgencia (agencia){
  return document.getElementById("agencia").options[parseInt(agencia, 10)].text
}

//GERACAO DAS TABELAS
function retornarAgendamentos(resp) {
   let saida =
      "<table class = 'table table-striped' border='1' cellpadding='5' cellspacing='2'>" +
      "<tr>" +
      "<th>Nome da Agência</th>" +
      "<th>Hora de Abertura</th>" +
      "<th>Hora de Fechamento</th>" +
      "<th>Nome do Cliente</th>" +
      "<th>Hora de agendamento</th>" +
      "<th>Data Agendada</th>" +
      "<th>Observacao</th>"
   "</tr>"

   resp.forEach(resp => {

      saida +=

         "<tr>" +
         "<td>" + resp.agencia.nomeAgencia + "</td>" +

         "<td>" + resp.agencia.horaInicio + "</td>" +

         "<td>" + resp.agencia.horaFim + "</td>" +

         "<td>" + resp.nomeCliente + "</td>" +

         "<td>" + resp.hora + "</td>" +

         "<td>" + resp.data + "</td>" +

         "<td>" + resp.observacao + "</td>" +
         "</tr>"
   });

   saida += "</table>"

   document.getElementById('relatorio').innerHTML = saida;
}


function retornarAgendamentoPorAgencia(resp) {

   let agendamentos = resp[0].agendamentos

   let aux = 0;

   let saida =
      "<table class = 'table table-striped'  border='1' cellpadding='5' cellspacing='2'>" +
      "<tr>" +
      "<th>Cliente</th>" +
      "<th>E-mail</th>" +
      "<th>Celular</th>" +
      "<th>Data</th>" +
      "<th>Hora</th>" +
      "<th>Observacao</th>" +
      "<th>Agência</th>"
   "</tr>"

   agendamentos.forEach(agendamentos => {

      saida +=

         "<tr>" +
         "<td>" + agendamentos.nomeCliente + "</td>" +

         "<td>" + agendamentos.emailCliente + "</td>" +

         "<td>" + agendamentos.celularCliente + "</td>" +

         "<td>" + agendamentos.data + "</td>" +

         "<td>" + agendamentos.hora + "</td>" +

         "<td>" + agendamentos.observacao + "</td>" +

         "<td>" + resp[0].nomeAgencia + "</td>" +

         "</tr>"

      aux += 1;
   })

   saida += "</table>"

   document.getElementById('relatorio').innerHTML = saida;

}


function retornarAgendamentoPorData(resp) {

   let saida =
      "<table class = 'table table-striped' border='1' cellpadding='5' cellspacing='2'>" +
      "<tr>" +
      "<th>Cliente</th>" +
      "<th>E-mail</th>" +
      "<th>Celular</th>" +
      "<th>Data</th>" +
      "<th>Hora</th>" +
      "<th>Observacao</th>" +
      "<th>Agência</th>"
   "</tr>"

   resp.forEach(resp => {

      saida +=

         "<tr>" +
         "<td>" + resp.nomeCliente + "</td>" +

         "<td>" + resp.emailCliente + "</td>" +

         "<td>" + resp.celularCliente + "</td>" +

         "<td>" + resp.data + "</td>" +

         "<td>" + resp.hora + "</td>" +

         "<td>" + resp.observacao + "</td>" +

         "<td>" + resp.agencia.nomeAgencia + "</td>" +

         "</tr>"

   })

   saida += "</table>"

   document.getElementById('relatorio').innerHTML = saida;
}


function carregarAgencias() {
   fetch("http://localhost:8080/agencias")
      .then(res => res.json())
      .then(res => preencherAgencias(res));
}

function preencherAgencias(lista) {
   var saida = "<option selected value = '0'>Selecione</option>";

   for (i = 0; i < lista.length; i++) {
      saida +=
         "<option value =  ' " + lista[i].id + " '>" + lista[i].nomeAgencia + "</option>";
   }
   document.getElementById("agencia").innerHTML = saida;
}

