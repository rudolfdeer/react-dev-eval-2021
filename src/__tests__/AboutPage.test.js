import { render, screen } from "@testing-library/react";
import AboutPage from '../components/AboutPage';

test("ABoutPage renders successfully", () => {
  render(
    <AboutPage/>
  );

  const element = screen.getByText(/About page/i);

  expect(element).toBeInTheDocument();
});