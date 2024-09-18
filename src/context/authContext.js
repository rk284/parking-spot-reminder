import React, { createContext, useState} from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const register = async (username, password) => {
        try{
           
            const data = await authService.register({username, password});
          
            if (data.status === 200 && data.data.message)
            {
                setUser(null);
          
                return {success:  true, message:data.data.message};
              
            }
            else{
                return {success:  false, error: data.data.error};
            }
        } catch(error) {
            return {success:  false, error: 'An error ocurred. Please try again later.'};
          
        }
    };

    const login = async (username, password) => {
        try{
            const data = await authService.login({username, password});
            if (data.status === 200 && data.data.message)
            {  
                setUser(data.data.user);
               
                return {success:  true, message:data.data.message};
                
                
           }
           else{
            return {success:  false, error: data.data.error};
           }
        } catch(error){
            return {success:  false, error: 'An error ocurred. Please try again later.'};
        }
    };

    const logout = async()=>{
        try{
            
           const data = await authService.logout();
            if (data.status === 200 && data.data.message)
            {
            setUser(null);
          
            return {success:  true, message:data.data.message};
        }
        else{
            return {success:  false, error: data.data.error};
        }
        } catch(error){
           return {success:  false, error: 'An error ocurred. Please try again later.'};
        }
    };


    return (
        <AuthContext.Provider value = {{user,register,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};
