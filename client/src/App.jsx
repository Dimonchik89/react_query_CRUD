import { useState } from "react";
import Todos from "./components/Todos";
import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Todos />
      <Form />
    </>
  );
}

export default App;
