import { Link } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import Router from './Router';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Router/>
      <button>
        <Link to="/signup">Sign Up</Link>
      </button>
    </div>
  );
}

export default App;
