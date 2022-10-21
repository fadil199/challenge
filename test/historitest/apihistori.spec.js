const jsonToken = require('jsonwebtoken');
const request = require('supertest');
const index = require('../../index');
const { User_Games, User_Biodata, User_History } = require('../../models');

const {
    JWT_TOKEN,
} = process.env;

//endpoiont GET
describe('get all histori function', () => {
    //case failed
    test('res.json called with { status: true, message: berhasil dapat data }',async () => {
        try {
           const res = await request(index).get('/histori/tampilSeluruhGame')

           const sudahAda = await User_History.findAll();

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('berhasil dapat data');
            expect(res.body.data).toStrictEqual(sudahAda);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('isi game function', () => {
    //case failed
    test('res.json called with { status: true, message: history game berhasil dibuat }',async () => {
        try {
            const id_user = 13;
            const username = "reni";
            const nama_game = "mario kart";
            const nilai = 100;
            const token1 = JWT_TOKEN;
           const res = await request(index).post('/histori/akun/isiGame').send({id_user, username, nama_game, nilai}).set('authorization', token1);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('berhasil dapat data');
            expect(res.body.data).toStrictEqual({
                id_user,
                username,
                nama_game,
                nilai
            });
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('tampil game saya function', () => {
    //case failed
    test('res.json called with { status: true, message: history game berhasil dibuat }',async () => {
        try {
            const id_user = 13;
            const token1 = JWT_TOKEN;
           const res = await request(index).get('/histori/akun/tampilGameSaya').send({id_user}).set('authorization', token1);
           
           const histori1 = await User_History.findAll({ where: { id_user: req.body.id_user} });
            
           expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('berhasil dapat data');
            expect(res.body.data).toStrictEqual(histori1);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('update game saya function', () => {
    //case failed
    test('res.json called with { status: false, message: game tidak di temukan }',async () => {
        try {
            const id_user = 100;
            const token1 = JWT_TOKEN;
           const res = await request(index).patch(`/histori/akun/ganti-game/${id_user}`).send({id_user}).set('authorization', token1);
           
           const histori1 = await User_History.findOne({ where: { id: req.body.id_user }});
            
           expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('game tidak di temukan');
            // expect(res.body.data).toStrictEqual(histori1);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('update game saya function', () => {
    //case failed
    test('res.json called with { status: false, message: game tidak di temukan }',async () => {
        try {
            const id_user = 100;
            const token1 = JWT_TOKEN;
           const res = await request(index).patch(`/histori/akun/ganti-game/${id_user}`).send({id_user}).set('authorization', token1);
           
           const histori1 = await User_History.findOne({ where: { id: req.body.id_user }});
            
           expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('game tidak di temukan');
            // expect(res.body.data).toStrictEqual(histori1);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('update game saya function', () => {
    //case success
    test('res.json called with { status: true, message: Histori game berhasil diupdate }',async () => {
        try {
            const id_user = 18;
            const nama_game = "pes 2022";
            const nilai = 90;
            const token1 = JWT_TOKEN;
           const res = await request(index).patch(`/histori/akun/ganti-game/${id_user}`).send({id_user, nama_game, nilai}).set('authorization', token1);
           
           const histori1 = await User_History.findOne({ where: { id: req.body.id_user }});
            
           expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('Histori game berhasil diupdate');
            expect(res.body.data).toStrictEqual(histori1);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('hapus game saya function', () => {
    //case failed
    test('res.json called with { status: false, message: game gagal di hapus }',async () => {
        try {
            const id_user = 99;
            const token1 = JWT_TOKEN;
           const res = await request(index).delete(`/histori/akun/hapusGame/${id_user}`).send({id_user}).set('authorization', token1);
           
           const histori1 = await User_History.findOne({ where: { id: req.body.id_user }});
            
           expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`game dengan id ${id_user} tidak di temukan`);
            // expect(res.body.data).toStrictEqual(histori1);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('hapus game saya function', () => {
    //case success
    test('res.json called with { status: true, message: game telah di hapus }',async () => {
        try {
            const id_user = 36;
            const token1 = JWT_TOKEN;
           const res = await request(index).delete(`/histori/akun/hapusGame/${id_user}`).send({id_user}).set('authorization', token1);
           
           const histori1 = await User_History.findOne({ where: { id: req.body.id_user }});
            
           expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe(`game telah di hapus`);
            expect(res.body.data).toStrictEqual(histori1);
         
       }catch (err) {
       
       }
    });
});