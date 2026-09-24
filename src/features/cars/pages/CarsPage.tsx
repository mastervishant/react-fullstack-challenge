import { useMemo, useState } from "react";
import { Container, Typography } from "@mui/material";
import { useCars } from "../hooks/useCars";
import { CarList } from "../components/CarList";
import { CarFilters } from "../components/CarFilters";
import { CreateCarForm } from "../components/CreateCarForm";

export const CarsPage = () => {
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("model-asc");

  const {
    cars,
    loading,
    error,
    createCar,
    creating,
    createError,
  } = useCars({
    model,
    year: year.length === 4 ? Number(year) : undefined,
  });

  const sortedCars = useMemo(() => {
    return [...cars].sort((a, b) => {
      switch (sort) {
        case "model-desc":
          return b.model.localeCompare(a.model);

        case "year-asc":
          return a.year - b.year;

        case "year-desc":
          return b.year - a.year;

        case "model-asc":
        default:
          return a.model.localeCompare(b.model);
      }
    });
  }, [cars, sort]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4 }}
      >
        Cars
      </Typography>

      <CreateCarForm
        onSubmit={createCar}
        loading={creating}
        error={createError}
      />

      <CarFilters
        model={model}
        year={year}
        sort={sort}
        onModelChange={setModel}
        onYearChange={setYear}
        onSortChange={setSort}
      />

      <CarList
        cars={sortedCars}
        loading={loading}
        error={error}
      />
    </Container>
  );
};