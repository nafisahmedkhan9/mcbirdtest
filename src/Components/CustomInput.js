import React from "react";
import { Form } from "react-bootstrap"

export default function CustomInput(props) {
  return (
    <Form.Group className={props.forGroupClass}>
      <Form.Control
        className={"border-radius-20"}
        onChange={(e) => props.onChange && props.onChange(e)}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
      />
    </Form.Group>
  );
}
