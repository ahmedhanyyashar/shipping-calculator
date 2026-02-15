import { Box, Typography, Grid } from "@mui/material";
import { useQuoteContext } from "@/context/QuoteContext";
import { CourierCard } from "./CourierCard";
import {
  InitialState,
  NoResults,
  ErrorFallback,
  PartialErrors,
} from "./ui/EmptyStates";
import { SearchingIndicator } from "./ui/LoadingStates";

export default function QuotesGrid() {
  const { searchState, ranking, retrySearch } = useQuoteContext();
  const { quotes, isSearching, error, partialErrors } = searchState;

  // Loading state
  if (isSearching) {
    return <SearchingIndicator />;
  }

  // Initial state - no search performed yet
  if (!quotes) {
    return <InitialState />;
  }

  // Error state
  if (error) {
    return <ErrorFallback error={error} onRetry={retrySearch} />;
  }

  // No results
  if (quotes.length === 0) {
    return <NoResults />;
  }

  // Success state
  return (
    <Box sx={{ mt: 4 }}>
      {/* Partial errors warning */}
      {partialErrors.length > 0 && <PartialErrors errors={partialErrors} />}

      <Typography variant="h6" sx={{ mb: 3 }}>
        Available Courier Options ({quotes.length})
      </Typography>

      <Grid container spacing={3}>
        {quotes.map((quote) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={quote.courier.id}>
            <CourierCard
              courier={quote}
              isCheapest={quote.courier.id === ranking.cheapest}
              isFastest={quote.courier.id === ranking.fastest}
              onSelect={() => console.log("Selected:", quote.courier.name)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
