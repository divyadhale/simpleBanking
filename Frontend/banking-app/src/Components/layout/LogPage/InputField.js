import React from "react";
const InputField = ({
    label,
    name,
    type,
    value,
    onChange,
    error,
    required,
}) => {
    return (
        <div className="form-group reg-form-group2">
            <div className="reg-label-container">
                <label htmlFor={name} className="reg-label">Please enter your {label}</label>
            </div>
            <div
                className={`input-container ${error
                        ? "error"
                        : value && !error
                            ? "valid"
                            : ""
                    }`}
            >
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="input-field"
                    required={required}
                />
                {error ? (
                    <span className="icon error-icon">!</span>
                ) : value && !error ? (
                    <span className="icon valid-icon">✔</span>
                ) : null}
            </div>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};
export default InputField;