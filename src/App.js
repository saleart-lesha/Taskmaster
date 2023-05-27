import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/ProfilePage/Profile';
import TaskComponent from './components/TaskPage/TaskComponent';
import { Route, Routes } from 'react-router-dom';
import Statement from './components/Statement/TaskPage/Statement';
import StaffList from './components/StaffPage/StaffList';
import Calendar from './components/CalendarPage/Calendar';

function App() {
  return (
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
            <Route path="/reports" element={<Statement />}> </Route>
            <Route path="/employees" element={<StaffList />}> </Route>
            <Route path="/calendar" element={<Calendar />}> </Route>
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
