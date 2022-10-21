const jsonToken = require('jsonwebtoken');
const request = require('supertest');
const index = require('../../index');
const { User_Games, User_Biodata, User_History } = require('../../models')

const {
    JWT_TOKEN,
} = process.env;

//endpoiont GET
describe('user get all function', () => {
    //case success
    test('res.json called with { status: true, message: berhasil dapat data }',async () => {
        try {
           const res = await request(index).get('/user/user');

           const users = await User_Games.findAll();

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('berhasil dapat data');
            expect(res.body.data).toStrictEqual(users);
         
       }catch (err) {
       
       }
    });
});

//endpoiont post
describe('user register function', () => {
    //case failed
    test('res.json called with { status: false, message: email sudah terpakai!!! }',async () => {
        try {
             const username = "fadil4";
            const email  = "fadil4@gmail.com";
            const password = "123456";
           const res = await request(index).post('/user/daftar').send({username, email, password});

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('email sudah terpakai!!!');
            // expect(res.body.data).toStrictEqual(users);
         
       }catch (err) {
        
       }
    });
});

//endpoiont post
describe('user register function', () => {
    //case success
    test('res.json called with { status: true, message: akun berhasil dibuat }',async () => {
        try {
            const username = "fadil4";
            const email  = "fadil4@gmail.com";
            const password = "123456";
           const res = await request(index).post('/user/daftar').send({username, email, password});

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('akun berhasil dibuat');
            expect(res.body.data).toStrictEqual({username, email, password});
         
       }catch (err) {
       
       }
    });
});

//endpoiont post
describe('user login function', () => {
    //case failed
    test('res.json called with { status: false, message: username atau email salah! }',async () => {
        try {
            const email  = "fadil99@gmail.com";
            const password = "123456";
           const res = await request(index).post('/user/masuk').send({email, password});

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('username atau email salah!');
            // expect(res.body.data).toStrictEqual({username, email, password});
         
       }catch (err) {
        
       }
    });
});

//endpoiont post
describe('user login function', () => {
    //case failed
    test('res.json called with { status: false, message: password salah!! }',async () => {
        try {
            const email  = "fadil4@gmail.com";
            const password = "123456789";
           const res = await request(index).post('/user/masuk').send({email, password});

        //    const usercompare = await User_Games.findOne({ where: { email: email }});
        //    const pass = await bcrypt.compare(req.body.password, usercompare.password);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('password salah!!');
            // expect(res.body.data).toStrictEqual({username, email, password});
         
       }catch (err) {
        
       }
    });
});

//endpoiont post
describe('user login function', () => {
    //case succes
    test('res.json called with { status: true, message: berhasil masuk }',async () => {
        try {
            const email  = "fadil4@gmail.com";
            const password = "123456";
           const res = await request(index).post('/user/masuk').send({email, password});

           const usercompare = await User_Games.findOne({ where: { email: email }});

        const token = JWT_TOKEN;

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('berhasil masuk');
            expect(res.body.data).toStrictEqual({
                
                    email: usercompare.email,
                    jwt_token: token
                
            });
         
       }catch (err) {
        
       }
    });
});

//endpoiont post
describe('user auth function', () => {
    //case failed
    test('res.json called with { status: failed, message: jwt malformed }',async () => {
        try {

            const token1  = "1234567";
            const res = await request(index).get('/user/akun').set('authorization', token1);
                
            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('jwt malformed');
            expect(res.body.data).toStrictEqual(null);
         
       }catch (err) {
        
       }
    });
});

//endpoiont post
describe('user auth function', () => {
    //case succes
    test('res.json called with { status: true, message: autentifikasi berhasil }',async () => {
        try {

            const token1  = JWT_TOKEN;
            const res = await request(index).get('/user/akun').set('authorization', token1);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('autentifikasi berhasil');
            expect(res.body.data).toStrictEqual(token1);
         
       }catch (err) {
        
       }
    });
});

//endpoiont delete
describe('user auth function', () => {
    //case failed
    test('res.json called with { status: false, message: user gagal di hapus }',async () => {
        try {

            const userId  = 2000;
            const res = await request(index).delete(`/user/hapus/${userId}`).send({userId});
                
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`User dengan id ${userId} tidak di temukan!`);
            // expect(res.body.data).toStrictEqual(token1);
         
       }catch (err) {
        
       }
    });
});

//endpoiont delete
describe('user auth function', () => {
    //case success
    test('res.json called with { status: true, message: data user telah berhasil di hapus }',async () => {
        try {

            const userId  = 126;
            const res = await request(index).delete(`/user/hapus/${userId}`).send({userId});
                
            const user = await (User_Games).findOne({ where: { id: userId } });
        
            await User_Games.destroy({ where: { id: userId }});
            await User_Biodata.destroy({where: { id_user : userId}});
            await User_History.destroy({where: { id_user : userId}});

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe(`data user telah berhasil di hapus`);
            expect(res.body.data).toStrictEqual({user});
         
       }catch (err) {
        
       }
    });
});

//endpoiont get
describe('get user by id function', () => {
    //case failed
    test('res.json called with { status: false, message: data tidak berhasil ditemukan}',async () => {
        try {

            const userId  = 126;
            const res = await request(index).get(`/user/detil/${userId}`).send({userId});
                
            const user = await (User_Games).findOne({ where: { id: userId } });

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`User dengan id ${userId} tidak ditemukan`);
            // expect(res.body.data).toStrictEqual({user});
         
       }catch (err) {
        
       }
    });
});

//endpoiont get
describe('get user by id function', () => {
    //case success
    test('res.json called with { status: true, message: data berhasil ditemukan}',async () => {
        try {

            const userId  = 8;
            const res = await request(index).get(`/user/detil/${userId}`).send({userId});
                
            const user = await (User_Games).findOne({ where: { id: userId } });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe(`data berhasil ditemukan`);
            expect(res.body.data).toStrictEqual({user})
         
       }catch (err) {
        
       }
    });
});

//endpoiont get
describe('get user by id function', () => {
    //case success
    test('res.json called with { status: failed, message: user tidak di temukan!}',async () => {
        try {

            const userId  = 8;
            const res = await request(index).get(`/user/detil/${userId}`).send({userId});
                
            const user = await (User_Games).findOne({ where: { id: userId } });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe(`data berhasil ditemukan`);
            expect(res.body.data).toStrictEqual({user})
         
       }catch (err) {
        
       }
    });
});

//endpoiont patch
describe('ganti password function', () => {
    //case failed
    test('res.json called with { status: false, message: password salah!!}',async () => {
        try {
            const token1  = JWT_TOKEN;
            const userId  = 13;
            const passwordLama = "654321";
             const passwordBaru = "123reni1";
            const passwordBaru2 = "123reni1";

            const res = await request(index).patch('/user/ganti-password').send({userId, passwordLama, passwordBaru, passwordBaru2}).set('authorization', token1);
                
            const user = await (User_Games).findOne({ where: { id: userId } });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`password salah!!`);
            // expect(res.body.data).toStrictEqual({user})
         
       }catch (err) {
        
       }
    });
});

//endpoiont patch
describe('ganti password function', () => {
    //case failed
    test('res.json called with { status: false, message: password 1 dan password 2 tidak sama!}',async () => {
        try {
            const token1  = JWT_TOKEN;
            const userId  = 13;
            const passwordLama = "123reni";
             const passwordBaru = "123reni1";
            const passwordBaru2 = "123reni2";

            const res = await request(index).patch('/user/ganti-password').send({userId, passwordLama, passwordBaru, passwordBaru2}).set('authorization', token1);
                
            const user = await (User_Games).findOne({ where: { id: userId } });

            expect(res.statusCode).toBe(422);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`password 1 dan password 2 tidak sama!`);
            // expect(res.body.data).toStrictEqual({user})
         
       }catch (err) {
        
       }
    });
});

//endpoiont patch
describe('ganti password function', () => {
    //case failed
    test('res.json called with { status: status: true, message: Password berhasil di ubah}',async () => {
        try {
            const token1  = JWT_TOKEN;
            const userId  = 13;
            const passwordLama = "123reni";
            const passwordBaru = "123reni";
            const passwordBaru2 = "123reni";

            const res = await request(index).patch('/user/ganti-password').send({userId, passwordLama, passwordBaru, passwordBaru2}).set('authorization', token1);
                
            const user = await (User_Games).findOne({ where: { id: userId } });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            // expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe(`Password berhasil di ubah`);
            // expect(res.body.data).toStrictEqual({user})
         
       }catch (err) {
        
       }
    });
});

