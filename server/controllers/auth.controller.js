import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    console.log("signup");
    try {    
        let { name, email, password } = new User(req.body);
        // Check if user already exist
        console.log(name + email + password);
        let userExists = await User.findOne({ email });
        if (userExists) {
            console.log(name);
            return res.status(200).json({ error: "User already exists" });
        }
        const hash = await bcrypt.hash(password, 15);

        password = hash;
            
        let user =  new User({ name, email, password });

            
        await user.save();
            const token = jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '7d' });
            res.status(200).send({ token: token, user: user});
    }
    catch (err) {
        // console.log error message
        console.log(err.message);

        res.status(400).send("Error in saving user");
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if(user==null){
            throw new Error("User not found");
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!user && !match) {
            throw new Error("User not found");
        }
        console.log("match");
        console.log(process.env.JWT_KEY);
        const token = jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '7d' })
        res
        .status(200).send({ token: token, user: user });
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}


