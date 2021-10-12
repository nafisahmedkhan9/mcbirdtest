import React from "react";
import { Link } from "react-router-dom";
import { Form, Alert, Row, Col } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import { validateInput } from "../utils";
import * as Components from "../../Components";
import CONST from "../../constant";
import * as UTILS from "../utils";
import URLS from "../../urls";
import { useCookies } from "react-cookie";

export default withRouter(function Login() {
  const history = useHistory();
  let access_token = UTILS.getAccessToken(useCookies);
  const [, setCookie] = useCookies([CONST.COOKIE_NAME]);
  let [validationErrorMessage, setValidationErrorMessage] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [email, setEmail] = React.useState("");
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
    setEmail("");
    setPassword("");
  };

  const onSubmit = async () => {
    setValidationErrorMessage("");
    if (!validateInput(email, "email")) {
      setValidationErrorMessage("Invalid email");
      return;
    } else if (!validateInput(password, "password")) {
      setValidationErrorMessage(
        "Password must include atleat one character, one number and one special chanracter. Should be of length greater then 8"
      );
      return;
    } else {
      setLoading(true);
      const loginResponse = await UTILS.apiAction(URLS.LOGIN_API, "post", {
        email: email,
        password,
      });

      if (loginResponse.success) {
        saveUserDataInCookies(loginResponse, history);
      } else {
        setValidationErrorMessage(loginResponse.status);
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
            <h2>Welcom back!</h2>
            <h6 style={{ color: "gray" }}>Please login to your account</h6>
            <Form onSubmit={(e) => e.preventDefault()}>
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
              {validationErrorMessage && (
                <Alert variant={"danger"}>{validationErrorMessage}</Alert>
              )}
              <Row className="mb-4">
                <Col>
                  <Form.Check type="checkbox" label="Remember me" />
                </Col>
                <Col style={{ textAlign: "end" }}>
                  <Link to={"#"} onClick={(e) => e.preventDefault()}>
                    Forgot Password
                  </Link>
                </Col>
              </Row>
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
                  <Link to={"/registration"}>
                    <Components.CustomButton
                      style={{ width: "100%" }}
                      className="mb-2"
                    >
                      Register
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
