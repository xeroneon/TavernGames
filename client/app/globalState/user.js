import React, {createContext, useState } from 'react';

export const UserContext = createContext()

export function UserProvider(props) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [ userImage, setUserImage] = useState('');
    const [ admin, setAdmin ] = useState(false);

    return(
        <UserContext.Provider
            value={{loggedIn, setLoggedIn, userImage, setUserImage, admin, setAdmin}}
        >
        {props.children}
        </UserContext.Provider>
    );
}