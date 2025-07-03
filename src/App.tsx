
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import SessionMode from '@/pages/SessionMode';
import PomodoroMode from '@/pages/PomodoroMode';
import SessionRequest from '@/pages/SessionRequest';
import Matching from '@/pages/Matching';
import Session from '@/pages/Session';
import AuthEntry from '@/pages/AuthEntry';
import AuthExit from '@/pages/AuthExit';
import Stats from '@/pages/Stats';
import QRMatching from '@/pages/QRMatching';
import RemoteMatching from '@/pages/RemoteMatching';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/session-mode" element={<SessionMode />} />
        <Route path="/pomodoro-mode" element={<PomodoroMode />} />
        <Route path="/session-request" element={<SessionRequest />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/session" element={<Session />} />
        <Route path="/auth-entry" element={<AuthEntry />} />
        <Route path="/auth-exit" element={<AuthExit />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/qr-matching" element={<QRMatching />} />
        <Route path="/remote-matching" element={<RemoteMatching />} />
        <Route path="/join/:roomCode" element={<RemoteMatching />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
