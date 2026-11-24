"use client";

import React from 'react';

const DEFAULT_IMAGE = '/images/providers/scholarship-default.jpg';

// <img> that swaps to the default picture if the scholarship photo fails to load
export default function FallbackImage({ src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={(src as string) || DEFAULT_IMAGE}
      onError={(e) => {
        if (!e.currentTarget.src.endsWith(DEFAULT_IMAGE)) e.currentTarget.src = DEFAULT_IMAGE;
      }}
    />
  );
}
