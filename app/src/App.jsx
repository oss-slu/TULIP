import Home from "./routes/home";
import IntakePage from "./routes/intake-page";

function App() {
  const path = window.location.pathname;

  if (path === "/intake") {
    return <IntakePage />;
  }

  return <Home />;
}

export default App;
