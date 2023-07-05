import { render } from "@testing-library/react";
import HomePage from "./page";

it("renders the home page unchanged", () => {
  const { container } = render(<HomePage />);
  expect(container).toMatchSnapshot();
});
