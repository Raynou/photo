const { Router } = require('express');
const { saveImage } = require('../services/uriHandler.js');
const router = Router();


router.route('/api')
      .post((req, res) => {
        const uri = req.body?.uri
        // IMPORTANTE: Sí no cambias el nombre de cada imágen que se va a guardar, entonces esta se va a sobreescribir
        saveImage({ uri: uri, path: './test.png' });
        res.send();
      });

module.exports = router;