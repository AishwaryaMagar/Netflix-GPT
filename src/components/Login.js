import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser} from '../userSlice';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const onhandleClick = () => {
        // validate the form data
        const message = checkValidateData(email.current.value, password.current.value);
        setErrorMessage(message);

        if(message) return;

        if(!isSignInForm)
        {
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value ,
                    photoURL: "https://media.licdn.com/dms/image/v2/D5603AQEZKXf-1RLLCg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724129123712?e=2147483647&v=beta&t=N4q1hBMOsLTsjXrpxlEFHIYnm6MbuLkYF68t2Jrg-tM"
                  }).then(() => {
                    const {uid, email, password, photoURL} = auth.currentUser;
                    dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        password: password,
                        photoURL: photoURL
                    }));
                    navigate("/browse");
                  }).catch((error) => {
                    setErrorMessage(error.message);
                  });
                
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
                // ..
            });
        }
        else{

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate("/browse");
            // ...
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            });

        }
    }

  return (
    <div className="absolute h-screen w-screen">
    <Header/>
    <div className=" absolute h-full w-full">
      <img className="h-full w-full object-cover"
      src='https://assets.nflxext.com/ffe/siteui/vlv3/50fcc930-ba3f-4cae-9257-9f920e30a998/web/US-en-20250310-TRIFECTA-perspective_6fe178df-52f2-4bf0-8e96-22d7b760b0a7_small.jpg'
      alt='body img'>
        
      </img>
    </div>
    <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute relative p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>
            {isSignInForm? "Sign In": "Sign Up"}
        </h1>
        {
            !isSignInForm && (
                <input ref={name} type='text' placeholder='Name' className='p-4 my-4 w-full bg-gray-700'></input>
            )   
        }
        <input ref={email} type="text" placeholder="Email" className="p-4 my-4 w-full bg-gray-700"></input>
        <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700"></input>
        <p className='text-red-600 font-bold text-lg py-2'>{errorMessage}</p>
        <button type='button' className="p-4 my-6 bg-red-600 w-full" onClick={onhandleClick}>
        {isSignInForm? "Sign Up": "Sign In"}
        </button>
        <p className= "py-4" onClick={toggleSignInForm}>
            {isSignInForm? "New to Netflix? Sign Up Now" : "Already registered Sign Up Now.. "}
        </p>
    </form>
    </div>
  )
}

export default Login
