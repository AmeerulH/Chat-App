import logo from "./logo.svg";
import "./App.css";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App">
      <h1>Chat App</h1>
      <header className="App-header">
        <Chat></Chat>
      </header>
    </div>
  );
}

export default App;
