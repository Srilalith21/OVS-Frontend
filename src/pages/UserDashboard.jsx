import axios from "axios";
import {
  storeInSessionStorage,
  getUserNameFromSessionStorage,
} from "../utils/storage";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constant";
import { LoggedInNav } from "../components/Nav.jsx";

function DisplayCards(props) {
  const { title, electionCount } = props;
  return (
    <div className="card-container">
      <div className="card h-30 bg-amber-300 shadow-amber-600 w-[270px] flex flex-col items-center justify-center rounded-2xl border-2 gap-3 border-black">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="font-bold text-[20px]">{electionCount}</p>
      </div>
    </div>
  );
}

function ElectionCard(props) {
  const navigate = useNavigate();
  const { candidateName, candidateImage, party, id } = props;
  const handleVote = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/vote/${id}`, {
        withCredentials: true,
      });

      if (res.data.statuscode === 401) {
        setTimeout(() => {
          alert("You have already voted in this election");
        }, 0);
        return;
      }

      if (res.data.status === "success") {
        event.target.style.backgroundColor = "gray";
        event.target.disabled = true;
        setTimeout(() => {
          alert("Vote casted successfully");
        }, 0);
      } else {
        setTimeout(() => {
          alert("You have already voted in this election");
        }, 0);
      }
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
  return (
    <div className="card h-30 w-full bg-amber-300 shadow-amber-600 w-[270px] flex flex-row items-center justify-evenly rounded-2xl border-[1px] gap-3 border-black shadow-2xs">
      <img
        className="h-20 w-20 rounded-full border-2 border-red-600"
        src={candidateImage}
        alt=""
      />
      <div>
        <h2 className="text-2xl font-bold ">{candidateName}</h2>
        <p className=" text-[20px]">Party : {party}</p>
      </div>
      <button
        className="px-13 font-bold text-white rounded-2xl py-2 bg-blue-900 shadow-xl/30 hover:bg-red-900"
        onClick={() => handleVote()}
      >
        Vote
      </button>
    </div>
  );
}

export function UserDashboard() {
  const [userName, setUserName] = useState("");
  const [totalElections, setTotalElections] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [userData, setUserData] = useState({});
  const [totalCandidates, setTotalCandidates] = useState(0);

  const [electionData, setElectionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/dashboard`, {
          withCredentials: true,
        });
        storeInSessionStorage("userDashboard", res.data);
        setUserData(res.data.userData);
        setUserName(res.data.userData.userName);
        setTotalElections(res.data.electionData.length);
        setTotalVotes(res.data.userData.voteCount);
        setTotalCandidates(res.data.candidateCount);
        setElectionData(res.data.electionData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <LoggedInNav name={!userName ? "Guest" : userName} />
      <div className="h-[200px] w-10/12 mx-auto my-4 rounded-2xl bg-blue-200 border-2 border-black flex items-center justify-evenly">
        <DisplayCards
          title="Total Elections"
          count={totalElections ? totalElections : "N/A"}
          electionCount={Object.keys(electionData).length}
        />
        <DisplayCards
          title="Total Votes"
          count={totalVotes ? totalVotes : "N/A"}
        />
        <DisplayCards
          title="Total Candidates"
          count={totalCandidates ? totalCandidates : "N/A"}
        />
      </div>
      {/* DIV FOR PROFILE CARD AND VOTE */}
      <div className="h-[100VH] w-10/12 mx-auto my-4 rounded-2xl bg-gray-300 border-2 border-black flex items-center justify-evenly">
        <div className="h-[45%] w-[30%] bg-red-300 rounded-3xl flex flex-col items-center justify-evenly border-2 border-black">
          <h1 className="text-center text-3xl">Profile</h1>
          <div className="text-4xl font-extrabold h-25 w-25 rounded-full bg-emerald-700 flex justify-center items-center text-emerald-100">
            {userName ? userName[0].toUpperCase() : "N/A"}
          </div>
          <p className="font-mono font-[900]">
            Name : {userName ? userName.toUpperCase() : "N/A"}
          </p>
          <p className="font-mono font-[900]">Age : {userData.age || "N/A"}</p>
          <p className="font-mono font-[900]">
            Vote Status: {userData.voteStatus.status ? "Voted" : "Not Voted"}
          </p>
        </div>
        <div className="h-[80%] w-[60%] bg-green-300 rounded-3xl flex flex-col items-center justify-evenly border-2 border-black  ">
          <h1 className="text-center text-3xl font-extrabold">Vote Here</h1>
          <div className="h-[80%] w-[90%] flex flex-col items-center justify-evenly overflow-y-scroll gap-5">
            {/* DO HERE */}
            {electionData.electionCandidates ? (
              electionData.electionCandidates.map((candidate) => (
                <ElectionCard
                  key={candidate._id}
                  id={candidate._id}
                  candidateName={candidate.candidateName.toUpperCase()}
                  candidateImage={candidate.candidateImageUrl}
                  party={candidate.partyName.toUpperCase()}
                />
              ))
            ) : (
              <p className="text-center text-xl font-bold">
                No candidates available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
