const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const btnTakePhoto = document.getElementById('takePhoto');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
const url = "http://localhost:8000/api";
const moodleUrl = "http://localhost:3000/login/index.php";

webcam.start()
   .then(() =>{
      console.log("webcam started");
   })
   .catch(err => {
       console.log(err);
   });

btnTakePhoto.addEventListener('click', async () => {
    // Disabled for debuggin
    // const picture = webcam.snap();
    const body = {
       uri: 'foo',
       email: getEmail()
    };
    const res = await getToken(body);
    sendToken(res);
});

/**
 * Finds moodle user image by the id and renderizes on the login.
 * @param {number} pictureId 
 * @returns 
 */
const getUserPicture = (pictureId) => {
    if(!pictureId) { return; }
    const img = document.getElementById('userPicture');
    img.src = `http://localhost:3000/moodle/pluginfile.php/5/user/icon/boost/f1?rev=${pictureId}`;
}

/**
 * Sends the uri and the email to localhost:8000/api
 * @returns '{pic: pictureOfUser, password: passwordOfUser, id: idOfUser}'
 */
const getToken = async (body={}) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(body)
    });
    return res.json();
}

/**
 * Sends the response of getToken to localhost:3000/moodle/index.php
 * @param {Object} body - the json response of getToken   
 */

const sendToken = async (body={}) => {
    // TODO: petition rejected by cors
    await fetch(moodleUrl, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(body)
    })
}

/**
 * Gets the string of the input with the id 'email'.
 * @returns
*/

const getEmail = () => {
    const email = document.getElementById('email');
    return email.value;
}