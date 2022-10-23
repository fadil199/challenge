const { User_Biodata } = require('../models');
const bcrypt = require('bcrypt');
const jsonToken = require('jsonwebtoken');

const {
    JWT_TOKEN,
} = process.env;

module.exports = {
    isiBiodata: async (req, res, next) => {
        
        try {
            const { id_user, nama, umur, kota,  nomor_telepon, jenis_kelamin } = req.body;

            const sudahAda = await User_Biodata.findOne({ where: { id_user: 13 } });
            if (sudahAda) {
                return res.status(409).json({
                    status: false,
                    message: 'biodata sudah di isi'
                })
            }

            const isi = await User_Biodata.create({
                id_user: 13,
                nama: req.user.username,
                umur,
                kota,
                nomor_telepon,
                jenis_kelamin
            })

            return res.status(201).json({
                status: true,
                message: 'biodata berhasil dibuat',
                data: {
                    idUser: isi.id_user,
                    nama: isi.nama,
                    umur: isi.umur,
                    kota: isi.kota,
                    Nomor_Telepon: isi.nomor_telepon,
                    Jenis_Kelamin: isi.jenis_kelamin
                }
            })

        }catch (err) {
           next(err);
        }
    },

    hapusBiodata: async (req, res, next) => {

        try {
            const userId = 99;
            const userId1 = 13;
        const user = await User_Biodata.findOne({ where: { id_user: userId } });
            if (!user) return res.status(404).json({ status: false, message: `Biodata dengan id ${userId} tidak di temukan` });

         await User_Biodata.destroy({ where: { id_user: userId1 }});

        return res.status(200).json({
            status: 'success',
            message: 'biodata sudah di hapus',
            data: user
        })
    } catch (err) {
        next(err);
    }

    },

     tampilBiodata: async (req, res, next) => {
        
        try { 
            const userId = 13
            const id = User_Biodata.id_user;
            const user = await User_Biodata.findOne({ where: { id_user: userId} });
            if (!user) return res.status(404).json({ success: false, message: `Biodata dengan id ${userId} tidak di temukan` });
 
 
         return res.status(200).json({
             status: true,
             message: 'berhasil dapat data',
             data: user
         })
     }catch (err) {
        next(err);
     }  
    },

    tampilSeluruhBiodata: async (req, res, next) => {
        try { 
            const users = await User_Biodata.findAll();
 
 
         return res.status(200).json({
             status: true,
             message: 'berhasil dapat data',
             data: users
         })
     }catch (err) {
        next(err);
     }  
    },

    updateBiodata: async (req, res, next) => {
        try {
            const { nama, kota, nomor_telepon, jenis_kelamin, umur } = req.body;

            const usercompare = await User_Biodata.findOne({ where: { id_user: 99 }});
            if (!usercompare) {
                return res.status(400).json({
                    status: false,
                    message: 'user tidak di temukan'
                })
            }

            const bio = await usercompare.update({
                nama,
                umur,
                kota,
                nomor_telepon,
                jenis_kelamin
            });

            return res.status(200).json({
                success: true,
                message: 'Biodata berhasil diupdate',
                data: {
                    nama: bio.nama,
                    umur: bio.umur,
                    kota: bio.kota,
                    nomor_telepon: bio.nomor_telepon,
                    jenis_kelamin: bio.jenis_kelamin
                }
            });
        } catch (err) {
            res.status(500).json({status: false, message: err.message});
        }
    }
}