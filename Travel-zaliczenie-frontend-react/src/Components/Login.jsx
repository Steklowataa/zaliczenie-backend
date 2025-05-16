import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({setToken}) => {
    const [username, setUsername] = useState(localStorage.getItem("username") || "")
    const [password, setPassword] = useState(localStorage.getItem("password") || "")
    const [message, setMessage] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/login",  {
                username,
                password
            })
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("username", username)
            setMessage("User login")
            navigate("/")
        } catch (error) {
            setMessage("Błąd logowania: " + (error.response?.data.error || "Spróbuj ponownie"));
        }
    }

    const navigate = useNavigate()
    const handleRedirect = () => {
        navigate("/register")
    }

    const handleRedirectHome = () => {
        navigate("/")
    }


    return (
        <>
        <div className="flex flex-1 flex-col justify-between mt-20 ml-20">
        <div className="flex flex-col items-center  w-[480px] h-[600px] rounded-[20px] bg-lightOrange border-2 border-borderColor">
            <h2 className="text-[40px] text-orange mt-[40px] mb-[50px]">Login in</h2>
            <form onSubmit={handleLogin} className="flex flex-col w-full gap-5 items-center justify-center">
                <input 
                    className="input-style"
                    type="text" 
                    placeholder="Text your username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}/>
                <input
                    className="input-style"
                    type="password" 
                    placeholder="Text your password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                <a href="" className="text-gray-600 mt-[20px]   ">Forgot password?</a>

                <div className="flex gap-4 items-center w-full justify-start ml-[130px] mt-[20px]">
                    <button className="w-[114px] h-[49px] rounded-[10px] bg-lightYellow text-white border-2 border-borderColor"
                     type="submit"
                     onClick={handleRedirectHome}>Login</button>
                    <button className="w-[114px] h-[49px] rounded-[10px] bg-white text-gray-600 border-2 border-borderColor" onClick={handleRedirect}>
                    Sign up
                    </button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
        </div>
       
        </>
    )
}

export default Login