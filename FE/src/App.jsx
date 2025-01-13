import { RouterProvider } from "react-router";
import "./App.css";
import Router from "./Router/Router";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const controller = new AbortController();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
