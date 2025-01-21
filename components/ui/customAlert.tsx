import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

export default function CustomAlert({
  error,
  variant,
}: {
  error: string;
  variant: "default" | "destructive" | null | undefined;
}) {
  return (
    <Alert
      className={`absolute top-5 min-w-[250px] w-fit max-w-[400px] my-2 transition-top duration-150 ${
        !error && "-top-[100px]"
      }`}
      variant={variant}
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
