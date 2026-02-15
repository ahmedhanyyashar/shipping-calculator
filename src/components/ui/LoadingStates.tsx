import {
  Card,
  CardContent,
  Box,
  Skeleton,
  Typography,
  Grid,
} from "@mui/material";

export const CourierCardSkeleton = () => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Skeleton variant="circular" width={56} height={56} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" height={24} />
        </Box>
      </Box>
      <Skeleton variant="text" width="50%" height={48} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="70%" height={20} sx={{ mb: 3 }} />
      <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={42} sx={{ borderRadius: 1 }} />
    </CardContent>
  </Card>
);

export const SearchingIndicator = () => (
  <Box sx={{ textAlign: "center", py: 4 }}>
    <Typography variant="h6" gutterBottom>
      Searching for best rates...
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Comparing prices from multiple couriers
    </Typography>
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {[1, 2, 3, 4].map((i) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
          <CourierCardSkeleton />
        </Grid>
      ))}
    </Grid>
  </Box>
);
