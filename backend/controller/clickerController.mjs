import { Click } from "../model/clicker.mjs";
import User from "../model/user.mjs";

export default class clickerController {
  static async click(req, res) {
    const userId = req.user._id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: 'Пользователь не найден' });
      }
      const updClick = await Click.findOneAndUpdate(
        { user: user._id },
        { $inc: { click: 1 } },
        { new: true, upsert: true }
      );
      return res.status(200).json(updClick);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Ошибка сервера' });
    }
  }
  

  static async buyAutoclicker(req, res) {
    const userId = req.user._id;
    try {
      const user = await User.findById(userId);
      const updClick = await Click.findOneAndUpdate(
        { user: user._id },
        { $inc: { click: -1000, autoclicker: 1 } },
        { new: true, upsert: true }
      );
      return res.status(200).json({msg: 'Успешно куплено!' || updClick});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Ошибка сервера' });
    }
  }

  static async autoclicker(req, res) {
    try {
      const usersAutoclicker = await Click.find({ autoclicker: { $gte: 1 } });
      const upd = usersAutoclicker.map((user)=>{
        const count = user.autoclicker;
        return Click.updateOne(
          { _id: user._id },
          { $inc: { click: count } }
      );
      })
      await Promise.all(upd);
    } catch (error) {
      console.log(error);
    }
  }

}