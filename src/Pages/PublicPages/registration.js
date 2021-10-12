import React from "react";
import { Link } from "react-router-dom";
import { Form, Alert, Row, Col } from "react-bootstrap";
import { validateInput } from "../utils";
import { useHistory, withRouter } from "react-router-dom";
import * as Components from "../../Components";
import { useCookies } from "react-cookie";
import CONST from "../../constant";
import URLS from "../../urls";
import * as UTILS from "../../Pages/utils";

export default withRouter(function Registration() {
  let history = useHistory();
  let access_token = UTILS.getAccessToken(useCookies);
  const [, setCookie] = useCookies([CONST.COOKIE_NAME]);
  let [validationErrorMessage, setValidationErrorMessage] = React.useState("");
  let [name, setName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [password1, setPassword1] = React.useState("");
  let [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (access_token) {
      history.push("/customers");
    }

    return () => {
      resetState();
    };
    // eslint-disable-next-line
  }, []);

  const resetState = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const onSubmit = async () => {
    setValidationErrorMessage("");
    if (!validateInput(name, "name")) {
      setValidationErrorMessage("In name Only letters and spaces are allowed");
    } else if (!validateInput(email, "email")) {
      setValidationErrorMessage("Invalid email");
    } else if (!validateInput(password, "password")) {
      setValidationErrorMessage(
        "Password must include atleat one character, one number and one special chanracter. Should be of length greater then 8"
      );
    } else if (password1 !== password) {
      setValidationErrorMessage("Both passwords are not same try again!");
    } else {
      var details = {
        password,
        name,
        email,
      };
      setLoading(true);
      const signupResponse = await UTILS.apiAction(
        URLS.SIGNUP_API,
        "post",
        details
      );

      if (signupResponse.success) {
        saveUserDataInCookies(signupResponse, history);
      } else {
        setValidationErrorMessage(signupResponse.status);
      }
      setLoading(false);
    }
  };

  const saveUserDataInCookies = (apiResponse, history) => {
    setCookie(CONST.TOKEN_KEY, apiResponse.data.access_token, { path: "/" });
    setCookie("user", apiResponse.data.user, { path: "/" });
    setCookie("loginTime", new Date(), { path: "/" });
    history.push(CONST.CUSTOMERS_LINK);
    return;
  };

  return (
    <Row>
      <Col>
        {!loading ? (
          <>
            <h2>Register</h2>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Components.CustomInput
                forGroupClass="mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
              <Components.CustomInput
                forGroupClass="mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <Components.CustomInput
                forGroupClass="mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <Components.CustomInput
                forGroupClass="mb-3"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
              {validationErrorMessage && (
                <Alert variant={"danger"}>{validationErrorMessage}</Alert>
              )}
              <Row>
                <Col md={12}>
                  <Components.CustomButton
                    onClick={() => onSubmit()}
                    style={{ width: "100%" }}
                    className="mb-2"
                    type="submit"
                  >
                    Submit
                  </Components.CustomButton>
                </Col>
                <Col md={12}>
                  <Link to={"/login"}>
                    <Components.CustomButton
                      style={{ width: "100%" }}
                      className="mb-2"
                    >
                      Login
                    </Components.CustomButton>
                  </Link>
                </Col>
              </Row>
            </Form>
          </>
        ) : (
          "Loading..."
        )}
      </Col>
    </Row>
  );
});
