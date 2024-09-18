import axiosInstance from "./axiosInstance";



const apiUrl ='apikey';

const register = async (data) => {
    try{
    const response = await axiosInstance.post(`${apiUrl}register`, data);

    return response;
    } catch(error)
    {
        return {error: "An error occured."};
    }
};

const login = async(data) => {
    try{
    const response = await axiosInstance.post(`${apiUrl}login`, data);
    return response;
    } catch(error)
    {
        return {error: "An error occured."};
    }
};

const logout = async() =>{
    try{
       
    const response = await axiosInstance.post(`${apiUrl}logout`);
    return response;
    } catch(error)
   {
    return {error: "An error occured."};
   }
};


const authService = {
    register,
    login,
    logout,
};

export default authService;