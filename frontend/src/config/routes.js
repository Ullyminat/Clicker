import Auth from "../components/auth";
import Coin from "../components/coin/coin";
import Reg from "../components/reg";

export const publicRoutes=[
    {
        name:'Регистрация',
        path:'/reg',
        component:Reg
    },
    {
        name:'Авторизация',
        path:'/auth',
        component:Auth
    }
];

export const authRoutes =[
    {
        name:'Кликер',
        path:'/',
        component:Coin
    }
];

export const adminRoutes =[
    
];