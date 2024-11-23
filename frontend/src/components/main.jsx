import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, authRoutes } from "../config/routes";
import userStore from "../stores/userStore";
import { observer } from "mobx-react";

const Main = observer(() => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      {publicRoutes.map((el, i) => (
        <Route path={el.path} element={<el.component />} key={i} />
      ))}

      {/* Авторизованные маршруты */}
      {authRoutes.map((el, i) =>
        userStore.isAuth ? (
          <Route path={el.path} element={<el.component />} key={i} />
        ) : (
          <Route
            key={i}
            path={el.path}
            element={<Navigate to="/Auth" replace />}
          />
        )
      )}
    </Routes>
  );
});

export default Main;
