import React from "react";

export default function Input(props) {
  return (
    <div className="input__container">
      <label className="input__label" htmlFor={props.name}>
        {props.title}
      </label>
      <input
        className="input"
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
    </div>
  );
}
