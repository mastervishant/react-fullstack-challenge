import {
  Alert,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { Car } from "../types/car";
import { CarCard } from "./CarCard";

type CarListProps = {
  cars: Car[];
  loading: boolean;
  error?: Error;
};

export const CarList = ({
  cars,
  loading,
  error,
}: CarListProps) => {
  if (loading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ py: 8 }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>
          Loading cars...
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Unable to load cars. Please try again.
      </Alert>
    );
  }

  if (cars.length === 0) {
    return (
      <Alert severity="info">
        No cars found.
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      {cars.map((car) => (
        <Grid key={car.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <CarCard car={car} />
        </Grid>
      ))}
    </Grid>
  );
};