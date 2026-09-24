import { render, screen } from "@testing-library/react";
import { CarList } from "@/features/cars/components/CarList";
import type { Car } from "@/features/cars/types/car";

const cars: Car[] = [
  {
    id: "1",
    make: "Audi",
    model: "Q5",
    year: 2023,
    color: "Glacier White",
    mobile: "/images/q5-mobile.svg",
    tablet: "/images/q5-tablet.svg",
    desktop: "/images/q5-desktop.svg",
  },
];

describe("CarList", () => {
  it("shows loading state", () => {
    render(
      <CarList
        cars={[]}
        loading
      />,
    );

    expect(screen.getByText("Loading cars...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    render(
      <CarList
        cars={[]}
        loading={false}
        error={new Error("Failed to load")}
      />,
    );

    expect(
      screen.getByText(
        "Unable to load cars. Please try again.",
      ),
    ).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(
      <CarList
        cars={[]}
        loading={false}
      />,
    );

    expect(
      screen.getByText("No cars found."),
    ).toBeInTheDocument();
  });

  it("renders cars", () => {
    render(
      <CarList
        cars={cars}
        loading={false}
      />,
    );

    expect(
      screen.getByText("Audi Q5"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("2023 · Glacier White"),
    ).toBeInTheDocument();

    expect(
      screen.getByAltText("Audi Q5"),
    ).toBeInTheDocument();
  });
});