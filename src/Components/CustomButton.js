import React from "react";
import { Button } from "react-bootstrap"

export default function CustomButton(props) {
  return (
    <Button
      onClick={() => props.onClick && props.onClick()}
      style={{ background: "#61acb3", borderRadius: "20px", ...props.style }}
      className={props.className}
      variant="primary"
      type={props.type}
    >
      {props.children}
    </Button>
  );
}
