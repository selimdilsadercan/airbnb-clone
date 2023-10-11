"use client";

import EmptyState from "@/components/empty-state";
import { useEffect } from "react";

interface Props {
  error: Error;
}

function ErrorState({ error }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
}

export default ErrorState;
