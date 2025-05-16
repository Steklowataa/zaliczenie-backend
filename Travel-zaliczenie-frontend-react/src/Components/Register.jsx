import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/register", {
                username,
                password
            })
            setMessage("User regestered")
            localStorage.setItem("username", username)
            localStorage.setItem("password", password)
            navigate("/login")
        } catch (error) {
            setMessage(error + "Cos poszlo nie tak")
        }
    }

    const redirectLogin = () => {
        navigate("/login")
    }
    return (
        <>
            <div className="flex flex-1 flex-col justify-between mt-20 ml-20">
        <div className="flex flex-col items-center  w-[480px] h-[600px] rounded-[20px] bg-lightOrange border-2 border-borderColor">
            <h2 className="text-[40px] text-orange mt-[40px] mb-[50px]">Sign up</h2>
            <form onSubmit={handleRegister} className="flex flex-col w-full gap-5 items-center justify-center">
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
                <button className="w-[114px] h-[49px] rounded-[10px] bg-white border-2 border-borderColor"
                     type="submit">Sign up</button>
                <a href="" className="text-gray-600 mt-[20px]   ">Already have account?</a>

                <button
                    onClick={redirectLogin}
                    className="w-[114px] h-[49px] rounded-[10px] bg-lightYellow text-white border-2 border-borderColor">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
        </div>
        <div className="flex flex-1 flex-col">
            <img src="./images/map.png" alt="" className="w-[500px] h-[500px]"/>
        </div>
        </>
    )
}

export default Register