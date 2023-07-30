import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'
import { useDispatch } from "react-redux"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useState } from "react"
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { login } from './features/userSlice';
import { auth } from "./firebase"


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    try {
      if(!firstName) return alert('Please enter a first name.')
      if(!lastName) return alert('Please enter a last name.')
      
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, {
        displayName: firstName
      })
      dispatch(login({
        email: user.email,
        uid: user.uid,
        displayName: firstName
      }))
      navigate('/teslaaccount')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="signup">
      <div className="signup__header">
        <div className="signup__logo">
          <Link to='/'>
            <img
              src="https://assets.website-files.com/5e8fceb1c9af5c3915ec97a0/5ec2f037975ed372da9f6286_Tesla-Logo-PNG-HD.png"
              alt=""
            />
          </Link>
        </div>
        <div className="signup__language">
          <LanguageOutlinedIcon />
          <span>en-US</span>
        </div>
      </div>
      <div className="signup__info">
        <h1>Create Account</h1>
        <form className="signup__form">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <ButtonPrimary name='Create Account' type='submit' onClick={signUp} />
        </form>
        <div className="signup__divider">
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <Link to='/login'>
          <ButtonSecondary name='Sign In' className="signup__button--secondary" />
        </Link>
      </div>
    </div>
  )
}
export default SignUp