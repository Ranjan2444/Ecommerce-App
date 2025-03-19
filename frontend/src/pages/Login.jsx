import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { LogIn,User,Lock } from "lucide-react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Get login function from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                username,
                password
            });

            // Call login function from AuthContext to update the user state
            login(response.data.token);

            navigate("/"); // Redirect to homepage or dashboard after login
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <LogIn className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/80 mt-2">Please sign in to continue</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-100 px-4 py-2 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-white/60" />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/30 transition-all duration-300"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/60" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/30 transition-all duration-300"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-white/80">
              <input type="checkbox" className="rounded border-white/30 bg-white/5 text-blue-500 focus:ring-2 focus:ring-white/30 mr-2" />
              Remember me
            </label>
            <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-blue-600 py-3 px-4 rounded-xl font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Sign In
          </button>

          <p className="text-center text-white/80 mt-6">
            Don't have an account?{' '}
            <a href="/register" className="text-white font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
    );
};

export default LoginPage;
