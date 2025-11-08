"use client";

import { useState, useEffect } from 'react';

export function Copyright() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
     <p className="absolute bottom-6 text-center text-sm text-muted-foreground">
        © {year} HostelHub. All rights reserved.
    </p>
  );
}
