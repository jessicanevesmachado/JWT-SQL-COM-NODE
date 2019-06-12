  var videoSelecionado = '';
  const camera  = new Camera('webCamera');
  var tirarFoto = new TirarFoto(camera); 

  function SelecionarVideo(video){
    videoSelecionado = video;   
    document.querySelector("#base_img").value = "";
    loadCamera();
  }

  function redirect(tela){
    window.location.href = tela;
  }

 
  function loadCamera(){ 
    if(camera.carregarCamera((carregou) => {
       if(carregou)   
            $("#modalFoto").modal('show');
    }));
      
  }

  function cancelar(){   
      camera.cancelar();
      $("#modalFoto").modal('hide');  
  }

  function takeSnapShot(){ 

      document.querySelector("#base_img").value = tirarFoto.criarfototemporaria(); 
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
    
      makeRequest("foto/save",parametros,"POST", function(response){
          console.log(response);
          $("#modalassistirvideo").modal('hide');        
          $("#modalalert").modal('show');
      }) 
  }