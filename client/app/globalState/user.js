import React, {createContext, useState } from 'react';

export const UserContext = createContext()

export function UserProvider(props) {
    const [ username, setUsername ] = useState('');
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userImage, setUserImage ] = useState('');
    const [ admin, setAdmin ] = useState(false);

    return(
        <UserContext.Provider
            value={{username, setUsername, loggedIn, setLoggedIn, userImage, setUserImage, admin, setAdmin}}
        >
        {props.children}
        </UserContext.Provider>
    );
}