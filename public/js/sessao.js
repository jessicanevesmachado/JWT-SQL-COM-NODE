var urlbase = "http://localhost:3333/";

function autenticar(cb){

  
    var _token   =  localStorage.getItem("token");
    var expirado = verificaTokenExpirado(_token);

    if(typeof(_token) != "undefined" && _token != "" && !expirado) 
        cb(JSON.parse(_token));
    else{
        getToken(function(token){
            cb(token);
        })
    }
   
}

function getToken(cb){

    $.post(urlbase+"login",{user:"admin",pwd:"admin"}, function( data ) { 
        if(data.auth){

          
            var session = {
                token:data.token,
                dataExpiracao:getDataExpiracaoToken(),
                auth : true                               
            }

            localStorage.setItem('token',JSON.stringify(session));
            cb(session); 
        }
        else
            alert(data.message);
        cb(data);       
    });
}

function getDataExpiracaoToken(){
    var d1 = new Date (), d2 = new Date ( d1 );
    d2.setMinutes ( d1.getMinutes() + 30 );
    return d2;
}

function verificaTokenExpirado(_token){

  
    if(typeof(_token) != "undefined" && _token != "") {
        var token = JSON.parse(_token);
        var expirar = new Date(token.dataExpiracao);
        var dataautal = new Date();
         
        return expirar < dataautal;
    }

    return true;
}


function makeRequest(url,parametros,method, cb){

    autenticar(function(data){
     
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": urlbase+url,
          "method": method,
          "headers": {
            "x-access-token": data.token         
          },
          "data": parametros
        }
        
        $.ajax(settings).done(function (response) {
            cb(response)
        });        

    })
}