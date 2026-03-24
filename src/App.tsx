import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { PatientDashboard } from './pages/PatientDashboard';
import { ClinicalDashboard } from './pages/ClinicalDashboard';
import { LegacyPlan } from './pages/LegacyPlan';
import { ClinicalMatches } from './pages/ClinicalMatches';
import { CommandCenter } from './pages/CommandCenter';
import { FleetLogistics } from './pages/FleetLogistics';
import { MedicalRecords } from './pages/MedicalRecords';
import { SupportCommunity } from './pages/SupportCommunity';
import { CareTeam } from './pages/CareTeam';
import { SettingsPage } from './pages/SettingsPage';
import { MatchRequest } from './pages/MatchRequest';
import { LoginPage } from './pages/LoginPage';
import { ClinicalLoginPage } from './pages/ClinicalLoginPage';
import { JoinRegistry } from './pages/JoinRegistry';
import { SupportPage } from './pages/SupportPage';
import { AppointmentBooking } from './pages/AppointmentBooking';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clinical-login" element={<ClinicalLoginPage />} />
        <Route path="/join" element={<JoinRegistry />} />
        
        {/* Patient Routes */}
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/legacy-plan" element={<LegacyPlan role="patient" />} />
        <Route path="/records" element={<MedicalRecords />} />
        <Route path="/community" element={<SupportCommunity />} />
        <Route path="/care-team" element={<CareTeam />} />
        <Route path="/support" element={<SupportPage role="patient" />} />
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        
        {/* Clinical Routes */}
        <Route path="/clinical-dashboard" element={<ClinicalDashboard />} />
        <Route path="/legacy-plan-clinical" element={<LegacyPlan role="clinical" />} />
        <Route path="/matches" element={<ClinicalMatches />} />
        <Route path="/match-request" element={<MatchRequest />} />
        <Route path="/command-center" element={<CommandCenter />} />
        <Route path="/fleet" element={<FleetLogistics />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/support-clinical" element={<SupportPage role="clinical" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
