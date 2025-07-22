import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./layouts/login/Login";
import PrescriptionChecker from "./layouts/prescription/PreScriptionChecker";
import PrescriptionLayout from "./layouts/prescription/PrescriptionLayout";
import SideBarLayout from "./layouts/sidebar/SideBarLayout";
import PrescriptionScanner from "./layouts/prescription-scan/PrescriptionScanner";
import Result from "./layouts/prescription-result/PrescriptionResult";
import PatientsPage from "./layouts/patients/PatientsPage";
import HomePage from "./layouts/home/HomePage";
import NotificationsPage from "./layouts/notifications/NotificationsPage";
import SettingsPage from "./layouts/settings/SettingsPage";
import ChatbotPage from "./layouts/chatbot/ChatbotPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/MediTrackWeb" element={<Login />} />
        <Route path="/home" element={<SideBarLayout />}>
          {/* SideBar nested */}
          <Route index element={<HomePage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="chatbot" element={<ChatbotPage />} />
          {/* <Route path="medical-record" element={<MedicalRecord />} /> */}
          <Route path="prescription" element={<PrescriptionLayout />}>
            {/* Prescription nested  */}
            <Route index element={<PrescriptionChecker />} />
            <Route
              path="prescription-check"
              element={<PrescriptionChecker />}
            />
            <Route path="prescription-scan" element={<PrescriptionScanner />} />
            <Route path="result" element={<Result />} />
          </Route>{" "}
          {/* Add more subpages later */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
