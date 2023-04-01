const { Router } = require("express");
const { saveImage } = require("../services/uriHandler.js");
const {
  getUserPicture,
  getUserPassword,
  getUserId,
} = require("../services/querys.js");
const http = require("http");
const router = Router();

router.route("/login").post(async (req, res) => {
  const uri = req.body?.uri;
  const email = req.body?.email;
  // IMPORTANTE: Sí no cambias el nombre de cada imágen que se va a guardar, entonces esta se va a sobreescribir
  // saveImage({ uri: uri, path: './test.png' });
  const userPic = await getUserPicture({ email: email });
  const userPassword = await getUserPassword({ email: email });
  const userId = await getUserId({ email: email });
  const body = {
    pic: userPic,
    password: userPassword,
    id: userId,
  };

  // Correlation between photos up to 80%
  if (true) {
    // Make an http petititon to Moodle
    const requestOptions = {
      hostname: "localhost",
      port: 3000,
      path: "/moodle/login",
      method: "POST",
    };

    const externalRequest = http.request(requestOptions, (externalResponse) => {
      externalResponse.on("end", () => {
        console.log("Este mensaje se debería imprimir sí la petición a Moodle es exitosa");
        res.redirect("localhost:3000/moodle/login/index.php");
      });
    });

    externalRequest.write(JSON.stringify(body));

    externalRequest.end();
  } else {
    /* Login failed */
    res.end();
  }
});
router
  .route("/test")
  .get((req, res) => {
    res.send("Test");
  })
  .post((req, res) => {
    console.log(req.body);
    res.send("Ok");
  });
module.exports = router;
