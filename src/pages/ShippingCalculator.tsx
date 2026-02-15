import { useCallback } from "react";
import {
  Box,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import { useQuoteContext } from "@/context/QuoteContext";
import { FORM_STEPS } from "@/constants/form";
import { LocationStep, PackageStep } from "@/components/FormSteps";
import QuotesGrid from "@/components/QuotesGrid";
import ShipmentSummary from "@/components/ShipmentSummary";

export const ShippingCalculator = () => {
  const {
    currentStep,
    goToStep,
    validateCurrentStep,
    performSearch,
    searchState,
  } = useQuoteContext();

  const currentStepIndex = FORM_STEPS.findIndex((s) => s.key === currentStep);
  const isLastStep = currentStepIndex === FORM_STEPS.length - 1;

  const handleNext = useCallback(async () => {
    if (isLastStep) {
      await performSearch();
    } else {
      const isValid = await validateCurrentStep();
      if (isValid) {
        const nextStep = FORM_STEPS[currentStepIndex + 1];
        if (nextStep) goToStep(nextStep.key);
      }
    }
  }, [
    isLastStep,
    currentStepIndex,
    validateCurrentStep,
    goToStep,
    performSearch,
  ]);

  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevStep = FORM_STEPS[currentStepIndex - 1];
      if (prevStep) goToStep(prevStep.key);
    }
  }, [currentStepIndex, goToStep]);

  return (
    <Grid container spacing={3}>
      {/* Main Content */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Stepper activeStep={currentStepIndex} sx={{ mb: 4 }}>
            {FORM_STEPS.map((step) => (
              <Step key={step.key}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentStep === "origin" && <LocationStep type="origin" />}
          {currentStep === "destination" && <LocationStep type="destination" />}
          {currentStep === "package" && <PackageStep />}

          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button
              onClick={handleBack}
              disabled={currentStepIndex === 0 || searchState.isSearching}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={searchState.isSearching}
              sx={{ flex: 1 }}
            >
              {searchState.isSearching
                ? "Searching..."
                : isLastStep
                  ? "Search Rates"
                  : "Next"}
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Sidebar */}
      <Grid size={{ xs: 12, md: 4 }}>
        <ShipmentSummary />
      </Grid>

      {/* Results */}
      <Grid size={{ xs: 12 }}>
        <QuotesGrid />
      </Grid>
    </Grid>
  );
};

export default ShippingCalculator;
