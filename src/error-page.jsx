import { useRouteError } from "react-router-dom";
import './Error.css';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <div className="container">
      <div className="copy-container center-xy">
        <p className="text">
          {error.status}-
          <i>{error.statusText || error.message}</i>
        </p>

        <span className="handle"></span>
        <div className="center">
          <a className="btn-white" href="/">Back to home</a>
        </div>
      </div>
    </div>
    </div>
  );
}