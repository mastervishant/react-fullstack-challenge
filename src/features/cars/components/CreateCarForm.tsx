import { useState } from "react";
import {
  Alert,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import type { CreateCarInput } from "../types/car";

type CreateCarFormProps = {
  onSubmit: (input: CreateCarInput) => Promise<unknown>;
  loading: boolean;
  error?: Error;
};

type FormErrors = {
  make?: string;
  model?: string;
  year?: string;
  color?: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
};

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
};

const validateText = (
  value: string,
  minLength: number,
  maxLength: number,
  pattern: RegExp,
  fieldName: string,
) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return `${fieldName} is required`;
  }

  if (trimmedValue.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }

  if (trimmedValue.length > maxLength) {
    return `${fieldName} must be at most ${maxLength} characters`;
  }

  if (!pattern.test(trimmedValue)) {
    return `${fieldName} contains invalid characters`;
  }

  return undefined;
};

export const CreateCarForm = ({
  onSubmit,
  loading,
  error,
}: CreateCarFormProps) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [mobile, setMobile] = useState("");
  const [tablet, setTablet] = useState("");
  const [desktop, setDesktop] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const validationErrors: FormErrors = {};

    const makeError = validateText(
      make,
      2,
      50,
      /^[a-zA-Z0-9][a-zA-Z0-9 .'-]*$/,
      "Make",
    );

    if (makeError) {
      validationErrors.make = makeError;
    }

    const modelError = validateText(
      model,
      1,
      50,
      /^[a-zA-Z0-9][a-zA-Z0-9 .'-]*$/,
      "Model",
    );

    if (modelError) {
      validationErrors.model = modelError;
    }

    if (!year) {
      validationErrors.year = "Year is required";
    } else if (!/^\d{4}$/.test(year)) {
      validationErrors.year =
        "Year must contain exactly 4 digits";
    } else {
      const numericYear = Number(year);
      const currentYear = new Date().getFullYear();

      if (numericYear < 1886 || numericYear > currentYear) {
        validationErrors.year =
          `Year must be between 1886 and ${currentYear}`;
      }
    }

    const colorError = validateText(
      color,
      2,
      30,
      /^[a-zA-Z][a-zA-Z -]*$/,
      "Color",
    );

    if (colorError) {
      validationErrors.color = colorError;
    }

    if (mobile.trim() && !isValidUrl(mobile.trim())) {
      validationErrors.mobile =
        "Enter a valid HTTP or HTTPS URL";
    }

    if (tablet.trim() && !isValidUrl(tablet.trim())) {
      validationErrors.tablet =
        "Enter a valid HTTP or HTTPS URL";
    }

    if (desktop.trim() && !isValidUrl(desktop.trim())) {
      validationErrors.desktop =
        "Enter a valid HTTP or HTTPS URL";
    }

    return validationErrors;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await onSubmit({
      make: make.trim(),
      model: model.trim(),
      year: Number(year),
      color: color.trim(),
      mobile: mobile.trim() || undefined,
      tablet: tablet.trim() || undefined,
      desktop: desktop.trim() || undefined,
    });

    setMake("");
    setModel("");
    setYear("");
    setColor("");
    setMobile("");
    setTablet("");
    setDesktop("");
    setErrors({});
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit}
      noValidate
      sx={{ p: 3 }}
    >
      {error && (
        <Alert severity="error">
          Unable to create car. Please try again.
        </Alert>
      )}

      <TextField
        label="Make"
        value={make}
        onChange={(event) => {
          if (event.target.value.length <= 50) {
            setMake(event.target.value);
          }
        }}
        error={Boolean(errors.make)}
        helperText={errors.make}
        required
        fullWidth
      />

      <TextField
        label="Model"
        value={model}
        onChange={(event) => {
          if (event.target.value.length <= 50) {
            setModel(event.target.value);
          }
        }}
        error={Boolean(errors.model)}
        helperText={errors.model}
        required
        fullWidth
      />

      <TextField
        label="Year"
        value={year}
        onChange={(event) => {
          const value = event.target.value;

          if (/^\d{0,4}$/.test(value)) {
            setYear(value);
          }
        }}
        error={Boolean(errors.year)}
        helperText={
          errors.year ?? "Enter a 4-digit year"
        }
        placeholder="YYYY"
        required
        fullWidth
        slotProps={{
          htmlInput: {
            inputMode: "numeric",
            maxLength: 4,
          },
        }}
      />

      <TextField
        label="Color"
        value={color}
        onChange={(event) => {
          if (event.target.value.length <= 30) {
            setColor(event.target.value);
          }
        }}
        error={Boolean(errors.color)}
        helperText={errors.color}
        required
        fullWidth
      />

      <TextField
        label="Mobile image URL"
        value={mobile}
        onChange={(event) => setMobile(event.target.value)}
        error={Boolean(errors.mobile)}
        helperText={errors.mobile}
        fullWidth
      />

      <TextField
        label="Tablet image URL"
        value={tablet}
        onChange={(event) => setTablet(event.target.value)}
        error={Boolean(errors.tablet)}
        helperText={errors.tablet}
        fullWidth
      />

      <TextField
        label="Desktop image URL"
        value={desktop}
        onChange={(event) => setDesktop(event.target.value)}
        error={Boolean(errors.desktop)}
        helperText={errors.desktop}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
      >
        {loading ? "Creating..." : "Add car"}
      </Button>
    </Stack>
  );
};