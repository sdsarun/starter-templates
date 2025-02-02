"use client";

import cn from "@/core/utils/cn";
import React from "react";
import useFormField from "./use-form-field";

export type FormErrorMessageProps = React.ComponentProps<"p"> & {
  errorClassName?: string;
};

export default function FormErrorMessage({
  className,
  errorClassName,
  ...props
}: FormErrorMessageProps) {
  const { formErrorMessageId, invalid, error } = useFormField();

  if (!invalid) {
    return null;
  }

  return (
    <p
      id={formErrorMessageId}
      className={cn(
        "text-sm font-medium text-destructive text-red-600 flex items-center gap-1 mt-2 ml-1",
        className,
        {
          "text-red-600": invalid,
          [errorClassName ?? ""]: invalid
        }
      )}
      aria-invalid={invalid}
      aria-errormessage={error?.message}
      {...props}
    >
      {error?.message}
    </p>
  );
}
