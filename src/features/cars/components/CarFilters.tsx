import {
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

type CarFiltersProps = {
  model: string;
  year: string;
  sort: string;
  onModelChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export const CarFilters = ({
  model,
  year,
  sort,
  onModelChange,
  onYearChange,
  onSortChange,
}: CarFiltersProps) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ mb: 4 }}
    >
      <TextField
        label="Search model"
        value={model}
        onChange={(event) => onModelChange(event.target.value)}
        fullWidth
      />

    <TextField
  label="Year"
  type="text"
  value={year}
  onChange={(event) => {
    const value = event.target.value;

    if (/^\d{0,4}$/.test(value)) {
      onYearChange(value);
    }
  }}
  slotProps={{
    htmlInput: {
      inputMode: "numeric",
      maxLength: 4,
      pattern: "[0-9]{4}",
    },
  }}
  placeholder="YYYY"
  fullWidth
/>

      <TextField
        select
        label="Sort"
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
        fullWidth
      >
        <MenuItem value="model-asc">
          Model A-Z
        </MenuItem>

        <MenuItem value="model-desc">
          Model Z-A
        </MenuItem>

        <MenuItem value="year-asc">
          Year ascending
        </MenuItem>

        <MenuItem value="year-desc">
          Year descending
        </MenuItem>
      </TextField>
    </Stack>
  );
};