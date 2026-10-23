import "../App.css";
import "../index.css";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import { BASE_URL } from "../constants/constant";
import { AuthNav } from "../components/Nav";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const url = `${BASE_URL}/auth/login`;
      const loginData = {
        email,
        password,
      };
      const response = await axios.post(url, loginData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        sessionStorage.setItem(
          "userData",
          JSON.stringify(response.data.userData),
        );
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <AuthNav current="login" />
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl shadow-slate-200 sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Login</h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to cast your vote securely.
            </p>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="username"
              >
                Email
              </label>
              <input
                type="email"
                id="username"
                name="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="flex-1 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              onClick={(event) => handleLogin(event)}
            >
              Login
            </button>
            <button className="flex-1 rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200">
              Admin
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export function Register() {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [voterId, setVoterId] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (
      !userName.trim() ||
      !age ||
      !email.trim() ||
      !password ||
      !voterId.trim() ||
      !mobile.trim()
    ) {
      setMessage("Please complete all registration fields.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        userName: userName.trim(),
        age: Number(age),
        email: email.trim(),
        password,
        voterId: voterId.trim(),
        mobile: mobile.trim(),
      });

      setMessage("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setMessage(errorMessage);
    }
  };

  return (
    <>
      <AuthNav />
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl shadow-slate-200 sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Register to participate in secure online voting.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="age"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="18"
                required
                value={age}
                onChange={(event) => setAge(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="register-email"
              >
                Email
              </label>
              <input
                type="email"
                id="register-email"
                name="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="register-password"
              >
                Password
              </label>
              <input
                type="password"
                id="register-password"
                name="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="voter-id"
              >
                Voter ID
              </label>
              <input
                type="text"
                id="voter-id"
                name="voterId"
                required
                value={voterId}
                onChange={(event) => setVoterId(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="mobile"
              >
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                required
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <button
              className="sm:col-span-2 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="button"
              onClick={handleRegister}
            >
              Register
            </button>
            {message && (
              <p
                className="sm:col-span-2 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700"
                role="status"
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
