import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useState } from "react"
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import { signInWithEmailAndPassword } from "firebase/auth"
import { useDispatch } from "react-redux"
import { login } from "./features/userSlice";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login({
        email: user.email,
        uid: user.uid,
        displayName: user.displayName
      }))
      navigate('/teslaaccount');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login">
      <div className="login__header">
        <div className="login__logo">
          <Link to='/'>
            <img
              src="https://assets.website-files.com/5e8fceb1c9af5c3915ec97a0/5ec2f037975ed372da9f6286_Tesla-Logo-PNG-HD.png"
              alt=""
            />
          </Link>
        </div>
        <div className="login__language">
          <LanguageOutlinedIcon />
          <span>en-US</span>
        </div>
      </div>
      <div className="login__info">
        <h1>Sign In</h1>
        <form className="login__form">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonPrimary name='Sign In' type='submit' onClick={signIn} />
        </form>
        <div className="login__divider">
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <Link to='/signup'>
          <ButtonSecondary name='Create Account' />
        </Link>
      </div>
    </div>
  );
}
export default Login;
