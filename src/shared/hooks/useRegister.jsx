import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from '../../services'
import toast from "react-hot-toast";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const register = async(email, password, username,roleUser ) =>{
        setIsLoading(true)

        try {
            const response = await registerRequest({
                email,
                password,
                username,
                roleUser
            })
            setIsLoading(false)
            
            if(response.error){
                console.log(response.error)
                return toast.error(response.error?.response?.data || 'Ocurrió un error al registrarse, intenta de nuevo')
            }
    
            const { userDetails } = response.data
    
            navigate('/auth');
            window.location.reload();
        } catch (error) {
            setIsLoading(false);
            console.error('Registration failed', error);
            toast.error('Ocurrió un error al registrarse, intenta de nuevo');
        }
    }
    return{
        register,
        isLoading
    }
}