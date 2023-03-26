const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const btnTakePhoto = document.getElementById('takePhoto');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
const url = "http://localhost:8000/api";

webcam.start()
   .then(() =>{
      console.log("webcam started");
   })
   .catch(err => {
       console.log(err);
   });

btnTakePhoto.addEventListener('click', async () => {
    const picture = webcam.snap();
    const body = {
        uri: picture
    };
    await fetch(url, {
        method: "POST",
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(body)
    });
});