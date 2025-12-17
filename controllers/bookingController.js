import mongoose from "mongoose";
import bookingModel from "../models/bookingModel.js";

export const ListBooking = async (req, res) => {
    try {
        const booking = await bookingModel.find({
            createdBy: req.user?.user_id
        }).sort({createdAt: -1});

        res.status(200).json({
            message: "Daftar semua ruangan",
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

export const CreateBooking = async (req, res) => {
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
            message: "Berhasil menambahkan ruang baru",
            data: booking
        });

    } catch (error) {
        return res.status(500).json({
            message: "Gagal menambahkan ruang baru",
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
                message: "Ruangan tidak ditemukan",
                data: null
            });
        }

        return res.status(200).json({
            message: "Detail ruangan",
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
                message: "Ruangan tidak ditemukan atau akses ditolak",
                data: null
            });
        }

        return res.status(200).json({
            message: "Berhasil mengupdate ruangan",
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
                message: "Ruangan tidak ditemukan atau akses ditolak",
                data: null
            });
        }

        return res.status(200).json({
            message: "Berhasil menghapus ruangan",
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