import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

    const signUpUser = async ({email, password}) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        });
        if(error) {
            console.error("There was a problem signing up", error);
            return {success: false, error: error}
        }
        return {success: true, data: data}
    }

    const signInUser = async ({email, password}) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) {
                console.error("Sign in error", error);
            }
        } catch(error) {
            console.error("Error signing in", error);
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({data: session}) => {
            setSession(session);
        })

        supabase.auth.onAuthStateChange(({data: session}) => {
            setSession(session);
        })
    }, []);



    const signOut = () => {
        const {error} = supabase.auth.signOut();
        if(error) {
            console.error("There was an error signing out", error);
        }
    }


    return (
        <AuthContext.Provider value={{session, signUpUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}