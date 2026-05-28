import type { ReactNode } from 'react';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

interface ViewDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function ViewDetailSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: ViewDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex flex-col w-full sm:max-w-lg overflow-hidden bg-background border-l border-border p-0"
      >
        <SheetHeader className="flex flex-row items-start justify-between gap-4 px-6 py-5 border-b border-border shrink-0">
          <div className="flex flex-col gap-1">
            <SheetTitle className="text-base font-semibold text-foreground">
              {title}
            </SheetTitle>
            {description && (
              <SheetDescription className="text-sm text-muted-foreground">
                {description}
              </SheetDescription>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground hover:bg-accent shrink-0"
          >
            <XIcon className="size-4" />
            <span className="sr-only">Fechar</span>
          </Button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {children}
        </div>

        {footer && (
          <div className="shrink-0 px-6 py-4 border-t border-border">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

interface DetailSectionProps {
  title: string;
  children: ReactNode;
}

export function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-orange-400">
        {title}
      </h3>
      <div className="rounded-xl bg-card border border-border divide-y divide-border">
        {children}
      </div>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: ReactNode;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm text-foreground text-right font-medium break-all">
        {value ?? <span className="text-muted-foreground italic text-xs">—</span>}
      </span>
    </div>
  );
}
