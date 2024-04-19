import { fireEvent, render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../components/App";
import React from "react";
import HomePage from '../components/HomePage';

describe("HomePage tests", () => {
  test("input has default value SLAPPE!", async () => {
    render(
      <HomePage/>
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("SLAPPE!");
  });

  test("input should be updated by typed text", async () => {
    render(
      <HomePage/>
    );
    const input = await screen.findByRole("textbox");
    await userEvent.clear(input);
    expect(input).toHaveValue("");
    await userEvent.type(input, "test");
    await waitFor(() => expect(input).toHaveValue("test"));
  });

  test("render stiker button", async () => {
    render(
      <HomePage/>
    );
    const button = screen.getAllByRole('button')[0];
    expect(button).toBeInTheDocument();
  });
});
