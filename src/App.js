import React from "react";
import "./App.css";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "./Menu";
import HeaderBlock from "./HeaderBlock";
import Login from "./Login";
import { useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import SignUp from "./SignUp";
import TeslaAccount from "./TeslaAccount";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux"
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        // User is signed in
        dispatch(login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                {isMenuOpen && <Menu />}
                <HeaderBlock />
              </>
            }
          />
          <Route
            path="/login"
            element={<>{user ? <Navigate to="/teslaaccount" /> : <Login />}</>}
          />
          <Route
            path="/signup"
            element={
              <>
                <SignUp />
              </>
            }
          />
          <Route
            path="/teslaaccount"
            element={
              <>
                {user ? (
                  <>
                    <TeslaAccount
                      isMenuOpen={isMenuOpen}
                      setIsMenuOpen={setIsMenuOpen}
                    />
                    {isMenuOpen && <Menu />}
                  </>
                ) : (
                  <Navigate to="/login" />
                )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
