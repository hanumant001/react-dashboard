import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reports from "../../Pages/Reports";
import Dashboard from "../../Pages/Dashbaord";
import OverView from "../../Pages/OverView";
import Analytics from "../../Pages/Analytics/Analytics";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/Analytics" element={<Analytics />}></Route>
      <Route path="/OverView" element={<OverView />}></Route>
      <Route path="/Reports" element={<Reports />}></Route>
    </Routes>
  );
}
export default AppRoutes;
