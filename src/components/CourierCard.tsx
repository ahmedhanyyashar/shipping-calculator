import {
  Card,
  CardContent,
  Box,
  Chip,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import {
  AttachMoney,
  Speed,
  LocalShipping,
  CheckCircle,
} from "@mui/icons-material";
import { CourierQuote, ServiceLevel } from "@/types";
import { calculateDeliveryDates } from "@/utils/calculate";
import { formatPrice, formatDateRange } from "@/utils/format";

interface CourierBrandingProps {
  logo: string;
  name: string;
  serviceLevel: ServiceLevel;
  badges?: Array<"cheapest" | "fastest">;
}

const CourierBranding = ({
  logo,
  name,
  serviceLevel,
  badges,
}: CourierBrandingProps) => (
  <>
    {/* Badges */}
    {badges && badges.length > 0 && (
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "flex",
          gap: 0.5,
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        {badges.includes("cheapest") && (
          <Chip
            icon={<AttachMoney sx={{ fontSize: 16 }} />}
            label="Cheapest"
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        )}
        {badges.includes("fastest") && (
          <Chip
            icon={<Speed sx={{ fontSize: 16 }} />}
            label="Fastest"
            color="info"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        )}
      </Box>
    )}

    {/* Logo & Name */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 2,
        pr: 10,
      }}
    >
      <Avatar
        sx={{
          width: 56,
          height: 56,
          fontSize: "2rem",
          bgcolor: "grey.100",
        }}
      >
        {logo}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h6" sx={{ mb: 0.5 }} noWrap>
          {name}
        </Typography>
        <Chip
          label={serviceLevel}
          size="small"
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
        />
      </Box>
    </Box>
  </>
);

interface PricingDisplayProps {
  basePrice: number;
  tax: number;
  totalPrice: number;
  currency: string;
}

const PricingDisplay = ({
  basePrice,
  tax,
  totalPrice,
  currency,
}: PricingDisplayProps) => (
  <Box sx={{ my: 3 }}>
    <Typography
      variant="h4"
      sx={{
        color: "primary.main",
        mb: 1,
        fontWeight: 700,
      }}
    >
      {formatPrice(totalPrice, currency)}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Base: {formatPrice(basePrice)} + Tax: {formatPrice(tax)}
    </Typography>
  </Box>
);

interface DeliveryEstimateProps {
  minDays: number;
  maxDays: number;
}

const DeliveryEstimate = ({ minDays, maxDays }: DeliveryEstimateProps) => {
  const { minDate, maxDate } = calculateDeliveryDates(minDays, maxDays);

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 0.5,
        }}
      >
        <LocalShipping sx={{ color: "text.secondary", fontSize: 20 }} />
        <Typography variant="body2" color="text.secondary">
          {minDays}-{maxDays} business days
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        Est. delivery: {formatDateRange(minDate, maxDate)}
      </Typography>
    </Box>
  );
};

// Main CourierCard - Container
interface CourierCardProps {
  courier: CourierQuote;
  isCheapest?: boolean;
  isFastest?: boolean;
  onSelect?: () => void;
}

export const CourierCard = ({
  courier,
  isCheapest = false,
  isFastest = false,
  onSelect,
}: CourierCardProps) => {
  const badges: Array<"cheapest" | "fastest"> = [];
  if (isCheapest) badges.push("cheapest");
  if (isFastest) badges.push("fastest");

  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CourierBranding
          logo={courier.courier.logo}
          name={courier.courier.name}
          serviceLevel={courier.courier.serviceLevel}
          badges={badges.length > 0 ? badges : undefined}
        />

        <PricingDisplay
          basePrice={courier.basePrice}
          tax={courier.tax}
          totalPrice={courier.totalPrice}
          currency={courier.currency}
        />

        <DeliveryEstimate
          minDays={courier.estimatedDays.min}
          maxDays={courier.estimatedDays.max}
        />

        <Button
          variant="contained"
          fullWidth
          startIcon={<CheckCircle />}
          onClick={onSelect}
          sx={{ mt: "auto" }}
        >
          Select Courier
        </Button>
      </CardContent>
    </Card>
  );
};
