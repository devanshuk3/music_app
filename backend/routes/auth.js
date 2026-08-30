const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/jwt");

const router = express.Router();

//registeration of user
router.post("/register", async (req, res) => {
    try{
        const { username, email, password } = req.body;
        //decentralization of object
        // body = {
        //     username: "devanshuk3",
        //     email: "kdevanshu193@gmail.com",
        //     password:"random123"
        // }

        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All input fields are required"
            });
        }

        if(password.length < 6){
                       return res.status(400).json({
                success: false,
                message: "password must contain 6 characters!!"
            });
        }

        const existingUser = await User.findOne({
            $or:[
                {email},
                {username}
            ]
        })

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Username or email already exists!!"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username, 
            email, 
            password: hashedPassword
        })

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    }
    catch(error){
        console.error("Register error", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})


router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required!!"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email address"
            })
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if(!passwordCorrect){
            return res.status(401).json({
                success: false,
                message: "Incorrect passwordddd"
            })
        }


        const token = generateToken(user._id);
        res.status(201).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    }
    catch(error){
        console.error("Login error", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})

module.exports = router;