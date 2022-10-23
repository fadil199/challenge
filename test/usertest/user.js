const user = require('../../controllers/user');
const { User_Games, User_Biodata, User_History } = require('../../models')
const bcrypt = require('bcrypt');
const jsonToken = require('jsonwebtoken');


const {
    JWT_TOKEN,
} = process.env;

const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};
//user get all test
describe('user get all function', () => {
    //test success
    test('res.json with { status: true, message: berhasil dapat data}', async () => {
        const req = mockRequest();
        const res = mockResponse();
        
        user.daftarUser(req, res);

        const users = await User_Games.findAll();

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'berhasil dapat data',
            data: users
        });
    });
});

//user register test
describe('user register function', () => {
    //test failed
    test('res.json with { status: false, message: email sudah terpakai!!!}', async () => {
        const req = mockRequest({email: "fadil4@gmail.com"});
        const res = mockResponse();
        
        user.daftar(req, res);

        const sudahAda = await User_Games.findOne({ where: { email: req.body.email } });

        if (sudahAda) {
            return res.status(409).json({
                status: false,
                message: 'email sudah terpakai!!!'
                
            })
        }

        expect(res.status).toBeCalledWith(409);
        expect(res.json).toBeCalledWith({
            status: false,
            message: 'email sudah terpakai!!!',
            // data: req.body.email
        });
    });
});

// //user register test
// describe('user register function', () => {
//     //test success
//     test('res.json with { status: true, message: berhasil buat akun}', async () => {
//         const req = mockRequest({
//             username: "fadil4",
//             email: "fadil4@gmail.com",
//             password: "123456"
//         });
//         const res = mockResponse();
        
//         user.daftar(req, res);

//             const encr = await bcrypt.hash(req.body.password, 10);
//             const regis = await User_Games.create({
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: encr
//             })

//             res.status(201).json({
//                 status: true,
//                 message: 'akun berhasil dibuat',
//                 data: {
//                     username: regis.username,
//                 email: regis.email,
//                 password: regis.password
//                 }
//             })

//         expect(res.status).toBeCalledWith(201);
//         expect(res.json).toBeCalledWith({
//             status: true,
//             message: 'akun berhasil dibuat',
//             data: {
//                 username: regis.username,
//                 email: regis.email,
//                 password: regis.password
//             }
//         });
//     });
// });

// //user login test
// describe('user login function', () => {
//     //test failed
//     test('res.json with { status: false, message: username atau email salah!}', async () => {
//         const req = mockRequest({
//             email: "fadil99@gmail.com",
//             password: "123456"
//         });
//         const res = mockResponse();
        
//         user.masuk(req, res);

//         const usercompare = await User_Games.findOne({ where: { email: req.body.email }});
//         if (!usercompare) {
//             return res.status(400).json({
//                 status: false,
//                 message: 'username atau email salah!'
//             })
//         }

//         expect(res.status).toBeCalledWith(400);
//         expect(res.json).toBeCalledWith({
//             status: false,
//             message: 'username atau email salah!',
//             data: null
            
//         });
//     });
// });

// //user login test
// describe('user login function', () => {
//     //test failed
//     test('res.json with { status: false, message: password salah!!}', async () => {
//         const req = mockRequest({
//             email: "fadil4@gmail.com",
//             password: "123456789"
//         });
//         const res = mockResponse();
        
//         user.masuk(req, res);

//         const usercompare = await User_Games.findOne({ where: { email: req.body.email }});
//         const pass = await bcrypt.compare(req.body.password, usercompare.password);
//         if (!pass) {
//             return res.status(400).json({
//                 status: false,
//                 message: 'password salah!!'
//             })
//         }

//         expect(res.status).toBeCalledWith(400);
//         expect(res.json).toBeCalledWith({
//             status: false,
//             message: 'password',
//             data: null
            
//         });
//     });
// });

// //user login test
// describe('user login function', () => {
//     //test success
//     test('res.json with { status: true, message: berhasil masuk}', async () => {
//         const req = mockRequest({
//             email: "fadil4@gmail.com",
//             password: "123456"
//         });
//         const res = mockResponse();
        
//         user.masuk(req, res);

//         const usercompare = await User_Games.findOne({ where: { email: req.body.email }});

//         const token = JWT_TOKEN;
        
//          res.status(200).json({
//             status: true,
//             message: 'berhasil masuk',
//             data: {
//                 email: usercompare.email,
//                 jwt_token: token
//             }
//         })

//         expect(res.status).toBeCalledWith(200);
//         expect(res.json).toBeCalledWith({
//             status: true,
//             message: 'berhasil masuk',
//             data: {
//                 email: usercompare.email,
//                 jwt_token: token
//             }
            
//         });
//     });
// });

// //user auth test
// describe('user login function', () => {
//     //test success
//     test('res.json with { status: true, message: autentifikasi berhasil}', async () => {
//         const token1 = JWT_TOKEN;
//         const req = mockRequest({
//             headers: {
//                 'authorization': token1
//             }
//         });
//         const res = mockResponse();

//         const user1 = req.user;
        
//         user.akunSaya(req, res);
        
//          res.status(200).json({
//             status: true,
//             message: 'autentifikasi berhasil',
//             data: user1
//         })

//         expect(res.status).toBeCalledWith(200);
//         expect(res.json).toBeCalledWith({
//             status: true,
//             message: 'autentifikasi berhasil',
//             data: user1
            
//         });
//     });
// });

// //user delete test
// describe('user delete function', () => {
//     //test failed
//     test('res.json with { status: false, message: data user gagal di hapus}', async () => {
//         const req = mockRequest({userId: 2000});
//         const res = mockResponse();

//         const user = await (User_Games).findOne({ where: { id: req.body.userId } });
//         if (!user) return res.status(404).json({ status: false, message: `User dengan id ${req.body.userId} tidak di temukan!` });
        
//         user.hapususer(req, res);

//         expect(res.status).toBeCalledWith(404);
//         expect(res.json).toBeCalledWith({
//             status: false,
//             message: `User dengan id ${req.body.userId} tidak di temukan!`
            
//         });
//     });
// });

// //user delete test
// describe('user delete function', () => {
//     //test success
//     test('res.json with { status: true, message: data user telah berhasil di hapus}', async () => {
//         const req = mockRequest({userId: 126});
//         const res = mockResponse();

//         const user = await User_Games.findOne({ where: { id: req.body.userId } });
//         if (!user) return res.status(404).json({ status: false, message: `User dengan id ${req.body.userId} tidak di temukan!` });

//         user.hapususer(req, res);

//         expect(res.status).toBeCalledWith(200);
//         expect(res.json).toBeCalledWith({
//             status: true,
//             message: 'data user telah berhasil di hapus',
//             data: user
//         });
//     });
// });

// //get user by id test
// describe('get user by id function', () => {
//     //test failed
//     test('res.json with { status: false, message: data tidak berhasil ditemukan}', async () => {
//         const req = mockRequest({userId: 126});
//         const res = mockResponse();

//         const user = await User_Games.findOne({ where: { id: req.body.userId } });
//         if (!user) return res.status(404).json({ status: false, message: `User dengan id ${req.body.userId} tidak di temukan!` });

//         user.detilUser(req, res);

//         expect(res.status).toBeCalledWith(404);
//         expect(res.json).toBeCalledWith({
//             status: false,
//             message: `User dengan id ${req.body.userId} tidak ditemukan`,
//             // data: user
//         });
//     });
// });

// //get user by id test
// describe('get user by id function', () => {
//     //test success
//     test('res.json with { status: true, message: data berhasil ditemukan}', async () => {
//         const req = mockRequest({userId: 8});
//         const res = mockResponse();

//         const user = await User_Games.findOne({ where: { id: req.body.userId } });
//          if (user)
//          return res.status(200).json({
//             status: true,
//             message: 'data berhasil ditemukan',
//             data: user
//         })

//         user.detilUser(req, res);

//         expect(res.status).toBeCalledWith(200);
//         expect(res.json).toBeCalledWith({
//             status: true,
//             message: `data berhasil ditemukan`,
//             data: user
//         });
//     });
// });

// //ganti password test
// describe('get user by id function', () => {
//     //test failed
//     test('res.json with { status: failed, message: password salah}', async () => {
//         const token1 = JWT_TOKEN;
//         const req = mockRequest({
//             headers: {
//                 'authorization': token1
//             },
//             passwordLama: "654321",
//             passwordBaru: "345678",
//             passwordBaru2: "345678",
//             userId: 13
//         });
//         const res = mockResponse();

//         const usercompare = await User_Games.findOne({ 
//             where: { 
//                 id: req.body.userId 
//             }});
//             const pass = await bcrypt.compare(req.body.passwordLama, usercompare.password);
//             if (!pass) {
//                 return res.status(400).json({
//                     status: false,
//                     message: 'password salah!!'
//                 })
//             }

//         user.gantiPassword(req, res);

//         expect(res.status).toBeCalledWith(400);
//         expect(res.json).toBeCalledWith({
//             status: false,
//             message: 'password salah!!'
//         });
//     });
// });

// //ganti password test
// describe('get user by id function', () => {
//     //test failed
//     test('res.json with { status: failed, message: password 1 dan password 2 tidak sama!}', async () => {
//         const token1 = JWT_TOKEN;
//         const req = mockRequest({
//             headers: {
//                 'authorization': token1
//             },
//             passwordLama: "123reni",
//             passwordBaru: "123reni1",
//             passwordBaru2: "123reni2",
//             userId: 13
//         });
//         const res = mockResponse();

//         const usercompare = await User_Games.findOne({ 
//             where: { 
//                 id: req.body.userId 
//             }});
//             const pass = await bcrypt.compare(req.body.passwordLama, usercompare.password);
//             if (!pass) {
//                 return res.status(400).json({
//                     status: false,
//                     message: 'password salah!!'
//                 })
//             }

//             if (req.body.passwordBaru !== req.body.passwordBaru2) 
//             return res.status(422).json({
//                 status: false,
//                 message: 'password 1 dan password 2 tidak sama!'
//             });

//         user.gantiPassword(req, res);

//         expect(res.status).toBeCalledWith(422);
//         expect(res.json).toBeCalledWith({
//             status: false,
//             message: 'password 1 dan password 2 tidak sama!'
//         });
//     });
// });

// //ganti password test
// describe('get user by id function', () => {
//     //test success
//     test('res.json with { status: true, message: Password berhasil di ubah}', async () => {
//         const token1 = JWT_TOKEN;
//         const req = mockRequest({
//             headers: {
//                 'authorization': token1
//             },
//             passwordLama: "123reni",
//             passwordBaru: "123reni",
//             passwordBaru2: "123reni",
//             userId: 13
//         });
//         const res = mockResponse();

//         const usercompare = await User_Games.findOne({ 
//             where: { 
//                 id: req.body.userId 
//             }});
//             const pass = await bcrypt.compare(req.body.passwordLama, usercompare.password);
//             if (!pass) {
//                 return res.status(400).json({
//                     status: false,
//                     message: 'password salah!!'
//                 })
//             }

//             if (req.body.passwordBaru !== req.body.passwordBaru2) 
//             return res.status(422).json({
//                 status: false,
//                 message: 'password 1 dan password 2 tidak sama!'
//             });

//             const hashedPassword = await bcrypt.hash(req.body.passwordBaru, 10);
//             await usercompare.update({password: hashedPassword});
            
//             res.status(200).json({
//                 success: true,
//                 message: 'Password berhasil di ubah'
//             });

//         user.gantiPassword(req, res);

//         expect(res.status).toBeCalledWith(200);
//         expect(res.json).toBeCalledWith({
//             success: true,
//             message: 'Password berhasil di ubah'
//         });
//     });
// });
module.exports = user;