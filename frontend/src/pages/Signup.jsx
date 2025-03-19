import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User2,User, Lock } from "lucide-react";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Clear previous errors

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                password
            });

            console.log("User registered:", response.data);
            navigate("/login"); // Redirect to login page after successful signup
        } catch (error) {
            console.error("Error signing up:", error);
            setError("Failed to register user.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                <User2 className="w-8 h-8 text-blue-500" />
                </div>
                <h1 className="text-3xl text-white font-bold">Hello There</h1>
                <p className="text-white mt-2">Please register to continue</p>
            </div>    
            {error && <p className="bg-red-500/10 border border-red-500/50 text-red-100 px-4 py-2 rounded-lg mb-6">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto">
                        <User/>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-white/10 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/30 transition-all duration-300"
                        required
                    />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto">
                        <Lock/>
                    </div>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-white/10 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/30 transition-all duration-300"
                        required
                    />
                    
                </div>
                <div className="flex items-center justify-between text-sm">
                <button
                    type="submit"
                    className="w-full bg-white text-blue-600 py-3 px-4 rounded-xl font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                    Sign Up
                </button>
                </div>
                    <p className="text-center text-white/80 mt-6">
                    Have an account?{' '}
                    <a href="/login" className="text-white font-semibold hover:underline">
                    Log In
                    </a>
                    </p>
            </form>
            </div>
        </div>
    );
};

export default SignupPage;
