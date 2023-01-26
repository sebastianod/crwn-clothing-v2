import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../components/context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext); //From UserContext, get me currentUser data and its setter function
  // console.log(currentUser);

  const handleSignOut = async () => {
    const res = await signOutUser();// res is null
    setCurrentUser(null); //Once signed out, set user to null
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" to="/auth" onClick={handleSignOut}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}

        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
