const histori = require('../../controllers/histori');
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
describe('histori get all function', () => {
    //test success
    test('res.json with { status: true, message: berhasil dapat data}', async () => {
        const req = mockRequest();
        const res = mockResponse();
        
        histori.tampilSeluruhGameUser(req, res);

        const histori1 = await User_History.findAll();

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'berhasil dapat data',
            data: histori1
        });
    });
});

//user get all test
describe('isi game function', () => {
    //test success
    test('res.json with { status: true, message: history game berhasil dibuat}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            id_user: 13,
            username: "reni",
            nama_game: "mario kart",
            nilai: 100
        });
        const res = mockResponse();
        
        histori.isiGame(req, res);

         res.status(201).json({
            status: true,
            message: 'history game berhasil dibuat',
            data: {
                idUser: req.body.id_user,
                nama: req.body.username,
                nama_game: req.body.nama_game,
                nilai: req.body.nilai
            }
        })
        

        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'history game berhasil dibuat',
            data: {
                idUser: req.body.id_user,
                nama: req.body.username,
                nama_game: req.body.nama_game,
                nilai: req.body.nilai
            }
        });
    });
});

//user get all test
describe('tampil game saya function', () => {
    //test success
    test('res.json with { status: true, message: berhasil dapat data}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            id_user: 13
        });
        const res = mockResponse();
        
        histori.tampilGameSaya(req, res);

        const histori1 = await User_History.findAll({ where: { id_user: req.body.id_user} });

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'berhasil dapat data',
            data: histori1
        });
    });
});

//user get all test
describe('update game saya function', () => {
    //test failed
    test('res.json with { status: false, message: game tidak di temukan}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            id_user: 100
        });
        const res = mockResponse();
        
        histori.updateIsiGame(req, res);

        const updateGame = await User_History.findOne({ where: { id: req.body.id_user }});
        if (!updateGame) {
            return res.status(400).json({
                status: false,
                message: 'game tidak di temukan'
            })
        }

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            status: false,
            message: 'game tidak di temukan'
        });
    });
});

//user get all test
describe('update game saya function', () => {
    //test success
    test('res.json with { status: true, message: Histori game berhasil diupdate}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            id_user: 18,
            nama_game: "pes 2022",
            nilai: 90
        });
        const res = mockResponse();
        
        histori.updateIsiGame(req, res);

        const updateGame = await User_History.findOne({ where: { id: req.body.id_user }});
        if (updateGame) {
            return res.status(200).json({
                success: true,
                message: 'Histori game berhasil diupdate',
                data: {
                    nama_game: req.body.nama_game,
                    nilai: req.body.nilai
                }
            })
        }

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'Histori game berhasil diupdate',
            data: {
                nama_game: req.body.nama_game,
                nilai: req.body.nilai
            }
        });
    });
});

//user get all test
describe('hapus game saya function', () => {
    //test failed
    test('res.json with { status: false, message: game gagal di hapus}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            id_user: 99
        });
        const res = mockResponse();
        
        histori.hapusGame(req, res);

        const updateGame = await User_History.findOne({ where: { id: req.body.id_user }});
        if (!updateGame) return res.status(404).json({ 
            status: false,
            message: `game dengan id ${req.body.id_user} tidak di temukan` 
        });

        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({
            status: false,
            message: `game dengan id ${req.body.id_user} tidak di temukan`,
            
        });
    });
});

//user get all test
describe('hapus game saya function', () => {
    //test success
    test('res.json with { status: true, message: game telah di hapus}', async () => {
        const token1 = JWT_TOKEN;
        const req = mockRequest({
            headers: {
                'authorization': token1
            },
            id_user: 36
        });
        const res = mockResponse();
        
        histori.hapusGame(req, res);

        const updateGame = await User_History.findOne({ where: { id: req.body.id_user }});
        if (!updateGame) return res.status(404).json({ status: false, message: `game dengan id ${req.body.id_user} tidak di temukan` });

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'game telah di hapus',
            data: updateGame
            
        });
    });
});