import { Alert, Button, AlertTitle, Box, Typography } from "@mui/material";
import { ErrorOutline, Refresh, Warning } from "@mui/icons-material";

interface ErrorFallbackProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorFallback = ({ error, onRetry }: ErrorFallbackProps) => (
  <Alert
    severity="error"
    sx={{ my: 3 }}
    action={
      <Button
        color="inherit"
        size="small"
        onClick={onRetry}
        startIcon={<Refresh />}
      >
        Retry
      </Button>
    }
  >
    <AlertTitle>Unable to Fetch Rates</AlertTitle>
    {error.message || "Please try again or check your connection."}
  </Alert>
);

export const InitialState = () => (
  <Box
    sx={{
      textAlign: "center",
      py: 8,
      color: "text.secondary",
    }}
  >
    <Typography variant="h6" gutterBottom>
      Ready to compare rates
    </Typography>
    <Typography variant="body2">
      Fill in the shipping details and click &quot;Search Rates&quot; to see
      courier options
    </Typography>
  </Box>
);

export const NoResults = () => (
  <Alert severity="info" icon={<ErrorOutline />} sx={{ my: 3 }}>
    <AlertTitle>No Couriers Available</AlertTitle>
    No couriers serve this route yet. Try adjusting your origin or destination.
  </Alert>
);

interface PartialErrorsProps {
  errors: Array<{ courier: string; message: string }>;
}

export const PartialErrors = ({ errors }: PartialErrorsProps) => (
  <Alert severity="warning" icon={<Warning />} sx={{ mb: 3 }}>
    <AlertTitle>Some Rates Unavailable</AlertTitle>
    {errors.map((e) => e.courier).join(", ")} rates temporarily unavailable.
    Showing other available options.
  </Alert>
);
