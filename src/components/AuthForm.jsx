import "../App.css";

export const AuthForm = ({
  isCreating,
  onChangeUser,
  onChangePass,
  onClick,
  userLogin,
  userPassword,
}) => {
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
    marginTop: "var(--gap)",
  };

  return (
    <div className="d-flex-column justify-content-center" style={stylesCss}>
      <h3 className="p-2" style={labelStyle}>
        {isCreating
          ? "Create Username and Password"
          : "Login to catch up with the world:"}
      </h3>
      <form>
        <div className="form-group p-2">
          <label style={labelStyle}>User Name</label>
          <input
            type="text"
            className="form-control"
            style={inputStyle}
            onChange={onChangeUser}
            value={userLogin}
            placeholder={isCreating ? "Create username..." : "Login y'all"}
          ></input>
          <label style={labelStyle}>Password</label>
          <input
            type="text"
            className="form-control"
            style={inputStyle}
            onChange={onChangePass}
            value={userPassword}
            placeholder={
              isCreating
                ? "Create password...just letters please"
                : "Enter password"
            }
          ></input>

          <button
            className="btn btn-primary p-2"
            style={buttonStyle}
            onClick={onClick}
          >
            {isCreating ? "Create" : "Enter"}
          </button>
        </div>
      </form>
    </div>
  );
};
