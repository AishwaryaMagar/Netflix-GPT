import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => navigate("/"))
            .catch(() => navigate("/error"));
    };

    return (
        <div className=" absolute flex justify-between items-center px-8 py-4 bg-gradient-to-b from-black to-transparent z-10 w-full">
            <img
                className="w-36 cursor-pointer"
                src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-5e9f-7420-a5e4-86ff612f8e2a/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
                alt='Netflix Logo'
            />

            {user && (
                <div className='flex items-center gap-4'>
                <img
                    className='w-10 h-10 rounded-full border-2 border-white'
                    alt='User Icon'
                    src={user?.photoURL}
                />
                <button
                    className='bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200'
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </div>
                )
            }
            
        </div>
    );
};

export default Header;
