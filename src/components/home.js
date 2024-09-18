import React, { useState, useEffect, useContext } from 'react';
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet"; 
import { ParkingContext } from '../context/parkingContext';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/home.css';


//Fixing Leaflet's default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Home = () =>{
    const [location, setLocation] = useState(null);
    const [notes, setNotes] = useState("");
    const [spotName, setSpotName] = useState("");
    const {logout} = useContext(AuthContext);
    const {saveSpot} = useContext(ParkingContext); 
    const navigate = useNavigate();


    // Getting user's current location using Geolocation API
    const getCurrentLocation = () =>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });
              },
              (error) => {
                toast("Error fetching location:", error);
                toast("Unable to fetch location. Please enable location access.");
              }
            );
          } else {
             toast("Geolocation is not supported by this browser.");
          }
    

    };



    useEffect(() =>{
        getCurrentLocation();
    }, []);

    const handleRefreshMap = () => {
        getCurrentLocation();
    };


    const handleSaveSpot = async (e) =>{
        e.preventDefault();
        try{ 
             const response = await saveSpot({location, notes, spotName});
             if(response.success){
                toast(response.message);
                setTimeout(() => {
                    navigate('/saved-spot'); 
                }, 2000);
             }
             else{
                toast(response.error);             }
           
        } catch(error){
            toast("An error occured. Please try again later.")

        }
      
    };

    const handleLogout = async () =>{
        try{
            const response = await logout();
            if (response.success) { 
                toast(response.message);
                setTimeout(() => {
                    navigate('/login'); 
                }, 2000);
            }
            else{
                toast(response.error);
            }
       } catch(err){
         toast('Logout Failed!');
        }
        
    }

    return(
        <div id="home-page">
             <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    limit={1}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    />
            <nav>
                <div className='nav-item' onClick={() => navigate('/home')}>
                Home
                </div>
                <div className='nav-item' onClick={() => navigate('/saved-spot')}>
                Saved Spots
                </div>
                <div className='nav-item' onClick={handleLogout}>
                Logout
                </div>
               
            </nav>


           

            <div className='main-content'>
                <h1>Save Your Parking Spot</h1>

                <div className='map-container'>

                 {location ? (
                    <MapContainer center={[location.lat, location.lng]} zoom={13} style={{height:"400px", width:"600px"}}>
                      <TileLayer 
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                      />
                     <Marker position={[location.lat, location.lng]}>
                     <Popup>You are here!</Popup>
                     </Marker>
                    </MapContainer>
                        ) :(
                             <p>Loading your location...</p>
                    )}

                </div>

              

                <div className='popup'>
                    <h2>Add Additional Information</h2>
                    <input type='text' value={spotName} onChange={(e) => setSpotName(e.target.value) } placeholder='Enter name to your parking Spot...' required  />
                <input 
                type='text'
                value = {notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder='Add  any notes about the parking spot (e.g., floor, landmarks)'
                />
                
            </div>
               
            <button className='refresh-button' onClick={handleRefreshMap}>Refresh Map</button>

                <button className='save-button' onClick={handleSaveSpot}>Save Parking Spot</button>



            </div>

           

           
        </div>

    );
};



export default Home;
