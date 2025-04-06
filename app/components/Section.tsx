import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentPropsWithoutRef<"div"> {}

export function Section({ className, ...props }: SectionProps) {
  return <div className={cn("space-y-4", className)} {...props} />;
}

interface SectionTitleProps extends React.ComponentPropsWithoutRef<"h2"> {}

export function SectionTitle({ className, ...props }: SectionTitleProps) {
  return (
    <h2 className={cn("font-semibold tracking-tight", className)} {...props} />
  );
}

interface SectionListProps extends React.ComponentPropsWithoutRef<"div"> {
  fallback?: string;
  list: { date: string; title: string; url?: string; external?: boolean }[];
}

export function SectionList({
  className,
  list,
  fallback,
  ...props
}: SectionListProps) {
  if (list.length == 0 && fallback) {
    return <p className="font-light text-muted-foreground">{fallback}</p>;
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {list.map((item) => (
        <div key={item.title} className="flex items-center gap-1">
          <span className="font-light text-muted-foreground">{item.date}</span>
          <span className="font-medium truncate">{item.title}</span>
        </div>
      ))}
    </div>
  );
}
