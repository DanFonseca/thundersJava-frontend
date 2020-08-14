function carregarAgencias(){

    fetch("http://localhost:8080/agencias")
    .then(res=>res.json())
    .then(res => preencherAgencias(res));

}

function carregarUsuario() {
    var userStr=localStorage.getItem("user");
    if (!userStr){
        window.location="index.html";
    }else{
        var user = JSON.parse(userStr);
        document.getElementById("perfil").innerHTML=
        "<h3>"+user.nome+"("+user.racf+")<br>";
    }
    
    document.getElementById("fotoUsuario").innerHTML="<img src=images/"+user.foto+"width='20%'>";
    

    fetch("http://localhost:8080/agendar" , cabecalho)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("user",JSON.stringify(res));
        window.location="usuario.html";
    })
    .catch(err => {
        document.getElementById("meuerro").style.visibility="visible";
    });
}
 
function carregar(lista){
    var srtAgendamentos=
        for (i=0;i<lista.length;i++){
            srtAgendamentos+='<tr>'+
                '<td>'+lista[i].agencia+'</td>'+
                '<td>'+lista[i].data+'</td>'+
                '<td>'+lista[i].cliente+'</td>'+
            '</tr>';
        }
    document.getElementById("agendamentos").innerHTML=srtAgendamentos;
}
