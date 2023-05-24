import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/ProfilePage/Profile';
import TaskComponent from './components/TaskPage/TaskComponent';
import { Route, Routes } from 'react-router-dom';
import Statement from './components/Statement/TaskPage/Statement';

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
            <Route path="/profile" element={<Profile />}> </Route>
            <Route path="/tasks" element={<TaskComponent />}> </Route>
            <Route path="/reports" element={<Statement />}> </Route>
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
