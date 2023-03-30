const { Router } = require('express');
const { saveImage } = require('../services/uriHandler.js');
const { getUserPicture } = require('../services/querys.js');
const router = Router();


router.route('/api')
      .get((req, res) => {
        res.send('Ok')
      })
      .post((req, res) => {
        const uri = req.body?.uri
        const email = req.body?.email
        // IMPORTANTE: Sí no cambias el nombre de cada imágen que se va a guardar, entonces esta se va a sobreescribir
        saveImage({ uri: uri, path: './test.png' });
        getUserPicture({ email: email }).then(pictureId => {
          res.send(pictureId)
        });
      });

module.exports = router;