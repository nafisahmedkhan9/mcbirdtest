import React from "react";
import { Link } from "react-router-dom";
import * as UTILS from "../Pages/utils"
import { useCookies } from "react-cookie";

export default function PageNotFound() {
  let access_token = UTILS.getAccessToken(useCookies)
  
  return (
    <div>
      <h1>Page Not Found</h1>
      <h2>Available Links</h2>
      {access_token ? (
        <Link to={"/users"}>Users</Link>
      ) : (
        <>
          <Link to={"/login"} style={{ marginRight: "15px" }}>
            Login
          </Link>
          <Link to={"/registration"} style={{ marginRight: "15px" }}>
            Registration
          </Link>
        </>
      )}
    </div>
  );
}
