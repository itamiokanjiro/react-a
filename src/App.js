/*
import logo from './logo.svg';
*/
import CookieSetter from './CookieSetter';
import Hello from './Hello';
import './App.css';
import CookieReader from './CookieReader';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>你好</p>
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        */}
        <Hello name="名稱" />
        <Hello name="React新手" />
        <h1>讀取 Cookie 範例</h1>
        <CookieReader cookieName="myToken" />
        <h1>Cookie 測試</h1>
        <CookieSetter />
      </header>

    </div>
    
    
  );
}

export default App;
