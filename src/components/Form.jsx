import "../App.css";

export const Form = ({ label, onClick, onChange, userInput }) => {
  const stylesCss = {
    backgroundColor: "--var(background-body)",
    color: "--var(posts-text)",
    margin: "4px",
  };
  const labelStyle = {
    color: "white",
  };

  const inputStyle = {
    width: "600px",
    height: "60px",
    background: "var(--background-color)",
    borderColor: "var(--posts-text)",
    borderRadius: "var(--border-radius-m)",
    color: "var(--header-text)",
    marginBottom: "12px",
  };

  const buttonStyle = {
    width: "68px",
    borderRadius: "var(--border-radius-s)",
    marginRight: "10px",
    marginBottom: "var(--gap)",
  };

  return (
    <div className="d-flex row justify-content-center" style={stylesCss}>
      <h3 className="p-2" style={labelStyle}>
        {label}
      </h3>
      <form>
        <div className="form-group p-2">
          <label style={labelStyle}>User Name</label>
          <input
            type="text"
            className="form-control"
            style={inputStyle}
            onChange={onChange}
            value={userInput}
            placeholder="Update or create username..."
          ></input>
          <div className="d-flex justify-content-end">
            <button
              //   type="submit"
              className="btn btn-primary p-2 align-items-center"
              style={buttonStyle}
              onClick={onClick}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
