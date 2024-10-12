import { Routes, Route } from "react-router-dom"
import Login from './components/authentication/Login'
import Dashboard from "./components/dashboard/Dashboard";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </div>
  );
}

export default App;
