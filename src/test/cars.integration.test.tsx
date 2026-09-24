import { waitFor } from "@testing-library/react";
import { CarsPage } from "@/features/cars/pages/CarsPage";
import { db } from "@/mocks/db";
import { server } from "@/mocks/server";
import { renderWithProviders, screen } from "./renderWithProviders";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
  db.reset();
});

afterAll(() => {
  server.close();
});

describe("CarsPage integration", () => {
  it("loads cars through Apollo and the mock GraphQL API", async () => {
    renderWithProviders(<CarsPage />);

    expect(screen.getByRole("heading", { name: "Cars" })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Audi A3")).toBeInTheDocument();
      expect(screen.getByText("Audi A6")).toBeInTheDocument();
      expect(screen.getByText("Audi e-tron GT")).toBeInTheDocument();
      expect(screen.getByText("Audi Q3")).toBeInTheDocument();
      expect(screen.getByText("Audi Q5")).toBeInTheDocument();
      expect(screen.getByText("Audi R8")).toBeInTheDocument();
    });
  });
});