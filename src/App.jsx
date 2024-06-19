import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Job from "./Components/Job";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Home} />}></Route>
        <Route path="/job" element={<ProtectedRoute Component={Job} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
