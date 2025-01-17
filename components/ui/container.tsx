import { ReactNode } from "react";

// component which positions content with proper padding, margin and media query
export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-5 xl:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
