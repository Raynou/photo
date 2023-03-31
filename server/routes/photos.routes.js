const { Router } = require('express');
const { saveImage } = require('../services/uriHandler.js');
const { getUserPicture, getUserPassword, getUserId } = require('../services/querys.js');
const router = Router();


router.route('/api')
      .post(async (req, res) => {
        const uri = req.body?.uri
        const email = req.body?.email
        // IMPORTANTE: Sí no cambias el nombre de cada imágen que se va a guardar, entonces esta se va a sobreescribir
        // saveImage({ uri: uri, path: './test.png' });
        const userPic = await getUserPicture({email: email});
        const userPassword = await getUserPassword({email: email});
        const userId = await getUserId({email: email});
        const response = {
          pic: userPic,
          password: userPassword,
          id: userId
        }
        res.send(response)
      });
router.route('/test')
      .get((req, res) => {
        res.send('Test')
      })
      .post((req, res) => {
        console.log(req.body);
        res.send('Ok')
      });
module.exports = router;