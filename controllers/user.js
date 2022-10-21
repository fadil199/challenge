const { User_Games, User_Biodata, User_History } = require('../models');
const bcrypt = require('bcrypt');
const jsonToken = require('jsonwebtoken');


const {
    JWT_TOKEN,
} = process.env;

module.exports = {
    index: (req, res) => {
        return res.status(200).json({
            status: true,
            message: 'hello world!'
        })
    },
    daftar: async (req, res, next) => {
        
        try {
            const { 
                username= "fadil4",
                email= "fadil4@gmail.com",
                password= "123456" 
            } = req.body;

            const sudahAda = await User_Games.findOne({ where: { email: email } });
            if (sudahAda) {
                return res.status(409).json({
                    status: false,
                    message: 'email sudah terpakai!!!'
                    
                })
            }

            const encr = await bcrypt.hash(password, 10);
            const regis = await User_Games.create({
                username,
                email,
                password: encr
            })

            return res.status(201).json({
                status: true,
                message: 'akun berhasil dibuat',
                data: {
                    username: regis.username,
                    email: regis.email,
                    password: regis.password
                }
            })

        }catch (err) {
            console.log(err);
        }
    },

    masuk: async (req, res, next) => {

        try {
        const { email, password } = req.body;

        

        const usercompare = await User_Games.findOne({ where: { email: email }});
        if (!usercompare) {
            return res.status(400).json({
                status: false,
                message: 'username atau email salah!'
            })
        }

        const pass = await bcrypt.compare(password, usercompare.password);
        if (!pass) {
            return res.status(400).json({
                status: false,
                message: 'password salah!!'
            })
        }
        
        return res.status(200).json({
            status: true,
            message: 'berhasil masuk',
            data: {
                email: usercompare.email,
                jwt_token: JWT_TOKEN
            }
        })


        }catch (err) {
           
        }
    },

    akunSaya: (req, res, next) => {
        const user = req.user;
        
        try {
            return res.status(200).json({
                status: true,
                message: 'autentifikasi berhasil',
                data: user
            });
        }catch (err) {
            next(err);
        }
    },

    gantiPassword: async (req, res, next) => {

        try {
            const { 
                 passwordLama,
                 passwordBaru,
                 passwordBaru2
            } = req.body;

            const usercompare = await User_Games.findOne({ 
                where: { 
                    id: 152
                }});
            if (!usercompare) {
                return res.status(400).json({
                    status: false,
                    message: 'user tidak di temukan!'
                })
            }
    
            const pass = await bcrypt.compare(passwordLama, usercompare.password);
            if (!pass) {
                return res.status(400).json({
                    status: false,
                    message: 'password salah!!'
                })
            }

            if (passwordBaru !== passwordBaru2) 
            return res.status(422).json({
                status: false,
                message: 'password 1 dan password 2 tidak sama!'
            });

            const hashedPassword = await bcrypt.hash(passwordBaru, 10);
             await usercompare.update({password: hashedPassword});

            return res.status(200).json({
                success: true,
                message: 'Password berhasil di ubah'
            });
        } catch (err) {
            res.status(500).json({
                status: false, 
                message: err.message
            });
        }
    },

    hapususer: async (req, res, next) => {
        try {
        const { userId } = req.params;
        // ini akan menghapus user, histori game, dan biodata berdasarkan id
        const user = await User_Games.findOne({ where: { id: userId } });
            if (!user) return res.status(404).json({ status: false, message: `User dengan id ${userId} tidak di temukan!` });
        
            await User_Games.destroy({ where: { id: userId }});
            await User_Biodata.destroy({where: { id_user : userId}});
            await User_History.destroy({where: { id_user : userId}});

        return res.status(200).json({
            status: true,
            message: 'data user telah berhasil di hapus',
            data: user
        })
    } catch (err) {
       
    }

    },

    daftarUser: async  (req, res, next) => {
        
        try { 
           const users = await User_Games.findAll();

        return res.status(200).json({
            status: true,
            message: 'berhasil dapat data',
            data: users
        })
    }catch (err) {
        
    }  
    },

    detilUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await User_Games.findOne({ where: { id: userId } });
                if (!user) return res.status(404).json({ status: false, message: `User dengan id ${userId} tidak ditemukan` });
    
            return res.status(200).json({
                status: true,
                message: 'data berhasil ditemukan',
                data: user
            })
        } catch (err) {
            
        }
    }
}