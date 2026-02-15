import {
  Stack,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Grid,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { COUNTRIES } from "@/constants/couriers";
import { useQuoteContext } from "@/context/QuoteContext";

interface LocationStepProps {
  type: "origin" | "destination";
}

export const LocationStep = ({ type }: LocationStepProps) => {
  const { form } = useQuoteContext();
  const {
    control,
    formState: { errors },
  } = form;

  const title = type === "origin" ? "Origin Details" : "Destination Details";
  const description =
    type === "origin"
      ? "Where is the package being shipped from?"
      : "Where is the package being shipped to?";

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>

      <Controller
        name={`${type}.country`}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={COUNTRIES}
            value={field.value || null}
            onChange={(_, value) => field.onChange(value || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                required
                error={!!errors[type]?.country}
                helperText={errors[type]?.country?.message}
              />
            )}
          />
        )}
      />

      <Controller
        name={`${type}.city`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="City"
            required
            fullWidth
            error={!!errors[type]?.city}
            helperText={errors[type]?.city?.message}
          />
        )}
      />

      <Controller
        name={`${type}.postalCode`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Postal Code"
            required
            fullWidth
            error={!!errors[type]?.postalCode}
            helperText={errors[type]?.postalCode?.message}
          />
        )}
      />
    </Stack>
  );
};

export const PackageStep = () => {
  const { form } = useQuoteContext();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Package Dimensions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter the weight and dimensions of your package
        </Typography>
      </Box>

      <Controller
        name="package.weight"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Weight (kg)"
            type="number"
            value={field.value || ""}
            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            required
            fullWidth
            slotProps={{ htmlInput: { min: 0.1, step: 0.1 } }}
            helperText={
              errors.package?.weight?.message ||
              "Minimum 0.1 kg, maximum 1000 kg"
            }
            error={!!errors.package?.weight}
          />
        )}
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 4 }}>
          <Controller
            name="package.length"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Length (cm)"
                type="number"
                fullWidth
                value={field.value || ""}
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value) || 0)
                }
                slotProps={{ htmlInput: { min: 1 } }}
                error={!!errors.package?.length}
                helperText={errors.package?.length?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Controller
            name="package.width"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Width (cm)"
                type="number"
                fullWidth
                value={field.value || ""}
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value) || 0)
                }
                slotProps={{ htmlInput: { min: 1 } }}
                error={!!errors.package?.width}
                helperText={errors.package?.width?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Controller
            name="package.height"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Height (cm)"
                type="number"
                fullWidth
                value={field.value || ""}
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value) || 0)
                }
                slotProps={{ htmlInput: { min: 1 } }}
                error={!!errors.package?.height}
                helperText={errors.package?.height?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
