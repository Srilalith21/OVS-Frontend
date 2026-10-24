export function storeInSessionStorage(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error storing data in sessionStorage:", error);
  }
}

export function getUserNameFromSessionStorage() {
  try {
    const userData = sessionStorage.getItem("userDashboard");
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(parsedData.userData.userName);
      return parsedData.userData.userName; // Assuming the user's name is stored under the "name" key
    }
  } catch (error) {
    console.error("Error retrieving data from sessionStorage:", error);
  }
  return null;
}
