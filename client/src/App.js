import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";
import { StatesProvider } from "./context/StatesContext";
import Movies from "./pages/Movies/Movies";
import Signup from "./pages/Auth/Signup/Signup";
import Signin from "./pages/Auth/Signin/Signin";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ListProvider } from "./context/ListContext";

function App() {
  return (
    <BrowserRouter>
      <StatesProvider>
        <AuthProvider>
          <ListProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Movies />}>
                <Route path=":query" element={<Movies />} />
              </Route>
              <Route path="/detail" element={<Detail />} >
                <Route path=":id" element={<Detail />} />
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Signin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </ListProvider>
        </AuthProvider>
      </StatesProvider>
    </BrowserRouter>
  );
}

export default App;
