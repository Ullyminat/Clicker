import axios from "axios";
import { toast } from "react-toastify";

export const postUser = async (for_user) => {
  try {
    const res = await axios.post("http://localhost:3008/user/create", {
      username: for_user.username,
      password: for_user.password,
    });
    toast.success("Вы успешно зарегистрировались!");
    return res.data;
  } catch (err) {
    console.log("Ошибка при регистрации пользователя:", err);
    toast.error("Не удалось зарегистрироваться!");
  }
};

export const loginUser = async (for_user) => {
  try {
    const res = await axios.post("http://localhost:3008/user/login", {
        username: for_user.username,
        password: for_user.password,

    });
    toast.success(`Вы успешно вошли в аккаунт!`);

    try {
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      console.log(error);
    }
    console.log(res.data)
    return res.data;
  } catch (err) {
    console.log("Ошибка при авторизации пользователя:", err);
    toast.error("Неправильный логин или пароль!");
  }
};
