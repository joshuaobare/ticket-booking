import { Link } from "react-router-dom";
import errorimg from "../assets/404.webp";
import "../styles/ErrorPage.css"

const ErrorPage = () => {
  return (
    <div className="error-page">
      <Link to="/">
        <img src={errorimg} className="error-image"/>
        <div id="info">
          <h3>This page could not be found</h3>
          <button className="error-page-btn">Go Home</button>
        </div>
      </Link>
    </div>
  );
};

export default ErrorPage;
