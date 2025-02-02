"use client";

import React from "react";
import Button, { type ButtonProps } from "@/core/components/ui/button";
import { useFormContext } from "react-hook-form";

export type ButtonSubmitProps = Omit<ButtonProps, "htmlType">;

export default function ButtonSubmit({ loading, ...props }: ButtonSubmitProps) {
  const formContextValue = useFormContext();
  if (!formContextValue) {
    throw new Error("<ButtonSubmit> component must be use inside <Form>. Ensure <ButtonSubmit> is wraps the component using <Form>.");
  }

  const {
    formState: { isSubmitting }
  } = formContextValue;

  return <Button htmlType="submit" {...props} loading={loading || isSubmitting} />;
}
