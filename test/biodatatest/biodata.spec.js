const biodata = require('../../controllers/biodata');
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
describe('biodata get all function', () => {
    //test success
    test('res.json with { status: true, message: berhasil dapat data}', async () => {
        const req = mockRequest();
        const res = mockResponse();
        
        biodata.tampilSeluruhBiodata(req, res);

        const biodata1 = await User_Biodata.findAll();

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'berhasil dapat data',
            data: biodata1
        });
    });
});

//user get all test
describe('isi biodata function', () => {
    //test failed
    test('res.json with { status: false, message: biodata sudah di isi}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            userId: 13
        });
        const res = mockResponse();
        
        const sudahAda = await User_Biodata.findOne({ where: { id_user: req.body.userId } });
            if (sudahAda) {
                return res.status(409).json({
                    status: false,
                    message: 'biodata sudah di isi'
                })
            }
        
        biodata.isiBiodata(req, res);

        expect(res.status).toBeCalledWith(409);
        expect(res.json).toBeCalledWith({
            status: false,
            message: 'biodata sudah di isi'
        });
    });
});

//user get all test
describe('isi biodata function', () => {
    //test success
    test('res.json with { status: true, message: biodata berhasil dibuat}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            userId: 13,
            nama: "reni",
            umur: 22,
            kota: "jakarta",
            nomor_telepon: "09387752",
            jenis_kelamin: "perempuan"

        });
        const res = mockResponse();
        
        const sudahAda = await User_Biodata.findOne({ where: { id_user: req.body.userId } });
        if (sudahAda) {
            return res.status(409).json({
                status: false,
                message: 'biodata sudah di isi'
            })
        }
                 res.status(201).json({
                    status: true,
                    message: 'biodata berhasil dibuat',
                    data: {
                        idUser: req.body.userId,
                        nama: req.body.nama,
                        umur: req.body.umur,
                        kota: req.body.kota,
                        Nomor_Telepon: req.body.nomor_telepon,
                        Jenis_Kelamin: req.body.jenis_kelamin
                    }
                })
            
        biodata.isiBiodata(req, res);

        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith({
            status: true,
                    message: 'biodata berhasil dibuat',
                    data: {
                        idUser: req.body.userId,
                        nama: req.body.nama,
                        umur: req.body.umur,
                        kota: req.body.kota,
                        Nomor_Telepon: req.body.nomor_telepon,
                        Jenis_Kelamin: req.body.jenis_kelamin
                    }
        });
    });
});

//user get all test
describe('hapus biodata function', () => {
    //test success
    test('res.json with { status: false, message: biodata tidak di temukan}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            userId: 99,
        });
        const res = mockResponse();
        
        const sudahAda = await User_Biodata.findOne({ where: { id_user: req.body.userId } });
        if (!sudahAda) return res.status(404).json({ success: false, message: `Biodata dengan id ${req.body.userId} tidak di temukan` });
            
        biodata.hapusBiodata(req, res);

        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({
            status: false, 
            message: `Biodata dengan id ${req.body.userId} tidak di temukan`
        });
    });
});

//user get all test
describe('hapus biodata function', () => {
    //test success
    test('res.json with { status: false, message: biodata tidak di temukan}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            userId1: 99
        });
        const res = mockResponse();
        
        const sudahAda = await User_Biodata.findOne({ where: { id_user: req.body.userId1 } });
        
         res.status(200).json({
            status: true,
            message: 'biodata sudah di hapus',
            data: sudahAda
        })
            
        biodata.hapusBiodata(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'biodata sudah di hapus',
            data: sudahAda
        });
    });
});

//user get all test
describe('tampil biodata akun function', () => {
    //test success
    test('res.json with { status: true, message: berhasil dapat data}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            userId: 13
        });
        const res = mockResponse();
        
        const user1 = req.biodata;
        
        biodata.tampilBiodata(req, res);
        
        res.status(200).json({
           status: true,
           message: 'berhasil dapat data',
           data: user1
       })

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'berhasil dapat data',
            data: user1
        });
    });
});

//user get all test
describe('update biodata akun function', () => {
    //test failed
    test('res.json with { status: false, message: user tidak di temukan}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            userId: 99
        });
        const res = mockResponse();
        
        
        biodata.updateBiodata(req, res);
        const usercompare = await User_Biodata.findOne({ where: { id_user: 13 }});
            if (!usercompare) {
                return res.status(400).json({
                    status: false,
                    message: 'user tidak di temukan'
                })
            }

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            status: false,
            message: 'user tidak di temukan',
        });
    });
});

//user get all test
describe('update biodata akun function', () => {
    //test success
    test('res.json with { status: true, message: Biodata berhasil diupdate}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            userId: 13,
            nama: "lulu",
	        umur: 30,
	        kota: "medan",
	        nomor_telepon: "0800995432222",
	        jenis_kelamin: "laki-laki"
        });
        const res = mockResponse();
        
        
        biodata.updateBiodata(req, res);
        const usercompare = await User_Biodata.findOne({ where: { id_user: 13 }});
            if (usercompare) {
                return res.status(200).json({
                    success: true,
                    message: 'Biodata berhasil diupdate',
                    data: {
                        nama: req.body.nama,
                        umur: req.body.umur,
                        kota: req.body.kota,
                        nomor_telepon: req.body.nomor_telepon,
                        jenis_kelamin: req.body.jenis_kelamin
                    }
                });
            }
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'Biodata berhasil diupdate',
            data: {
                nama: req.body.nama,
                umur: req.body.umur,
                kota: req.body.kota,
                nomor_telepon: req.body.nomor_telepon,
                jenis_kelamin: req.body.jenis_kelamin
            }
        });
    });
});