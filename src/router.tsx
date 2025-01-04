import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import NicknameView from "./views/NicknameView";
import NotFoundView from "./views/NotFoundView";
import HomeView from "./views/HomeView";

export const Router = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>

        <Route path="/admin" element={<AppLayout />} >
          <Route index={true} element={ <LinkTreeView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>

        <Route path="/:nickname" element={<AuthLayout />}>
          <Route index={true} element={<NicknameView />} />
        </Route>

        <Route path="/" element={<HomeView />} />

        <Route path="/404" element={<AuthLayout/>}>
          <Route index={true} element={<NotFoundView />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
