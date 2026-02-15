import { Box, Typography } from "@mui/material";

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
      <Typography
        variant="h5"
        sx={{ mt: 2 }}
        color="text.secondary"
      >
        Compare shipping rates across multiple couriers in
        seconds and choose the best option for your business
      </Typography>
      <Box component="main"></Box>
    </Box>
  );
}
