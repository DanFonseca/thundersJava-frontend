function logar(){
   var mensagem = {
       racf:document.getElementById("txtRacf").value,
       senha:document.getElementById("txtSenha").value
    }
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