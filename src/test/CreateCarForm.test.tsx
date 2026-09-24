import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { CreateCarForm } from "@/features/cars/components/CreateCarForm";

describe("CreateCarForm", () => {
  const onSubmit = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderForm = () =>
    render(
      <CreateCarForm
        onSubmit={onSubmit}
        loading={false}
      />,
    );

  const fillRequiredFields = () => {
    fireEvent.change(
      screen.getByRole("textbox", { name: /Make/ }),
      {
        target: { value: "Audi" },
      },
    );

    fireEvent.change(
      screen.getByRole("textbox", { name: /Model/ }),
      {
        target: { value: "Q5" },
      },
    );

    fireEvent.change(
      screen.getByRole("textbox", { name: /Year/ }),
      {
        target: { value: "2024" },
      },
    );

    fireEvent.change(
      screen.getByRole("textbox", { name: /Color/ }),
      {
        target: { value: "White" },
      },
    );
  };

  it("shows validation errors for required fields", async () => {
    renderForm();

    fireEvent.click(
      screen.getByRole("button", { name: "Add car" }),
    );

    expect(
      await screen.findByText("Make is required"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Model is required"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Year is required"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Color is required"),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("rejects a year that is not exactly four digits", async () => {
    renderForm();

    fillRequiredFields();

    fireEvent.change(
      screen.getByRole("textbox", { name: /Year/ }),
      {
        target: { value: "123" },
      },
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add car" }),
    );

    expect(
      await screen.findByText(
        "Year must contain exactly 4 digits",
      ),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("rejects an invalid year range", async () => {
    renderForm();

    fillRequiredFields();

    fireEvent.change(
      screen.getByRole("textbox", { name: /Year/ }),
      {
        target: { value: "1800" },
      },
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add car" }),
    );

    expect(
      await screen.findByText(/Year must be between 1886 and/),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("rejects invalid make characters", async () => {
    renderForm();

    fillRequiredFields();

    fireEvent.change(
      screen.getByRole("textbox", { name: /Make/ }),
      {
        target: { value: "@@@@" },
      },
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add car" }),
    );

    expect(
      await screen.findByText(
        "Make contains invalid characters",
      ),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("rejects invalid color characters", async () => {
    renderForm();

    fillRequiredFields();

    fireEvent.change(
      screen.getByRole("textbox", { name: /Color/ }),
      {
        target: { value: "White123" },
      },
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add car" }),
    );

    expect(
      await screen.findByText(
        "Color contains invalid characters",
      ),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("rejects an invalid image URL", async () => {
    renderForm();

    fillRequiredFields();

    fireEvent.change(
      screen.getByRole("textbox", {
        name: /Mobile image URL/,
      }),
      {
        target: { value: "not-a-url" },
      },
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add car" }),
    );

    expect(
      await screen.findByText(
        "Enter a valid HTTP or HTTPS URL",
      ),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits valid car data", async () => {
    renderForm();

    fillRequiredFields();

    fireEvent.change(
      screen.getByRole("textbox", {
        name: /Mobile image URL/,
      }),
      {
        target: {
          value: "https://example.com/mobile.svg",
        },
      },
    );

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Add car" }),
      );
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        make: "Audi",
        model: "Q5",
        year: 2024,
        color: "White",
        mobile: "https://example.com/mobile.svg",
        tablet: undefined,
        desktop: undefined,
      });
    });
  });
});