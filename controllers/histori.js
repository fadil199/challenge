const { User_History } = require('../models');
const bcrypt = require('bcrypt');
const jsonToken = require('jsonwebtoken');

const {
    JWT_TOKEN,
} = process.env;

module.exports = {
    isiGame: async (req, res, next) => {
        try {
            const { id_user, username, nama_game, nilai } = req.body;

           
            const isi = await User_History.create({
                id_user: 13,
                username: "reni",
                nama_game: "mario kart",
                nilai: 100
            })

            return res.status(201).json({
                status: true,
                message: 'history game berhasil dibuat',
                data: {
                    idUser: isi.id_user,
                    nama: isi.username,
                    nama_game: isi.nama_game,
                    nilai: isi.nilai
                }
            })

        }catch (err) {
            
        }
    },

    tampilGameSaya: async (req, res, next) => {
        
        try { 
            const id = 13;
            const user = await User_History.findAll({ where: { id_user: id} });
            if (!user) return res.status(404).json({ success: false, message: `Biodata dengan id ${id} tidak di temukan` });
 
 
         return res.status(200).json({
             status: true,
             message: 'berhasil dapat data',
             data: user
         })
     }catch (err) {
         
     }  
    },

    updateIsiGame: async (req, res, next) => {
        try {
            const { nama_game, nilai } = req.body;

            const { gameId } = req.params;

            const updateGame = await User_History.findOne({ where: { id: gameId }});
            if (!updateGame) {
                return res.status(400).json({
                    status: false,
                    message: 'game tidak di temukan'
                })
            }

            const bio = await updateGame.update({
                nama_game,
                nilai
            });

            return res.status(200).json({
                status: true,
                message: 'Histori game berhasil diupdate',
                data: {
                    nama_game: bio.nama_game,
                    nilai: bio.nilai
                }
            });
        } catch (err) {
            res.status(500).json({status: false, message: err.message});
        }
    },

    hapusGame: async (req, res, next) => {
        try {
            const { gameId } = req.params;
            const user = await User_History.findOne({ where: { id: gameId } });
                if (!user) return res.status(404).json({ status: false, message: `game dengan id ${gameId} tidak di temukan` });
    
             await User_History.destroy({ where: { id: gameId }});
    
            return res.status(200).json({
                status: true,
                message: 'game telah di hapus',
                data: user
            })
        } catch (err) {
            
        }
    },

    tampilSeluruhGameUser: async (req, res, next) => {
        try { 
            const users = await User_History.findAll();
    
        
 
 
         return res.status(200).json({
             status: true,
             message: 'berhasil dapat data',
             data: users
         })
     }catch (err) {
         
     }  
    }
}