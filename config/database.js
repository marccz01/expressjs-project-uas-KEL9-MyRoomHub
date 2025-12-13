import mongoose from "mongoose";

export const database = async () => {
    try {
        console.log("koneksi ke database ....");

        const response = await mongoose.connect("");

        console.log("koneksi ke database berhasil");
    } catch (error) {
        console.log (error);
        process.exit(1);
    }
}

export default database;