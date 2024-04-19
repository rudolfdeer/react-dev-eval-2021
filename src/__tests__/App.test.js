import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../components/App";

test("App renders successfully", () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const element = screen.getByText(/SlapSticker/i);

  expect(element).toBeInTheDocument();
});
