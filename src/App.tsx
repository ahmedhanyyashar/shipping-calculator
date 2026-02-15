import { Box, Typography } from "@mui/material";
import { QuoteProvider } from "./context/QuoteContext";
import ShippingCalculator from "./pages/ShippingCalculator";

export default function App() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: "4rem",
      }}
    >
      <Typography variant="h1">Shipping Calculator</Typography>
      <Typography variant="h5" sx={{ mt: 2 }} color="text.secondary">
        Compare shipping rates across multiple couriers in seconds and choose
        the best option for your business
      </Typography>
      <Box component="main" sx={{ py: 4 }}>
        <QuoteProvider>
          <ShippingCalculator />
        </QuoteProvider>
      </Box>
    </Box>
  );
}
