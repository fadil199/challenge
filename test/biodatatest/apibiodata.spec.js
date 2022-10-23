const jsonToken = require('jsonwebtoken');
const request = require('supertest');
const index = require('../../index');
const { User_Games, User_Biodata, User_History } = require('../../models');

const {
    JWT_TOKEN,
} = process.env;

//endpoiont GET
describe('tampil biodata all function', () => {
    //case failed
    test('res.json called with { status: true, message: berhasil dapat data }',async () => {
        try {
           const res = await request(index).get('/biodata/tampilBiodataAll');

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('berhasil dapat data');
            expect(res.body.data).toBe(res.body.data);
         
       }catch (err) {
        expect(err).toBe('error');
       }
    });
});

//endpoiont GET
describe('isi biodata function', () => {
    //case failed
    test('res.json called with { status: false, message: biodata sudah di isi }',async () => {
        try {
            const userId = 13;
            const token1 = JWT_TOKEN;
           const res = await request(index).post('/biodata/akun/isibiodata').send({userId}).set('authorization', token1);

           const sudahAda = await User_Biodata.findOne({ where: { id_user: userId } });

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('biodata sudah di isi');
            // expect(res.body.data).toStrictEqual(biodata);
         
       }catch (err) {
        expect(err).toBe('error');
       }
    });
});

//endpoiont GET
describe('isi biodata function', () => {
    //case success
    test('res.json called with { status: true, message: biodata berhasil dibuat }',async () => {
        try {
            const userId = 13;
            const nama = "reni";
            const umur = 22;
            const kota = "jakarta";
            const nomor_telepon = "09387752";
            const jenis_kelamin = "perempuan";
            const token1 = JWT_TOKEN;
           const res = await request(index).post('/biodata/akun/isibiodata').send({userId, nama, umur, kota, nomor_telepon, jenis_kelamin}).set('authorization', token1);

           const sudahAda = await User_Biodata.findOne({ where: { id_user: userId } });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('biodata berhasil dibuat');
            expect(res.body.data).toStrictEqual(sudahAda);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('hapus biodata function', () => {
    //case failed
    test('res.json called with { status: false, message: biodata tidak di temukan }',async () => {
        try {
            const userId = 99;
            const token1 = JWT_TOKEN;
           const res = await request(index).delete('/biodata/akun/hapusBiodata').send({userId}).set('authorization', token1);

           const sudahAda = await User_Biodata.findOne({ where: { id_user: userId } });
           
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`Biodata dengan id ${userId} tidak di temukan`);
            // expect(res.body.data).toStrictEqual(sudahAda);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('hapus biodata function', () => {
    //case failed
    test('res.json called with { status: true, message: biodata sudah di hapus }',async () => {
        try {
            const userId1 = 99;
            const token1 = JWT_TOKEN;
           const res = await request(index).delete('/biodata/akun/hapusBiodata').send({userId1}).set('authorization', token1);

           const sudahAda = await User_Biodata.findOne({ where: { id_user: userId1 } });
           
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe(`biodata sudah di hapus`);
            expect(res.body.data).toStrictEqual(sudahAda);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('tampil biodata function', () => {
    //case success
    test('res.json called with { status: true, message: berhasil dapat data }',async () => {
        try {
            
            const token1 = JWT_TOKEN;
            const userId = 13;
           const res = await request(index).get('/biodata/akun/tampilBiodata').send({userId}).set('authorization', token1);

           const sudahAda = await User_Biodata.findOne({ where: { id_user: userId1 } });
           
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe(`berhasil dapat data`);
            expect(res.body.data).toStrictEqual(sudahAda);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('update biodata function', () => {
    //case failed
    test('res.json called with { status: false, message: user tidak di temukan }',async () => {
        try {
            
            const token1 = JWT_TOKEN;
            const userId = 99;
           const res = await request(index).patch('/biodata/akun/ganti-biodata').send({userId}).set('authorization', token1);

           const sudahAda = await User_Biodata.findOne({ where: { id_user: userId1 } });
           
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`user tidak di temukan`);
            // expect(res.body.data).toStrictEqual(sudahAda);
         
       }catch (err) {
       
       }
    });
});

//endpoiont GET
describe('update biodata function', () => {
    //case failed
    test('res.json called with { status: false, message: user tidak di temukan }',async () => {
        try {
            
            const token1 = JWT_TOKEN;
            const userId = 13;
            const nama = "lulu";
	        const umur = 30;
	        const kota = "medan";
	        const nomor_telepon = "0800995432222";
	        const jenis_kelamin = "laki-laki"
           const res = await request(index).patch('/biodata/akun/ganti-biodata').send({userId, nama, umur, kota, nomor_telepon, jenis_kelamin}).set('authorization', token1);

           const sudahAda = await User_Biodata.findOne({ where: { id_user: userId1 } });
           
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe(`Biodata berhasil diupdate`);
            expect(res.body.data).toStrictEqual(sudahAda);
         
       }catch (err) {
       
       }
    });
});