import { useEffect, useState } from "react";
import axios from "axios";

export default function Logout() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "/";
  };

  if (!username) return null;

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <h3>{username}</h3>
    </>
  );
}
