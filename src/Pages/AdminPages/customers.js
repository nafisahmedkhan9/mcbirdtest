import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table } from "react-bootstrap";
import CustomButton from "../../Components/CustomButton";
import { useCookies } from "react-cookie";
import * as UTILS from "../utils";
import CONST from "../../constant";
import URLS from "../../urls";

export default function Users() {
  const [, , removeCookie] = useCookies([CONST.COOKIE_NAME]);
  var history = useHistory();
  const access_token = UTILS.getAccessToken(useCookies);
  let [customers, setCustomers] = React.useState({ results: [] });
  let [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!access_token) {
      history.push("/login");
    }
    fetchCustomers();
    // eslint-disable-next-line
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    let customerResponse = await UTILS.apiAction(
      URLS.CUSTOMER_API,
      "get",
      null,
      access_token
    );
    setCustomers(customerResponse);
    setLoading(false);
  };

  const onLogout = () => {
    UTILS.handleLogout(history, removeCookie);
  };

  const tableData =
    customers.results.length > 0 &&
    customers.results.map((data, index) => {
      return (
        <tr key={"customer-" + index}>
          <td>{data.name}</td>
          <td>{data.gender}</td>
          <td>{data.mobile_number}</td>
        </tr>
      );
    });

  return (
    <Row>
      <Col md={6} className="mb-3" style={{ textAlign: "start" }}>
        <h3>Customer Listing</h3>
      </Col>
      <Col md={6} className="mb-3" style={{ textAlign: "end" }}>
        <CustomButton onClick={() => onLogout()} className="mb-2">
          Logout
        </CustomButton>
      </Col>
      <Col>
        {!loading ? (
          <Table responsive size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>{tableData.length > 0 ? tableData : <tr><td colSpan="3">No Data</td></tr>}</tbody>
          </Table>
        ) : (
          "Loading..."
        )}
      </Col>
    </Row>
  );
}
