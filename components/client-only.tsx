"use client";

import React, { useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

function ClientOnly({ children }: Props) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
}

export default ClientOnly;
