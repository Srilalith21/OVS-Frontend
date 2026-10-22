export function HomeNav() {
  return (
    <div className="h-20 w-full bg-blue-950 flex items-center justify-between">
      <h1 className="h-full w-1/3 text-white flex items-center mx-3.5 font-bold text-4xl">
        Online Voting System
      </h1>
      <div className="flex items-center justify-end gap-5 h-full w-1/3 mx-3.5">
        <button className="bg-cyan-400 font-bold rounded-2xl border-0 px-10 py-2 hover:bg-cyan-500">
          Login
        </button>
        <button className="bg-orange-400 font-bold rounded-2xl border-0 px-10 py-2 hover:bg-orange-600">
          Register
        </button>
      </div>
    </div>
  );
}

export function LoggedInNav() {
  return (
    <div className="h-20 w-full bg-blue-950 flex items-center justify-between">
      <h1 className="h-full w-1/3 text-white flex items-center mx-3.5 font-bold text-4xl">
        Online Voting System
      </h1>
      <div className="flex items-center justify-end gap-5 h-full w-1/3 mx-3.5">
        <p className="text-white text-2xl">
          Welcome, John Doe{/** Make this dynamic */}
        </p>{" "}
        <button className="bg-red-700  text-white font-bold rounded-2xl border-0 px-10 py-2 hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
}
