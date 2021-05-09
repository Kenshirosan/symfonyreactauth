import React from "react";
import { Link } from "react-router-dom";
import Home from "./components/Home"

const App = () => {
  return (
    <main className="app">
        <Home />
      <section className="task-list">
        <div>
            <p>testing react with symfony</p>
            <Link to={`/`}>Home</Link>
            <a href="/">Home a href</a>
        </div>
      </section>
    </main>
  );
};

export default App;
