import { Link, useNavigate } from 'react-router-dom'
import './TeslaAccount.css'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from "react-redux"
import { logout, selectUser } from './features/userSlice';
import Car from './Car';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function TeslaAccount({ isMenuOpen, setIsMenuOpen }) {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout())
      navigate('/login') 
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="tesla-account">
      <div className="tesla-account__header">
        <div className="tesla-account__logo">
          <Link to='/'>
            <img src="https://assets.website-files.com/5e8fceb1c9af5c3915ec97a0/5ec2f037975ed372da9f6286_Tesla-Logo-PNG-HD.png" alt="" />
          </Link>
        </div>
        <div className="tesla-account__links">
          <Link to='/teslaaccount'>Model S</Link>
          <Link to='/teslaaccount'>Model 3</Link>
          <Link to='/teslaaccount'>Model X</Link>
          <Link to='/teslaaccount'>Model Y</Link>
          <Link to='/teslaaccount'>Solar Roof</Link>
          <Link to='/teslaaccount'>Solar Panels</Link>
          <Link to='/teslaaccount'>Shop</Link>
          <Link to='/teslaaccount'>Tesla Account</Link>
          <Link onClick={logOut}>Log out</Link>
          <div className="tesla-account__menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {
              isMenuOpen ? <CloseIcon className='tesla-account__menu--close' /> : <MenuIcon />
            }
          </div>
        </div>
      </div>
      <div className="tesla-account__info">
        <div className="tesla-account__person">
          <h4>{user?.displayName + "'s Tesla"}</h4>
        </div>
        <div className="tesla-account__info--right">
          <Link>Home</Link>
          <Link>Account</Link>
          <Link>History</Link>
          <Link onClick={logOut}>Sign out</Link>
        </div>
      </div>
      <div className="tesla-account__car">
        <Car imgSrc='https://www.tesla.com/tesla_theme/assets/img/mytesla/v3/header-nocar-models@2x.jpg?20170815' model='model s' testDrive />
        <Car imgSrc='https://www.tesla.com/tesla_theme/assets/img/mytesla/v3/header-nocar-modelx@2x.jpg?20170815' model='model x' />
      </div>
    </div>
  )
}
export default TeslaAccount