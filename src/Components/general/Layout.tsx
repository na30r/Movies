import React, { useContext, useState } from "react";
import { ConfigProvider, Layout, notification, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import Movies from "../pages/Movies/Movies";
import Detail from "../pages/Movies/Detail";
import ActorDetail from "../pages/Actor/ActorDetail";
import SignIn from "../pages/Profile/SignIn";
import DashboardLayout from "./DashboardLayout";
import { ThemeContext } from "../context/ThemeProvider";

const AppLayout: React.FC = () => {
  const { theme: mytheme } = useContext(ThemeContext);
  const [_, contextHolder] = notification.useNotification();

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: mytheme == "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}>
        <Layout style={{ minHeight: "100vh" }}>
          {contextHolder}
          <Routes>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/" element={<DashboardLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/movies/:genreId?" element={<Movies />} />
              <Route path="/movies/detail/:movieId" element={<Detail />} />
              <Route path="/movies/Actor/detail/:personName" element={<ActorDetail />} />
            </Route>
          </Routes>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default AppLayout;
