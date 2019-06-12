class Camera {

    constructor(element){
        this.elemento = element;
        this.video    = null;
    }

    cancelar(){
        var track = this.video.srcObject.getTracks()[0];
        track.stop();  
    }

    carregarCamera(cb){
        var camera = this;
        this.configurarCarmera();        
        
        if (this.navegadorCompativel()){

            navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user'}})
            .then( function(stream) {                
                camera.video.srcObject = stream;
                 return cb(true);
            })
            .catch(function(error) {
                alert("É necessário Permitir o acesso a Web Cam");
                return cb(false);
            });
        }   
    }

    navegadorCompativel(){
        return navigator.mediaDevices.getUserMedia;
    }

    configurarCarmera(){

        this.video = document.querySelector("#"+this.elemento);
        this.video.setAttribute('autoplay', '');
	    this.video.setAttribute('muted', '');
        this.video.setAttribute('playsinline', '');
    }

    
    
}

