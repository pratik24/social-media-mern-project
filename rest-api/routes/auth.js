import express from 'express'
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', (req, res) => {
    console.log("something");
    res.send("hello from auth users");
});

// Register
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    
    try{
        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password, salt);
        const newUser = new User({username, password: newPass, email})
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("called");
    try{
        const user = await User.findOne({email});
        console.log("called 2 ", user);
        !user && res.status(404).json("no user found");

        const validPass = await bcrypt.compare(password, user.password)
        !validPass && res.status(400).json("invalid password");

        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

export default router;