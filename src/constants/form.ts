import { FormStep, ShippingFormData } from "@/types";
import { FieldPath } from "react-hook-form";

type StepFields = FieldPath<ShippingFormData>[];

export const FORM_STEPS: Array<{
  key: FormStep;
  label: string;
  fields: StepFields;
}> = [
  {
    key: "origin",
    label: "Origin",
    fields: ["origin.country", "origin.city", "origin.postalCode"],
  },
  {
    key: "destination",
    label: "Destination",
    fields: [
      "destination.country",
      "destination.city",
      "destination.postalCode",
    ],
  },
  {
    key: "package",
    label: "Package Details",
    fields: [
      "package.weight",
      "package.length",
      "package.width",
      "package.height",
    ],
  },
];

export const STEP_FIELDS = Object.fromEntries(
  FORM_STEPS.map((s) => [s.key, s.fields])
) as Record<FormStep, StepFields>;
