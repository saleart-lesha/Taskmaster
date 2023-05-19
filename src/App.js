import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';

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
        <div className='rightPanel'>111</div>
      </div>
    </div>
  );
}

export default App;
