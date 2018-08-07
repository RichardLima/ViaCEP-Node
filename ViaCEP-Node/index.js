const request = require('request')
const express = require('express')
const app = express()
const port = process.env.PORT || 4001
// const data = require('./data.json')

function removeCaracteres(e){ 
    let remove = /-/g;  // adicione os caracteres indesejáveis
    return e.replace(remove, "");
}

// Lista um cep específico
app.get('/:cep', function (req, res) {
    let cep = req.params.cep
    
    cep = removeCaracteres(cep)
    console.log(cep)

    if(cep.length != 8) {
        res.status(404).send("TA ERRADO")
    }else {
        let options = {
            method: 'GET',
            url: `https://viacep.com.br/ws/` + cep + `/json/`

        }
        console.log(options)
        request(options, function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
           
            body = JSON.parse(body)
          
            if (body.erro) {
                res.status(404).send("NÃO EXISTE")
            } else {
                let retorno = []
                retorno.push({
                    cep: body.cep,
                    rua: body.logradouro,
                    bairro: body.bairro,
                    cidade: body.localidade,
                    estado: body.uf

                })
                console.log(body)
                res.status(200).send(retorno)
            }
        })

    }
})




app.get('/', function (req, res) {
    res.send("<h1>HELLO</h1>")
})

app.listen(port, function () {
    console.log("Rodando na porta:", port)
})