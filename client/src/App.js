import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/Landing Page/LandingPage";
import Home from "./components/Home/Home";
import CreatePage from "./components/Create Page/CreatePage";
import DetailPage from "./components/Detail Page/DetailPage";

import "./App.css";

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/Create" component={CreatePage} />
          <Route path="/Detail/:id" component={DetailPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
