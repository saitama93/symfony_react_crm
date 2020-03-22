import React from "react";

const Select = ({ name, value, label, error, onChange, children }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        onChange={onChange}
        value={value}
        name={name}
        id={name}
        className={"form-control" + (error && "is-invalid")}
      >
        {children}
      </select>
      <p className="invalid-feedback">{error}</p>
    </div>
  );
};

export default Select;
