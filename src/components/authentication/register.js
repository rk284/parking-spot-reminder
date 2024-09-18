import React,{ useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/auth.css';


function Register(){
    const [formData, setFormData] = useState({username: '', password: ''});
    const {register} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await register(formData.username, formData.password);
            
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
            toast('Registeration Failed!');
        }
    };

    return(
        <div className="auth-container" id="auth-page">
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
            <h2>Register</h2>
            <form onSubmit = {handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                
                <button type="submit">Register</button>
                <a href="/login">Already have an account?</a>
            </form>
        </div>
    );
}


export default Register;