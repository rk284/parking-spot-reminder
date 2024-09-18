import axiosInstance from "./axiosInstance";


const apiUrl = 'apikey';

const saveSpot = async (data) =>{
    try{
       
        const response = await axiosInstance.post(`${apiUrl}save/spot`, data);
        return response;
    } catch(error){
        return {error:"An error occured."};
    }
};


const viewSpot = async (data) =>{
    try{
        const response = await axiosInstance.get(`${apiUrl}view/spot`);
        return response;
    } catch(error){
        return {error :"An error occured."};
    }
};

const updateSpot = async (data) =>{
    try{
        const response = await axiosInstance.put(`${apiUrl}update/spot`);
        return response;
    } catch(error){
        return {error :"An error occured."};
    }
};

const deleteSpot = async (data) =>{
    try{
        const response = await axiosInstance.delete(`${apiUrl}delete/spot/${data._id}`);
        return response;
    } catch(error){
       
        return {error :"An error occured."};
    }
};

const deleteAllSpot = async () =>{
    try{
        const response = await axiosInstance.delete(`${apiUrl}delete/all/spot`);
        return response;
    } catch(error){
       
        return {error :"An error occured."};
    }
};



const parkingService = {
    saveSpot,
    viewSpot,
    updateSpot,
    deleteSpot,
    deleteAllSpot,
};

export default parkingService;