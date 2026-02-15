import {
  ReactNode,
  useState,
  useCallback,
  useContext,
  createContext,
} from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShippingFormData,
  FormStep,
  SearchState,
  CourierRanking,
} from "@/types";
import { shippingFormSchema } from "@/utils/validation-schemas";
import { useCourierRanking } from "@/hooks/use-courier-ranking";
import { fetchAllQuotes } from "@/services/api";
import { STEP_FIELDS } from "@/constants/form";

interface QuoteContextType {
  // Form
  form: UseFormReturn<ShippingFormData>;
  currentStep: FormStep;

  // Search state
  searchState: SearchState;
  ranking: CourierRanking;

  // Actions
  validateCurrentStep: () => Promise<boolean>;
  goToStep: (step: FormStep) => void;
  performSearch: () => Promise<void>;
  retrySearch: () => Promise<void>;
  resetSearch: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const INITIAL_FORM_DATA: ShippingFormData = {
  origin: { country: "", city: "", postalCode: "" },
  destination: { country: "", city: "", postalCode: "" },
  package: { weight: 0, length: 0, width: 0, height: 0 },
};

const INITIAL_SEARCH_STATE: SearchState = {
  isSearching: false,
  quotes: undefined,
  ranking: { cheapest: null, fastest: null },
  error: null,
  partialErrors: [],
};

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>("origin");
  const [searchState, setSearchState] =
    useState<SearchState>(INITIAL_SEARCH_STATE);

  const form = useForm<ShippingFormData>({
    resolver: zodResolver(shippingFormSchema),
    mode: "onChange",
    defaultValues: INITIAL_FORM_DATA,
  });

  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const isValid = await form.trigger(STEP_FIELDS[currentStep]);
    return isValid;
  }, [currentStep, form]);

  const goToStep = useCallback((step: FormStep) => {
    setCurrentStep(step);
  }, []);

  const performSearch = useCallback(async () => {
    // Validate before searching
    const isValid = await form.trigger();
    if (!isValid) return;

    const currentFormData = form.getValues();

    setSearchState((prev) => ({
      ...prev,
      isSearching: true,
      error: null,
      partialErrors: [],
    }));

    try {
      const { quotes, errors } = await fetchAllQuotes(currentFormData);

      setSearchState({
        isSearching: false,
        quotes,
        ranking: { cheapest: null, fastest: null },
        error: null,
        partialErrors: errors,
      });
    } catch (error) {
      setSearchState((prev) => ({
        ...prev,
        isSearching: false,
        error: error as Error,
      }));
    }
  }, [form]);

  const retrySearch = useCallback(async () => {
    await performSearch();
  }, [performSearch]);

  const resetSearch = useCallback(() => {
    setSearchState(INITIAL_SEARCH_STATE);
  }, []);

  const ranking = useCourierRanking(searchState.quotes ?? []);

  const value: QuoteContextType = {
    form,
    currentStep,
    searchState,
    ranking,
    goToStep,
    validateCurrentStep,
    performSearch,
    retrySearch,
    resetSearch,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
};

export const useQuoteContext = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuoteContext must be used within QuoteProvider");
  }
  return context;
};
