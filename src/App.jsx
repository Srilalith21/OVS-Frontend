import "./App.css";
import "./index.css";

import { Home } from "./pages/Home";

import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home />
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
