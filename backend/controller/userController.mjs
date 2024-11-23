import User from "../model/user.mjs";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { Click } from "../model/clicker.mjs";

configDotenv();
export default class UserController{
    static async create(req,res){
        try{
            const {username,password} = req.body;
            if (!username || username.trim().length === 0) {
                return res.status(400).json({ msg: `username не может быть пустым` });
            }
            if (!/^[a-zA-Z0-9-]{1,10}$/.test(username)) {
                return res.status(400).json({ msg: "username могут содержать только буквы латиницы, цифры и дефисы, без пробелов, и быть не длиннее 10 символов" });
            }            
            if (!password || password.trim().length === 0) {
                return res.status(400).json({ msg: `password не может быть пустым` });
            }
            if (!password || password.trim().length < 4) {
                return res.status(400).json({ msg: "password должен содержать минимум 4 символа" });
            }
            const hashed = await bcrypt.hash(password,5);
            const user = new User({
                username:username,
                password:hashed
            });
            await user.save();
            console.log(user._id);
            if (await Click.findOne({ user: user._id })) {
                return res.status(400).json({ msg: 'Запись уже существует' });
            }
            const userforclick = await new Click({
                user:user._id
            })
            await userforclick.save();
            res.status(201).json({msg:'Создан'});
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        }
    }
    static async login(req,res){
        try {
            const {username,password} = req.body;
            const finded = await User.findOne({username:username});
            if(!finded){
                return res.status(404).json({msg:'Не найден'});
            }
            const findedByPassword = await bcrypt.compare(password,finded.password);
            if(!findedByPassword){
                return res.status(404).json({msg:'Не найден'});
            }
            const payload = {
                _id:finded._id,
                username:finded.username
            };
            const token = await jwt.sign(payload,process.env.SECRET,{expiresIn:'10h'});
            return res.status(200).json({ user: { username: finded.username, _id: finded._id }, token });
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async load(req, res) {
        try {
            const user = await User.find();
            const click = await Click.find();
            res.json({ user, click });
        } catch (error) {
            res.status(500).json({error});
        }
    }
}