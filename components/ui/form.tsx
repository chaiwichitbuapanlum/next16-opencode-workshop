import * as React from "react";
import { cn } from "@/lib/utils";

// Form Root Component
const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form ref={ref} className={cn("space-y-6", className)} {...props} />
));
Form.displayName = "Form";

// Form Field Container
const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
FormField.displayName = "FormField";

// Form Error Message
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    errors?: string[];
  }
>(({ className, errors, children, ...props }, ref) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className={cn("text-sm text-red-500 space-y-1", className)}>
      {errors.map((error, index) => (
        <p key={index} ref={ref} {...props}>
          {error}
        </p>
      ))}
      {children}
    </div>
  );
});
FormMessage.displayName = "FormMessage";

// Form Description
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
FormDescription.displayName = "FormDescription";

export { Form, FormField, FormMessage, FormDescription };
