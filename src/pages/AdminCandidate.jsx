import { AdminNavBar } from "./Admin";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constants/constant";

function sanitizeInput(data) {
  data.candidateEmail = data.candidateEmail.trim();
  data.candidateName = data.candidateName.trim();
  data.candidateAge = Number(data.candidateAge);
  data.candidateGender = data.candidateGender.trim();
  data.candidateImageUrl = data.candidateImageUrl.trim();
  data.description = data.description.trim();
  data.partyName = data.partyName.trim();

  console.log("Sanitized Data:", data);

  return data;
}

async function postDataToServer(data) {
  try {
    const sanitizedData = sanitizeInput(data);
    const res = await axios.post(
      `${BASE_URL}/api/admin/create-candidate`,
      sanitizedData,
      {
        withCredentials: true,
      },
    );
    console.log(res.data);
  } catch (error) {
    console.error("Error in postDataToServer:", error);
  }
}

function handleSubmit(e) {
  try {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Convert age to number if needed
    data.candidateAge = Number(data.candidateAge);

    postDataToServer(data); // Post data to the server
  } catch (error) {
    alert("Error submitting form. Please check the console for details.");
    console.log("Error submitting form:", error);
  }
}

function InputField({ placeholder, type, name }) {
  return (
    <div className="flex flex-row mb-4 gap-5">
      <input
        type={type[0]}
        name={name[0]}
        placeholder={placeholder[0]}
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <input
        type={type[1]}
        name={name[1]}
        placeholder={placeholder[1]}
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
    </div>
  );
}

export default function AddCandidateForm() {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">Add Candidate</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col mb-4 gap-5">
          <InputField
            name={["candidateName", "partyName"]}
            placeholder={["Candidate Name", "Party Name"]}
            type={["text", "text"]}
          />
          <InputField
            name={["candidateAge", "candidateGender"]}
            placeholder={["Candidate Age", "Candidate Gender"]}
            type={["number", "text"]}
          />
          <InputField
            name={["candidateImageUrl", "description"]}
            placeholder={["Candidate Image URL", "Description"]}
            type={["text", "text"]}
          />
        </div>
        <div className="flex flex-row gap-4 justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Candidate
          </button>
          <button
            type="reset"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export function AdminCandidates() {
  return (
    <>
      <AdminNavBar />
      <div className="flex items-center justify-center mt-10">
        <AddCandidateForm />
      </div>
    </>
  );
}
