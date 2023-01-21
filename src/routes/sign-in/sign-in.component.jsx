import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"; 
import SignUp from "../sign-up-form/sign-up-form.component";

const SignIn = () => {

    const logGoogleUser = async () => { //if getting data from a database, you may or may not obtain a response, so use async functions
        const {user} = await signInWithGooglePopup(); //user is all I want
        const userDocRef = await createUserDocumentFromAuth(user); //this console logs the user object (see firebase.utils.js)
    }

    return (
        <div>
            <h1>Sign-in Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <SignUp/>
        </div>
    )
}

export default SignIn;