import logo from "../Resources/logoNavbar.png";
import "./LoadingPage.css";

function LoadingPage() {
  return (
    <div className="loadingPage">
      <div className="logoContainer">
        <img
          src={logo}
          alt="Logo de la compañía"
          className="logoLoading rotating"
        />
      </div>
    </div>
  );
}

export default LoadingPage;
