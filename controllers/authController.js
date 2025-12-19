// import { compare } from "bcrypt";
import UserModel from "../models/userModel.js";
import { compare, hash } from "../utils/hashUtil.js";
import { jwtSignUtil } from "../utils/jwtSignUtil.js";

export const register = async (req, res) => {
    try {
        //Untuk mengambil body atau data dari request
        const registerData = req.body

        console.log(registerData);

        const hashPassword = hash(registerData.password)

        await UserModel.create({
            username : registerData.username,
            email : registerData.email,
            password : hashPassword,
            role: 'user'
        })

        await user.save();

        res.status(201).json({
            message : "Berhasil register, silahkan login",
            data : null
        })
    } catch(e) {
        res.status(500).json({
            message : e.message,
            data : null
        })
    }
}

const jwt = require('jsonwebtoken');

export const login = async(req, res) => {
    try{
        const loginData = req.body

        //mencari user berdasarkan email
        const user = await UserModel.findOne({
            email : loginData.email

        })


        //Jika user tidak ditemukan
        if (!user){
            res.status(404).json({
                message : "User not found",
                data : null
            })
        }

        //membandingkan password yang ada di dalam db dengan request
        if(compare(loginData.password, user.password)){
            return res.status(200).json({
                message: "Login berhasil",
                data : {
                    username : user.username,
                    email : user.email,
                    token : jwtSignUtil(user) //Melakukan sign JWT token
                }
            })
        }

        const token = jwt.sign(
        {
            id: user._id,
            role: user.role // 🔥 ROLE MASUK TOKEN
        },
            'SECRET_KEY',
        { expiresIn: '1h' }
        );

  res.json({ token });
    } catch (error){
    res.status(500).json({
        message: error.message,
        data : null
    })
    }
}