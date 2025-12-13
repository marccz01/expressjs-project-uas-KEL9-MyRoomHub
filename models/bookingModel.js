import mongoose from "mongoose";
import userModel from "./userModel.js";

const BookingSchema = new mongoose.Schema(
    {
        tempat : {
            type : String,
            unique : true,
            required : true,
            trim : true,
        },
        namaRuangan : {
            type : String,
            required : true,
            trim : true,
        },
        waktu : {
            type : String,
            required : true,
            trim : true,
        },
        statusPemesanan : {
            type : String,
            required : true,
            trim : true,
        },
        createdBy: {
            type: mongoose.Types .ObjectId,
            ref: userModel // referensi ke model user
        }
    },
    {
        timestamps : true,
    }
);
const bookingModel = mongoose.model("booking", BookingSchema);

export default bookingModel;