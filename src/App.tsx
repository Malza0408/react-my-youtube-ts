import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";
import SearchResult from "./pages/SearchResult";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import { ErrorBoundary } from "react-error-boundary";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";
import NavbarContainer from "./containers/NavbarContainer";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <NavbarContainer />
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/play" component={Play} />
          <Route exact path="/searchResult" component={SearchResult} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  );
}

export default App;
