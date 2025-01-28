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
      <span className={cn({ "opacity-0": isSubmitting })}>{children}</span>

      {isSubmitting && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="size-4 animate-spin" />
        </div>
      )}
    </Button>
  );
}
