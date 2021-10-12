import { Route, Router, Switch, Redirect } from "react-router-dom";
import Customers from "./Pages/AdminPages/customers";
import Login from "./Pages/PublicPages/login";
import Registration from "./Pages/PublicPages/registration";
import PageNotFound from "./Pages/pageNotFound";
import { createBrowserHistory } from "history";
import { Card } from "react-bootstrap";
import "./App.css";
import { useCookies } from "react-cookie";
import * as UTILS from "./Pages/utils"

const hist = createBrowserHistory();

function App() {
  let access_token = UTILS.getAccessToken(useCookies)

  return (
    <Card style={{ border: "none", marginLeft: "auto", marginRight: "auto", width: "50%", textAlign: "center" }}>
      <Card.Body>
        <Router history={hist}>
          <Switch>
            <Route path="/login" exact={true} component={Login}></Route>
            <Route
              path="/registration"
              exact={true}
              component={Registration}
            ></Route>
            <Route path="/customers" exact={true} component={Customers}></Route>
            <Route
              path="/page_not_found"
              exact={true}
              component={PageNotFound}
            />
            {!access_token ? (
              <Redirect to="/login" />
            ) : (
              <Redirect to="/page_not_found" />
            )}
          </Switch>
        </Router>
      </Card.Body>
      <footer style={{ textAlign: "center", margin: "15px", color: "gray" }}>
        Terms of use Privacy Policy
      </footer>
    </Card>
  );
}

export default App;
