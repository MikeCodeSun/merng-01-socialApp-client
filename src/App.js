// import { useGlobalContext } from "./context/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import NotFound from "./page/NotFound";
import SinglePost from "./page/SinglePost";
import Navbar from "./component/Navbar";

function App() {
  // const { user } = useGlobalContext();
  // console.log(user);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
