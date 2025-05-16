import Logout from "./Logout";
import Home from "./Home";

export default function Hero() {
  const username = localStorage.getItem("username");

  return (
    <>
     <header className="bg-[rgba(224,167,117,10)] mb-[50px]">
      <div className="flex gap-20 items-center justify-center h-[50px]">
        <a href="/">Home</a>
        <a href="/places/create" className={!username && "hidden"}>Create Place</a>
        <a href="/register" className={username && "hidden"}>Signup</a>
        <a href="/login" className={username && "hidden"}>Login</a>
        <Logout />
      </div>
    </header>
    <Home />
    </>
  );
}
