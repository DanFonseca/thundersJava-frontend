function logar(){
 
    let  login =  document.getElementById("txtLogin").value;
    let senha =  document.getElementById("txtSenha").value;

    let gerente = {
        nome : login,
        senha : senha
    }

      
    let config = {
        method: 'POST',
        body: JSON.stringify(gerente),
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
    }}

    
    fetch('http://localhost:8080/login', config)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        alert('entrou');
    }).catch(error =>{
        alert('Usuairo ou senha incorreta');
    })

}