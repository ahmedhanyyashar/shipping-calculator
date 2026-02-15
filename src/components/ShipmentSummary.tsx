import { Paper, Typography, Box } from "@mui/material";
import { formatWeight, formatDimensions } from "@/utils/format";
import { useQuoteContext } from "@/context/QuoteContext";
import { useWatch } from "react-hook-form";

export default function ShipmentSummary() {
  const { form } = useQuoteContext();

  const originData = useWatch({
    control: form.control,
    name: "origin",
  });
  const destinationData = useWatch({
    control: form.control,
    name: "destination",
  });
  const packageData = useWatch({
    control: form.control,
    name: "package",
  });

  const hasOrigin = !!originData.country;
  const hasDestination = !!destinationData.country;
  const hasPackage = !!(packageData.weight > 0);

  return (
    <Paper sx={{ p: 3, position: "sticky", top: 24 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        📋 Shipment Summary
      </Typography>

      {/* Origin */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          Origin
        </Typography>
        {hasOrigin ? (
          <>
            <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
              {originData.city && `${originData.city}, `}
              {originData.country}
            </Typography>
            {originData.postalCode && (
              <Typography variant="body2" color="text.secondary">
                {originData.postalCode}
              </Typography>
            )}
          </>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, fontStyle: "italic" }}
          >
            Not entered yet
          </Typography>
        )}
      </Box>

      {/* Destination */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          Destination
        </Typography>
        {hasDestination ? (
          <>
            <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
              {destinationData.city && `${destinationData.city}, `}
              {destinationData.country}
            </Typography>
            {destinationData.postalCode && (
              <Typography variant="body2" color="text.secondary">
                {destinationData.postalCode}
              </Typography>
            )}
          </>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, fontStyle: "italic" }}
          >
            Not entered yet
          </Typography>
        )}
      </Box>

      {/* Package */}
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Package
        </Typography>
        {hasPackage ? (
          <>
            {packageData.weight > 0 && (
              <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
                Weight: {formatWeight(packageData.weight)}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              Dimensions:{" "}
              {formatDimensions(
                packageData.length,
                packageData.width,
                packageData.height
              )}
            </Typography>
          </>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, fontStyle: "italic" }}
          >
            Not entered yet
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
