const { json } = require("body-parser")

function cadastrar(){
    var nome = document.getElementById('name').value
    var email = document.getElementById('email').value
    var cnpj = document.getElementById('cnpj').value
    var number = document.getElementById('number').value
    var password = document.getElementById('password').value
    var confirmPassword = document.getElementById('confirm-password').value

    console.log(JSON.stringify({
        nome:nome,
        email:email,
        cnpj:cnpj,
        number:number,
        password:password,
        confirmPassword:confirmPassword
    }));

    fetch("/cadastro",{
        method: 'POST',
        body: JSON.stringify({
            nome:nome,
            email:email,
            cnpj:cnpj,
            number:number,
            password:password,
            confirmPassword:confirmPassword
        }) ,
        headers: {"Content-Type" : "aplication/json"}
        
    })
     
    .then(async (resp) =>{
        console.log('deu certo')
    })
}