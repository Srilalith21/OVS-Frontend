export function assignToState(data, setState) {
  const vlaues = data;
  setState((prevState) => ({
    ...prevState,
    electionStatus: vlaues.electionStatus,
    electionName: vlaues.electionName,
    currentStatus: vlaues.currentStatus,
    electionResultsDate: vlaues.electionResultsDate,
    electionStartDate: vlaues.electionStartDate,
    electionType: vlaues.electionType,
    electionCandidates: vlaues.electionCandidates,
    electionId: vlaues.electionId,
  }));
}
