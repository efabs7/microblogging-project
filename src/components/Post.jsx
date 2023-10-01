import "../App.css";

const stylesCss = {
  height: "120px",
  width: "600px",
  background: "var(--background-text)",
  borderRadius: "var(--border-radius-m)",
  borderColor: "var(--background-body)",
  padding: "0px",
  margin: "var(--gap-xs)",
};
const textStyle = {
  marginRight: "125px",
  color: "var(--posts-text)",
  margin: "0px",
  padding: "0px",
  marginLeft: "var(--gap-s)",
};
const headerStyle = {
  margin: "0px",
  padding: "0px",
};

export const Post = ({ date, content, username }) => {
  return (
    <div className="card" style={stylesCss}>
      <div className="card-body">
        <div className="d-flex justify-content-between" style={headerStyle}>
          <p className="card-text p-2 text-muted">{username}</p>
          <p className="card-text p-2 text-muted">{date}</p>
        </div>
        <div className="justify-content-start" style={textStyle}>
          <p className="card-text p-2">{content}</p>
        </div>
      </div>
    </div>
  );
};
