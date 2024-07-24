import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    useNavigate
  } from "react-router-dom";
import Root from "./Root";
import ErrorPage from './ErrorPage'
import MessageList from '../components/MessageList'
import PublishMessage from '../components/PublishMessage'
import Balance from '../components/Balance'
import Login from '../components/Login'
// function RequireAuth({ children:<React.Fragment> }) {
//   const navigate = useNavigate();
//   const isAuthenticated = false;

//   if (!isAuthenticated) {
//     navigate('/', { replace: true });
//   }
//   return children
// }
const isAuthenticated = true

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={isAuthenticated ? <Balance /> : <Login />} />
          <Route path="dashboard" element={isAuthenticated ? <Balance /> : <Login />} />
          <Route
            path="sendMessage"
            element={isAuthenticated ? <PublishMessage /> : <Login />}
          />
          <Route path="messageList" element={isAuthenticated ? <MessageList /> : <Login />} />
      </Route>
    )
  );
export default router;