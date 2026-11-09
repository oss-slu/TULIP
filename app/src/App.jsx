import Home from "./routes/home";
import IntakePage from "./routes/intake-page";
import AccountPage from "./routes/account-page";

function App() {
  const path = window.location.pathname;

  if (path === "/intake") {
    return <IntakePage />;
  }

  if (path === "/account") {
    return <AccountPage />
  }

  return <Home />;
}

export default App;
