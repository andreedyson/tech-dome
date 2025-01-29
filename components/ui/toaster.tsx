"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        duration,
        ...props
      }) {
        return (
          <Toast key={id} duration={duration} {...props}>
            <div className="flex items-center gap-2">
              <div className="relative rounded-md p-4">
                <div
                  className={cn(
                    "absolute inset-0 opacity-30 blur-md",
                    props.variant === "success" ? "bg-green-500" : "bg-red-500",
                  )}
                />
                {props.variant === "success" ? (
                  <CircleCheck color="lime" />
                ) : props.variant === "destructive" ? (
                  <CircleAlert color="red" />
                ) : (
                  <div></div>
                )}
              </div>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
