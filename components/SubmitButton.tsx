import { Button, type ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
    <Button disabled={isSubmitting} {...props} type="submit">
      <span>{children}</span>

      {isSubmitting && (
        <div>
          <Loader2 className="size-4 animate-spin" />
        </div>
      )}
    </Button>
  );
}
