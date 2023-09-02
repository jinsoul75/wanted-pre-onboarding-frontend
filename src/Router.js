import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Todo from "./pages/Todo";

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/todo' element={<Todo />} />
    </Routes>
  );
}
