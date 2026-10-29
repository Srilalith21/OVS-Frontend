import axios from "axios";
import { MdOutlineMenu, MdHowToVote } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoPeople } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";

import { useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentPath } from "../utils/path";

function AdminLeftNavBar(props) {
  const [path, setPath] = useState("");
  const { open, stateValue, setState } = props;
  const navigate = useNavigate();
  const handleExitClick = () => {
    setState(!stateValue);
  };

  return (
    <>
      <div className="h-screen w-75 bg-blue-200 flex flex-col items-center justify-start pt-10 absolute top-0 left-0 duration-1000 z-50 {open? 'right-36' : 'left-36}">
        <div className="h-20 w-20 bg-blue-400 rounded-full flex items-center justify-center mb-5">
          <h1 className="text-white text-2xl font-bold">A</h1>
        </div>
        <ul className="w-full">
          <li
            className="w-full py-3 px-5 text-[20px] border-t-[1px] border-black hover:bg-blue-300 cursor-pointer flex items-center gap-2 "
            onClick={() => navigate("/admin/dashboard")}
            style={{
              backgroundColor:
                getCurrentPath() === "/admin/dashboard" ? "#93c5fd" : "",
            }}
          >
            <AiFillHome />
            Home
          </li>
          <li
            className="w-full py-3 px-5 text-[20px] border-t-[1px] border-black hover:bg-blue-300 cursor-pointer flex items-center gap-2"
            onClick={(event) => navigate("/admin/elections")}
            style={{
              backgroundColor:
                getCurrentPath() === "/admin/elections" ? "#93c5fd" : "",
            }}
          >
            <MdHowToVote />
            Election
          </li>
          <li
            className="w-full py-3 px-5 text-[20px] hover:bg-blue-300  border-t-[1px] cursor-pointer flex items-center gap-2"
            style={{
              backgroundColor:
                getCurrentPath() === "/admin/candidates" ? "#93c5fd" : "",
            }}
            onClick={(event) => navigate("/admin/candidates")}
          >
            <IoMdPersonAdd />
            Add Candidate
          </li>
          <li
            className="w-full py-3 px-5 text-[20px] hover:bg-blue-300  border-t-[1px] cursor-pointer flex items-center gap-2"
            style={{
              backgroundColor:
                getCurrentPath() === "/admin/view-candidates" ? "#93c5fd" : "",
            }}
            onClick={(event) => navigate("/admin/view-candidates")}
          >
            <IoPeople />
            View Candidates
          </li>
          <li
            className="w-full py-3 px-5 text-[20px] hover:bg-blue-300 border-b-[1px] border-t-[1px] cursor-pointer flex items-center gap-2"
            style={{
              backgroundColor:
                getCurrentPath() === "/admin/winner" ? "#93c5fd" : "",
            }}
            onClick={(event) => navigate("/admin/winner")}
          >
            <FaTrophy />
            Winner Announcement
          </li>
        </ul>
        <div className="w-full h-full flex items-end justify-center">
          <p
            className=" h-10 w-full flex justify-center items-center text-2xl border-t-2 border-b-2 border-black"
            onClick={handleExitClick}
          >
            <ImExit /> Exit
          </p>
        </div>
      </div>
    </>
  );
}

export function AdminNavBar() {
  const [isOpen, setStatus] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("api/admin/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuClick = () => {
    setStatus(!isOpen);
  };
  return (
    <>
      {isOpen ? (
        <AdminLeftNavBar
          open={isOpen}
          stateValue={isOpen}
          setState={setStatus}
        />
      ) : null}
      <nav className="h-20 bg-blue-300 w-full flex items-center justify-between px-5">
        <div className="h-15 w-15 flex items-center justify-center">
          {/* Menu bar */}
          <MdOutlineMenu className="text-4xl" onClick={handleMenuClick} />
        </div>
        <div className="flex items-center justify-center h-20">
          <h1 className="text-2xl font-extrabold">Welcome, Admin</h1>
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-700 text-white py-2 px-4 rounded-2xl hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

// Candidate Card
function CandidateCard({ name, votes, party }) {
  return (
    <div className="h-40 w-65 bg-blue-200 drop-shadow-2xl flex items-start px-5 justify-center flex-col gap-8">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-2xl font-bold">{votes} votes</p>
      <p className="text-2xl font-bold">{party}</p>
    </div>
  );
}

function ShortBox({ title, value, color }) {
  title = title || "N/A";
  value = value || "N/A";
  return (
    <div
      className={`h-40 w-65 ${color} drop-shadow-2xl flex items-start px-5 justify-center flex-col gap-8`}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export function Admin() {
  return (
    <>
      <AdminNavBar />
      <div className="flex items-center justify-center gap-25 m-auto my-8 py-5">
        <ShortBox title="Total Votes" value="100" color="bg-green-200" />
        <ShortBox title="Total Candidates" value="50" color="bg-yellow-200" />
        <ShortBox title="Total Voters" value="200" color="bg-purple-200" />
        <ShortBox title="Total Elections" value="10" color="bg-pink-200" />
      </div>
      {/* Majority candidates */}
      <div className="">
        <div className="h-10 flex items-center justify-center">
          <h1 className="text-2xl my-8 font-bold">Majority Candidates</h1>
        </div>

        <div className="flex justify-center flex-col items-center gap-10 flex-wrap  h-80 drop-shadow-2xl p-5">
          <CandidateCard name="John Doe" votes="50" party="Democratic Party" />
          <CandidateCard
            name="Jane Smith"
            votes="45"
            party="Republican Party"
          />
          <CandidateCard
            name="Bob Johnson"
            votes="40"
            party="Independent Party"
          />
        </div>
      </div>
    </>
  );
}
