const express = require('express');
const router = express.Router();
const cont = require('../controllers');
const middle = require('../helpers/middle');

router.get('/index', cont.user.index);
router.post('/daftar', cont.user.daftar);
router.post('/masuk', cont.user.masuk);
router.get('/akun', middle.masukDulu, cont.user.akunSaya);
router.get('/user', cont.user.daftarUser);
router.delete('/hapus/:userId', cont.user.hapususer);
router.patch('/ganti-password', middle.masukDulu, cont.user.gantiPassword);
router.get('/detil/:userId', cont.user.detilUser);

module.exports = router;