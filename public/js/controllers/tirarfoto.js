class TirarFoto{

    constructor(camera){
        this.camera = camera;
    }

    criarfototemporaria(){

        var canvas     = document.createElement('canvas');
        canvas.width   = this.camera.video.videoWidth;
        canvas.height  = this.camera.video.videoHeight;
        var ctx        = canvas.getContext('2d');
        ctx.drawImage(this.camera.video, 0, 0, canvas.width, canvas.height);
        console.log(canvas.toDataURL('image/jpeg'));
        return  canvas.toDataURL('image/jpeg');

    }

     
}