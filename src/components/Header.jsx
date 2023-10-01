import "../App.css";

const stylesCss = {
  width: "600px",
  height: "180px",
  background: "var(--background-color)",
  borderRadius: "var(--border-radius-m)",
  borderColor: "var(--header-text)",
  marginBottom: "var(--gap-xs)",
};
const inputStyles = {
  width: "100%",
  background: "var(--background-color)",
  border: "none",
  color: "var(--header-text)",
};
const buttonStyles = {
  width: "68px",
  borderRadius: "var(--border-radius-s)",
  marginRight: "10px",
  marginBottom: "var(--gap)",
};

const errorStyle = {
  color: "var(--errors-text)",
  background: "var(--background-error)",
  borderRadius: "var(--border-radius-s)",
  height: "25px",
  marginBottom: "var(--gap-xs)",
  marginLeft: "var(--gap-xs)",
  padding: "1px",
};

export const Header = ({
  input,
  onChange,
  onClick,
  disabled,
  placeholder,
  overflow,
}) => {
  return (
    <div className="card" style={stylesCss}>
      <div className="card-body">
        <input
          type="text"
          onChange={onChange}
          maxLength={140}
          placeholder={placeholder}
          className="card-body"
          style={inputStyles}
          value={input}
        ></input>
      </div>
      <div
        className={
          overflow
            ? "d-flex justify-content-between align-items-center"
            : "d-flex justify-content-end align-items-center"
        }
      >
        <p style={errorStyle} className={!overflow && "hidden"}>
          The tweet can't contain more than 140 characters
        </p>

        <button
          type="button"
          className={
            overflow
              ? "btn btn-secondary p-2 justify-content-end align-items-center"
              : "btn btn-primary p-2 justify-content-end align-items-center"
          }
          onClick={onClick}
          style={buttonStyles}
          disabled={disabled}
        >
          Tweet
        </button>
      </div>
    </div>
  );
};
