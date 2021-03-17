import "./styles/GitFooter.css";
import gitLogo from "./img/GitHub-Mark-32px.png";
const GitFooter = () => {
  return (
    <div className="git-footer">
      <a href="https://github.com/nnakapeliukh/Battleship">
        <img src={gitLogo} alt="Github Page" />
      </a>
    </div>
  );
};

export default GitFooter;
