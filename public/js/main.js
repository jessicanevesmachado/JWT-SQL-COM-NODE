
  var videoSelecionado = '';
  function SelecionarVideo(video){
    videoSelecionado = video;   
    document.querySelector("#base_img").value = "";
    loadCamera();
  }

  function redirect(tela){
    window.location.href = tela;
  }

  var video = null;
  function loadCamera(){
     
	//Captura elemento de vídeo
     video = document.querySelector("#webCamera");
    
		//As opções abaixo são necessárias para o funcionamento correto no iOS
		video.setAttribute('autoplay', '');
	    video.setAttribute('muted', '');
	    video.setAttribute('playsinline', '');
	    //--
	
	//Verifica se o navegador pode capturar mídia
	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user'}})
		.then( function(stream) {
			//Definir o elemento vídeo a carregar o capturado pela webcam
            video.srcObject = stream;
            $("#modalFoto").modal('show');
		})
		.catch(function(error) {
			alert("É necessário Permitir o acesso a Web Cam");
		});
    }   
    
}

function cancelar(){
    var track = video.srcObject.getTracks()[0];
    track.stop();
    $("#modalFoto").modal('hide');   

}

function takeSnapShot(){
   
    //Captura elemento de vídeo
    var video = document.querySelector("#webCamera");
    
    //Criando um canvas que vai guardar a imagem temporariamente
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var ctx = canvas.getContext('2d');
    
    //Desenhando e convertendo as dimensões
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    //Criando o JPG
    var dataURI = canvas.toDataURL('image/jpeg'); //O resultado é um BASE64 de uma imagem.
    document.querySelector("#base_img").value = dataURI; 
    cancelar();
    assistirVideo();
}


function assistirVideo(){
   
    var src = "public/video/"+videoSelecionado;   
    $("#video-tutorial").html(`<source src='${src}' type='video/mp4'></source>`);
    $("#modalassistirvideo").modal('show');
     
}

function finalizar(){
    
    var parametros = {video:videoSelecionado, foto:document.querySelector("#base_img").value.replace("data:image/jpeg;base64,","")};
    //var parametros = {video:videoSelecionado, foto:document.querySelector("#base_img").value};
    makeRequest("foto/save",parametros,"POST", function(response){
        console.log(response);
        $("#modalassistirvideo").modal('hide');        
        $("#modalalert").modal('show');
    })
    
  
}