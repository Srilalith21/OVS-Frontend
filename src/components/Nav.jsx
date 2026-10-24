import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../constants/constant";

export function HomeNav() {
  const navigate = useNavigate();

  const handleClick = (c_page) => {
    // Handle the click event
    navigate(`/${c_page}`);
  };

  return (
    <div className="h-20 w-full bg-blue-950 flex items-center justify-between">
      <h1 className="h-full w-1/3 text-white flex items-center mx-3.5 font-bold text-4xl">
        Online Voting System
      </h1>
      <div className="flex items-center justify-end gap-5 h-full w-1/3 mx-3.5">
        <button
          onClick={() => handleClick("login")}
          className="bg-cyan-400 font-bold rounded-2xl border-0 px-10 py-2 hover:bg-cyan-500"
        >
          Login
        </button>
        <button
          onClick={() => handleClick("register")}
          className="bg-orange-400 font-bold rounded-2xl border-0 px-10 py-2 hover:bg-orange-600"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export function LoggedInNav(pros) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Handle the logout event
    const res = await axios.get(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      sessionStorage.removeItem("userDashboard");
      navigate("/login");
    }
  };

  const { name } = pros;
  return (
    <div className="h-20 w-full bg-blue-950 flex items-center justify-between">
      <h1 className="h-full w-1/3 text-white flex items-center mx-3.5 font-bold text-4xl">
        Online Voting System
      </h1>
      <div className="flex items-center justify-end gap-5 h-full w-1/3 mx-3.5">
        <p className="text-white text-2xl">Welcome, {name}</p>{" "}
        <button
          className="bg-red-700  text-white font-bold rounded-2xl border-0 px-10 py-2 hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export function AuthNav(props) {
  const { current } = props;
  const navigate = useNavigate();

  const handleClick = (c_page) => {
    // Handle the click event
    navigate(`/${c_page}`);
  };

  return (
    <div className="h-20 w-full bg-blue-950 flex items-center justify-between">
      <h1
        onClick={() => navigate("/")}
        className="h-full w-1/3 text-white cursor-pointer flex items-center mx-3.5 font-bold text-4xl"
      >
        Online Voting System
      </h1>
      <div className="flex items-center justify-end gap-5 h-full w-1/3 mx-3.5">
        {current == "login" ? (
          <button
            className="bg-orange-400 font-bold rounded-2xl border-0 px-10 py-2 hover:bg-cyan-500 "
            onClick={() => handleClick("register")}
          >
            Register
          </button>
        ) : (
          <button
            className="bg-cyan-400 font-bold rounded-2xl border-0 px-10 py-2 hover:bg-cyan-500"
            onClick={() => handleClick("login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
