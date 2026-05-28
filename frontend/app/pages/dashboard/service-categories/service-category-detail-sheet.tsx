import { ViewDetailSheet, DetailSection, DetailRow } from '@/components/view-detail-sheet';
import type { ServiceCategory } from '@/types/service-category.type';

interface ServiceCategoryDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: ServiceCategory | null;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateStr));
  } catch {
    return '—';
  }
}

export function ServiceCategoryDetailSheet({
  open,
  onOpenChange,
  category,
}: ServiceCategoryDetailSheetProps) {
  return (
    <ViewDetailSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Detalhes da Categoria"
      description="Informações completas da categoria de serviço."
    >
      {category && (
        <div className="flex flex-col gap-6">
          <DetailSection title="Identificação">
            <DetailRow
              label="Nome"
              value={category.name}
            />
            <DetailRow
              label="Prefixo"
              value={
                <span className="font-mono text-brand-orange-400 font-bold bg-brand-orange-500/10 px-2 py-0.5 rounded text-sm">
                  {category.prefix}
                </span>
              }
            />
            <DetailRow
              label="ID"
              value={
                <span className="font-mono text-xs text-muted-foreground break-all">
                  {category.id}
                </span>
              }
            />
          </DetailSection>

          <DetailSection title="Datas">
            <DetailRow label="Criado em" value={formatDate(category.createdAt)} />
            <DetailRow label="Atualizado em" value={formatDate(category.updatedAt)} />
          </DetailSection>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-orange-400">
              Exemplo de código gerado
            </h3>
            <div className="rounded-xl border border-brand-orange-500/30 bg-brand-orange-500/5 p-4 flex items-center gap-3">
              <span className="font-mono text-2xl font-bold text-brand-orange-400">
                {category.prefix}001
              </span>
              <span className="text-xs text-muted-foreground">
                Primeiro atendimento desta categoria
              </span>
            </div>
          </div>
        </div>
      )}
    </ViewDetailSheet>
  );
}
