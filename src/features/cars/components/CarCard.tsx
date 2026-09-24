import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import type { Car } from "../types/car";

type CarCardProps = {
  car: Car;
};

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card>
      <picture>
        <source
          media="(max-width: 639px)"
          srcSet={car.mobile}
        />
        <source
          media="(max-width: 1023px)"
          srcSet={car.tablet}
        />
        <CardMedia
          component="img"
          image={car.desktop}
          alt={`${car.make} ${car.model}`}
        />
      </picture>

      <CardContent>
        <Stack spacing={0.5}>
          <Typography variant="h6">
            {car.make} {car.model}
          </Typography>

          <Typography color="text.secondary">
            {car.year} · {car.color}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};