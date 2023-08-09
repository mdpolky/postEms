import { render, screen, fireEvent } from "@testing-library/react-native";
import { Note } from "../components/Note";

beforeEach(() => {
  jest.useFakeTimers();
});

test("note shows text in a text component when loaded", () => {
  const noteMock = {
    id: "a4f928b1-bfbf-4db4-96e3-86565198d1d0",
    date: "8/1/2023, 12:34:56 PM",
    text: "This is the text property of a note",
    color: "#ffbdda",
  };
  const mockFn = jest.fn();

  render(<Note data={noteMock} dispatch={mockFn} />);

  const noteText = screen.getByText("This is the text property of a note");
  expect(noteText).toBeTruthy();
});
