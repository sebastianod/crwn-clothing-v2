import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

//the value itself to be accessed by any component
export const UserContext = createContext({
  //default form
  currentUser: null, //an object that by default is null
  setCurrentUser: () => null, //most basic form of a function. Later to be set as the setter function from useState().
});

//The component that sends the data to any component I wrapt it in
export const UserProvider = ({ children }) => {
  //it wraps its children. ex: <App/>
  const [currentUser, setCurrentUser] = useState(null); //Data I want to be able to either set or access in a component that needs it. Ex: Set who the user is in sign-in component. Access who the user is in Nav component.
  const value = { currentUser, setCurrentUser }; //Through this, any component can call the current user or set it
//   signOutUser();//as soon as UserProvider mounts

  useEffect(() => {//run once when UserProvider mounts
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user); //is either null or user itself, set it for React
      console.log(user);
    });
    return unsubscribe; //stop the observer
  }, []); 

//==================Handle almost all user actions here================//
//   useEffect(() => {
//     const unsubscribe = onAuthStateChangedListener((user) => {
//       if (user) { //Used to be in the sign-in page, use it here instead
//         createUserDocumentFromAuth(user);
//       }
//       setCurrentUser(user);
//     });

//     return unsubscribe;
//   }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
