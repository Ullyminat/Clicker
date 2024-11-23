import mongoose from "mongoose";

async function db_connect(url) {
    await mongoose.connect(url)
        .then(()=>console.log('Подключена БД'))
        .catch((err)=>console.log(err))
};
export default db_connect;

// db.clicks.dropIndex("username_1");