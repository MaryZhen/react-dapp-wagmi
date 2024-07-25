import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    redirect,
  } from "react-router-dom";
import Root from "./Root";
import ErrorPage from './ErrorPage'
import MessageList from '../components/MessageList'
import PublishMessage from '../components/PublishMessage'
import Balance from '../components/Balance'
import Login from '../components/Login'
import React from "react";

interface RouteElement {
  path: string,
  element: React.ReactNode,
  children?: RouteElement[],
}
function getAuth() {
  const account = localStorage.getItem('account')
  return account
}
const RouteList: RouteElement[] = [
  { path: "/", element: <Balance /> },
  { path: "dashboard", element: <Balance /> },
  { path: "sendMessage", element: <PublishMessage /> },
  { path: "messageList", element: <MessageList /> },
]
const loader = async () => {
  const user = getAuth(); // 假设 getAuth 返回认证状态或用户信息

  if (!user) {
    return redirect("/login");
  }
  return null;
};
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
              { RouteList.map((item) => {
                return <Route
                  path={item.path}
                  element={item.element}
                  key={item.path + Math.random()}
                  loader={loader}
                />
              }) }
          </Route>
          <Route path="login" element={<Login />} key="login" />
        </>
      )
    )
export default router;