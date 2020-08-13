function logar(){
    var mensagem = {
        login: document.getElementById("txtLogin").value,
        senha: document.getElementById("txtSenha").value
     }
  
    verificaLogin(mensagem);

   var cabecalho = {
       method:"POST",
       body:JSON.stringify(mensagem),
       header:{
           "Content-Type":"application/json"
       }
    }

    fetch("http://localhost:8080/login", cabecalho)
    .then(res => res.json())
    .then(res=>{
        localStorage.setItem("logado",JSON.stringify(res));
        window.location="usuario.html";
    })
    .catch(err=>{
        window.alert("Erro");
    });
}

function verificaLogin(mensagem){
    if (mensagem.login.contains('@'))
    {
        console.log('e um e-mail');
    }
    else  if (mensagem.login.lenght() == 9)
        {
        console.log('e uma funcional');
        }
    else (mensagem.login.lenght() == 7)
        {
        console.log('e uma racf');
        }
}
