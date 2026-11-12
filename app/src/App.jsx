import Home from "./routes/home";
import IntakePage from "./routes/intake-page";
import AccountPage from "./routes/account-page";
import SubmissionQueue from "./routes/submission-queue";

function App() {
  const path = window.location.pathname;

  if (path === "/intake") {
    return <IntakePage />;
  }

  if (path === "/account") {
    return <AccountPage />;
  }
  if (path === "/submission-queue") {
    return <SubmissionQueue />;
  }

  return <Home />;
}

export default App;
