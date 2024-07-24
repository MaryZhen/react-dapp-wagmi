// import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
//   const error: any = useRouteError();
//   console.error(error);
//   const textStr = error?.statusText || error?.message || ''

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* <p>
        <i>{ textStr }</i>
      </p> */}
    </div>
  );
}