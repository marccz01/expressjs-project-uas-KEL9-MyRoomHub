import mongoose from "mongoose";
import movieModel from "../models/movieModel.js";

export const booking = async (req, res) => {
    try {
        // Hanya menampilkan movie milik user yang sedang login
        const booking = await bookingModel.find({
            createdBy: req.user?.user_id
        }).sort({createdAt: -1});

        res.status(200).json({
            message: "Daftar semua booking",
            data: booking
        })

    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null
        });
    }
};

export const addNewBooking = async (req, res) => {
    try {
        const { tempat, namaRuangan, waktu, statusPemesanan } = req.body;

        if (!tempat || !namaRuangan || !waktu || !statusPemesanan) {
            return res.status(400).json({
                message: "Semua field (tempat, namaRuangan, waktu, statusPemesanan) wajib diisi",
                data: null
            });
        }

        // Menyimpan user_id pembuat ke database
        const booking = await bookingModel.create({
            tempat,
            namaRuangan,
            waktu,
            statusPemesanan,
            createdBy: req.user?.user_id
        });

        res.status(201).json({
            message: "Berhasil menambahkan booking baru",
            data: booking
        });

    } catch (error) {
        return res.status(500).json({
            message: "Gagal menambahkan booking baru",
            error: error.message,
            data: null
        });
    }
};

export const detailBooking = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID tidak valid",
                data: null
            });
        }

        const booking = await bookingModel.findOne({
            _id: id,
            createdBy: req.user?.user_id
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking tidak ditemukan",
                data: null
            });
        }

        return res.status(200).json({
            message: "Detail booking",
            data: booking
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null
        });
    }
}

export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { tempat, namaRuangan, waktu, statusPemesanan } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID tidak valid",
                data: null
            });
        }

        const updatedBooking = await bookingModel.findOneAndUpdate(
            {
                _id: id,
                createdBy: req.user?.user_id
            },
            { tempat, namaRuangan, waktu, statusPemesanan },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                message: "Booking tidak ditemukan atau akses ditolak",
                data: null
            });
        }

        return res.status(200).json({
            message: "Berhasil mengupdate booking",
            data: updatedBooking
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null
        });
    }
}

export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID tidak valid",
                data: null
            });
        }

        const deletedBooking = await bookingModel.findOneAndDelete({
            _id: id,
            createdBy: req.user?.user_id
        });

        if (!deletedBooking) {
            return res.status(404).json({
                message: "Booking tidak ditemukan atau akses ditolak",
                data: null
            });
        }

        return res.status(200).json({
            message: "Berhasil menghapus booking",
            data: deletedBooking
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null
        });
    }
};