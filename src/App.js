import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/ProfilePage/Profile';
import TaskComponent from './components/TaskPage/TaskComponent';
// import Statement from './components/Reports/Statement';
import StaffList from './components/StaffPage/StaffList';
import Calendar from './components/CalendarPage/Calendar';
import Login from './components/Loginization/Login';
import Reports from './components/Reports/Reports';
import KnowledgeBaseChat from './components/KnowledgeBase/KnowledgeBaseChat';
// import { useNavigate } from 'react-router-dom';
// import ReportComponent from './components/Reports/Reports';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <div className='header'>
            <Header />
          </div>
          <div className="container">
            <div className='leftPanel'>
              <NavBar />
            </div>
            <div className='rightPanel'>
              <Routes>
                <Route path="/" element={<Profile />}> </Route>
                <Route path="/api/profile" element={<Profile />}> </Route>
                <Route path="/api/tasks" element={<TaskComponent />}> </Route>
                <Route path="/reports" element={<Reports />}> </Route>
                <Route path="/api/staff" element={<StaffList />}> </Route>
                <Route path="/api/calendar" element={<Calendar />}> </Route>
                <Route path="/api/messages" element={<KnowledgeBaseChat />}> </Route>
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;