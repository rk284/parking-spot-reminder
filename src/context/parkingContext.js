import React, { createContext} from 'react';
import parkingService from '../services/parkingService';


export const ParkingContext = createContext();

export const ParkingProvider = ({children}) => {
    


    const saveSpot = async ({location,notes,spotName}) =>{
        try{

            const isEmpty = await parkingService.deleteAllSpot();
            if(isEmpty.status === 200 && isEmpty.data.success){

            const data = await parkingService.saveSpot({location, notes, spotName});
            if (data.status === 200 && data.data.message)
                {    return {success:  true, message:data.data.message};
              
                }
                else{
                    return {success:  false, error: data.data.error};
                }
            }
            else{
                return {success:  false, error:isEmpty.data.error};

            }
            } catch(error) {
                return {success:  false, error: 'An error ocurred. Please try again later.'};
            }
        
        
    };


    const viewSpot = async () => {
        try{
            const data = await parkingService.viewSpot();
            if (data.status === 200 && data.data.spot)
                { 
                    return{success:true, spot: data.data.spot};
                    }
                else{
                    return {success:  false, error: data.data.error};
                 }
            } catch(error) {
                return {success:  false, error: 'An error ocurred. Please try again later.'};
            }

    };

    const updateSpot = async () => {
        try{
            const data = await parkingService.updateSpot();
            if (data.status === 200 && data.data.message)
                { 
                    return {success:  true, message:data.data.message};
              
                    }
                else{
                    return {success:  false, error: data.data.error};
                 }
            } catch(error) {
                return {success:  false, error: 'An error ocurred. Please try again later.'};
            }

    };

    const deleteSpot = async (spot) => {
        try{
            const data = await parkingService.deleteSpot(spot);
            if (data.status === 200 && data.data.message)
                { 
                    return {success:  true, message:data.data.message};
              
                    }
                else{
                    return {success:  false, error: data.data.error};
                 }
            } catch(error) {
                return {success:  false, error: 'An error ocurred. Please try again later.'};
            }

    };

    return(
        <ParkingContext.Provider value = {{saveSpot, viewSpot, updateSpot, deleteSpot}}>
            {children}
           
        </ParkingContext.Provider>
    );
};