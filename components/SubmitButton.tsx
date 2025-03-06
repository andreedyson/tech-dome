import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubmitButtonType = {
  children: React.ReactNode;
  isSubmitting: boolean;
} & ButtonProps;

export function SubmitButton({
  children,
  isSubmitting,
  ...props
}: SubmitButtonType) {
  return (
    <Button disabled={isSubmitting} {...props}>
      <span>{children}</span>

      {isSubmitting && (
        <div>
          <Loader2 className="size-4 animate-spin" />
        </div>
      )}
    </Button>
  );
}
