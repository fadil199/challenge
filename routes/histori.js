const express = require('express');
const router = express.Router();
const cont = require('../controllers');
const middle = require('../helpers/middle');

router.post('/akun/isiGame', middle.masukDulu, cont.histori.isiGame);
router.get('/akun/tampilGameSaya', middle.masukDulu, cont.histori.tampilGameSaya);
router.patch('/akun/ganti-game/:gameId', middle.masukDulu, cont.histori.updateIsiGame);
router.delete('/akun/hapusGame/:gameId', middle.masukDulu, cont.histori.hapusGame);
router.get('/tampilSeluruhGame', cont.histori.tampilSeluruhGameUser);

module.exports = router;