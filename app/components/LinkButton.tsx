import { cn } from "@/lib/utils";

interface LinkButtonProps extends React.ComponentPropsWithoutRef<"a"> {}

export function LinkButton({
  className,
  children,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-semibold hover:underline hover:underline-offset-4 transition-all",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
