const express = require('express');
const router = express.Router();
const cont = require('../controllers');
const middle = require('../helpers/middle');

router.post('/akun/isibiodata', middle.masukDulu, cont.biodata.isiBiodata);
router.delete('/akun/hapusBiodata', middle.masukDulu, cont.biodata.hapusBiodata);
router.get('/akun/tampilBiodata', middle.masukDulu, cont.biodata.tampilBiodata);
router.get('/tampilBiodataAll', cont.biodata.tampilSeluruhBiodata);
router.patch('/akun/ganti-biodata', middle.masukDulu, cont.biodata.updateBiodata);

module.exports = router;