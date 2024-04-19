import { render, screen } from "@testing-library/react";
import Toggle from "../components/Toggle";
import userEvent from "@testing-library/user-event";

describe("Toggle tests", () => {
  it("should trigger a change when clicked", async () => {
    const onChange = jest.fn();
    render(<Toggle isChecked={true} setIsCameraOn={onChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
