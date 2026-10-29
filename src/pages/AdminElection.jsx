import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { AdminNavBar } from "./Admin";

import { BASE_URL } from "../constants/constant";

const initialForm = {
  electionName: "",
  electionType: "general",
  electionStartDate: "",
  electionResultsDate: "",
};

function ElectionStatus({ status }) {
  const styles = {
    upcoming: "bg-amber-100 text-amber-800",
    ongoing: "bg-emerald-100 text-emerald-800",
    completed: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status || "upcoming"}
    </span>
  );
}

export function AdminElection() {
  const [elections, setElections] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadElections = async () => {
      try {
        setError("");
        const response = await axios.get(`${BASE_URL}/api/admin/elections`, {
          withCredentials: true,
        });
        setElections(response.data.data || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load elections. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadElections();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/create-election`,
        { ...form, electionCandidates: [] },
        { withCredentials: true },
      );
      setElections((currentElections) => [
        response.data.data,
        ...currentElections,
      ]);
      setForm(initialForm);
      setSuccess("Election created successfully.");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to create the election. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (electionName) => {
    if (
      !window.confirm(`Delete "${electionName}"? This action cannot be undone.`)
    ) {
      return;
    }

    setDeleting(electionName);
    setError("");
    setSuccess("");

    try {
      await axios.delete(
        `${BASE_URL}/api/admin/delete-election/${encodeURIComponent(
          electionName,
        )}`,
        { withCredentials: true },
      );
      setElections((currentElections) =>
        currentElections.filter(
          (election) => election.electionName !== electionName,
        ),
      );
      setSuccess("Election deleted successfully.");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to delete the election. Please try again.",
      );
    } finally {
      setDeleting("");
    }
  };

  return (
    <>
      <AdminNavBar />
      <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <MdAdd className="text-2xl text-blue-600" />
              <h2 className="text-xl font-bold">Create an election</h2>
            </div>
            <form
              onSubmit={handleCreate}
              className="grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:items-end"
            >
              <label className="space-y-2 lg:col-span-2">
                <span className="text-sm font-medium text-slate-700">
                  Election name
                </span>
                <input
                  name="electionName"
                  required
                  value={form.electionName}
                  onChange={handleChange}
                  placeholder="2026 General Election"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Type</span>
                <select
                  name="electionType"
                  value={form.electionType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="general">General</option>
                  <option value="local">Local</option>
                  <option value="state">State</option>
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">
                  Start date
                </span>
                <input
                  name="electionStartDate"
                  type="date"
                  required
                  value={form.electionStartDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">
                  Results date
                </span>
                <input
                  name="electionResultsDate"
                  type="date"
                  required
                  value={form.electionResultsDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 lg:col-span-5 lg:justify-self-end"
              >
                {submitting ? "Creating..." : "Create election"}
              </button>
            </form>
          </section>

          {(error || success) && (
            <p
              className={`mb-6 rounded-lg px-4 py-3 text-sm ${
                error
                  ? "bg-red-50 text-red-700"
                  : "bg-emerald-50 text-emerald-700"
              }`}
              role="status"
            >
              {error || success}
            </p>
          )}

          <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-8">
              <div>
                <h2 className="text-xl font-bold">All elections</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {elections.length} election{elections.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold sm:px-8">Name</th>
                    <th className="px-5 py-4 font-semibold">Type</th>
                    <th className="px-5 py-4 font-semibold">Start date</th>
                    <th className="px-5 py-4 font-semibold">Results date</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold sm:px-8">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        Loading elections...
                      </td>
                    </tr>
                  ) : elections.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        No elections have been created yet.
                      </td>
                    </tr>
                  ) : (
                    elections.map((election) => (
                      <tr key={election._id} className="hover:bg-slate-50">
                        <td className="px-5 py-4 font-semibold sm:px-8">
                          {election.electionName}
                        </td>
                        <td className="px-5 py-4 capitalize">
                          {election.electionType}
                        </td>
                        <td className="px-5 py-4">
                          {/* {formatDate(election.electionStartDate)} */}
                        </td>
                        <td className="px-5 py-4">
                          {/* {formatDate(election.electionResultsDate)} */}
                        </td>
                        <td className="px-5 py-4">
                          <ElectionStatus status={election.electionStatus} />
                        </td>
                        <td className="px-5 py-4 text-right sm:px-8">
                          <button
                            type="button"
                            title={`Delete ${election.electionName}`}
                            aria-label={`Delete ${election.electionName}`}
                            disabled={deleting === election.electionName}
                            onClick={() => handleDelete(election.electionName)}
                            className="inline-flex rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
