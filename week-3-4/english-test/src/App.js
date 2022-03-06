import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Register } from './components/register/Register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Login } from './components/login/Login';

function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      <Login />
    </div>
  );
}

export default App;
