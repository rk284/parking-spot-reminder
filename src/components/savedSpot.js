import React,{useState, useContext, useEffect} from "react";
import { ParkingContext } from "../context/parkingContext";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/spot.css';


Modal.setAppElement('#root');

const SavedSpot = () =>{
    const navigate = useNavigate();
    const [savedSpots,setSavedSpots] = useState([]);
    const {logout} = useContext(AuthContext);
    const {viewSpot, deleteSpot} = useContext(ParkingContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);

    const getSpot = async() =>{
        try{
        const response = await viewSpot(); 
          if(response.success){
            setSavedSpots(response.spot);
          }
          else{
            toast(response.error);
          }
            
        } catch(error){
            toast("An error occured. Please try again later.");
        }
    };

    useEffect(() =>{
        getSpot();
       
});


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
            console.log(err);
            toast('Logout failed');
        }
        
    };

   

    const handleDelete= async (spot) =>{
    
        try{
           const response = await deleteSpot(spot);
           if(response.success){
            toast(response.message);
           }
           else{
            toast(response.error);
           }
           
       } catch(err){
            console.log(err);
            toast('Deletion Failed');
        }
        
    };

    const openModal= (spot) =>{
        setSelectedSpot(spot);
        setModalIsOpen(true);
    };

    const closeModal = () =>{
        setModalIsOpen(false);
        setSelectedSpot(null);
    };

    const confirmNavigation = () => {
        if (selectedSpot) {
            navigateToSpot(selectedSpot);
            closeModal();
        }

    }

    const navigateToSpot = async (spot) =>{
        const  { latitude, longitude } = spot;

        if (! latitude | !longitude){
            toast('Location details are not available.');
            
        }

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        window.open(mapsUrl, '_blank');
    };

    return(
        <div id="spot-page">
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
        

           <div className="saved-spots-content">
        <h1 className="spot-h1">Your Saved Parking Spots</h1>

        {savedSpots.length >0 ? (
          <ul className="spot-list">
            {savedSpots.map((spot, index) => (
              <li className="spot-item">
                <p key={index}><strong>Spot:</strong> {spot.spotName}</p>
                <p><strong>Created At:</strong> {spot.createdAt}</p>
                <button onClick={() => openModal(spot)}>Navigate</button>
                <button onClick={()=> handleDelete(spot)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="spot-p">No saved spots found</p>
        )}
      </div>

      {/* Modal for confirming navigation*/}

      <Modal 
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Confirm Navigation"
      className="modal-content"
      overlayClassName="modal-overlay"
      >
        {selectedSpot && (
            <div>
                <h2 className="modal-h2">Yours Notes for Navigation</h2>
                <div><p><strong>{selectedSpot.notes}</strong></p></div>
                <div className="modal-buttons">
                    <button onClick={confirmNavigation}>Confirm</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        )}
      </Modal>

        </div>
    );


};


export default SavedSpot;