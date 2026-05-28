import { useState, useCallback, useRef } from 'react';
import {
  SearchIcon,
  FilterIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Loader2Icon,
  AlertCircleIcon,
  InboxIcon,
  StarIcon,
  FileDownIcon,
  PlusIcon,
  MoreHorizontalIcon,
  PlayIcon,
  CheckCircle2Icon,
  RotateCcwIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useAppointments,
  useExportAppointmentsXLSX,
  useUpdateAppointment,
  useDeleteAppointment,
} from '@/hooks/queries/use-appointments';
import { useServiceCategories } from '@/hooks/queries/use-service-categories';
import { AppointmentStatusBadge } from '@/components/appointments-table/appointment-status-badge';
import { AppointmentDetailSheet } from '@/components/appointments-table/appointment-detail-sheet';
import { CreateAppointmentModal } from '@/components/create-appointment-modal';
import { UpdateAppointmentModal } from './update-appointment-modal';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { AppointmentListWithRelations } from '@/types/appointments.type';
import type { getAllAppointmentsFilters } from '@/services/appointments.service';

const PER_PAGE_OPTIONS = [10, 20, 30, 50];

type BooleanFilter = '' | 'true' | 'false';
type StatusField = 'canceled' | 'priority' | 'started' | 'finished';

const STATUS_OPTIONS: { field: StatusField; value: BooleanFilter; label: string }[] = [
  { field: 'canceled', value: 'false', label: 'Não cancelados' },
  { field: 'canceled', value: 'true', label: 'Cancelados' },
  { field: 'priority', value: 'true', label: 'Prioritários' },
  { field: 'priority', value: 'false', label: 'Normais' },
  { field: 'started', value: 'true', label: 'Iniciados' },
  { field: 'started', value: 'false', label: 'Em espera' },
  { field: 'finished', value: 'true', label: 'Finalizados' },
  { field: 'finished', value: 'false', label: 'Não finalizados' },
];

interface Filters {
  search: string;
  categoryId: string;
  priority: BooleanFilter;
  canceled: BooleanFilter;
  started: BooleanFilter;
  finished: BooleanFilter;
  page: number;
  perPage: number;
}

const INITIAL_FILTERS: Filters = {
  search: '',
  categoryId: '',
  priority: '',
  canceled: '',
  started: '',
  finished: '',
  page: 1,
  perPage: 10,
};

function buildQueryFilters(filters: Filters): getAllAppointmentsFilters {
  const params: getAllAppointmentsFilters = {
    page: filters.page,
    perPage: filters.perPage,
  };
  if (filters.search) params.search = filters.search;
  if (filters.categoryId) params.categoryId = filters.categoryId;
  if (filters.priority) params.priority = filters.priority;
  if (filters.canceled) params.canceled = filters.canceled;
  if (filters.started) params.started = filters.started;
  if (filters.finished) params.finished = filters.finished;
  return params;
}

function formatCallCode(callCode: string): string {
  return callCode ?? '—';
}

function formatCpf(cpf: string | null | undefined): string {
  if (!cpf) return '—';
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return cpf;
  return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9)}`;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function AppointmentsTable() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [searchInput, setSearchInput] = useState('');
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentListWithRelations | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const activeStatus = STATUS_OPTIONS.find(
    (opt) => filters[opt.field] === opt.value
  );

  function handleStatusChange(combined: string | null) {
    setFilters((prev) => ({
      ...prev,
      canceled: '',
      priority: '',
      started: '',
      finished: '',
      page: 1,
    }));
    if (!combined) return;
    const [field, value] = combined.split(':') as [StatusField, BooleanFilter];
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const queryFilters = buildQueryFilters(filters);
  const { data, isLoading, isError } = useAppointments(queryFilters);
  const { data: categoriesData } = useServiceCategories();
  const exportMutation = useExportAppointmentsXLSX();

  const appointments = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;
  const categories = categoriesData?.data ?? [];

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.perPage)
    : 1;

  const setFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        ...(key !== 'page' ? { page: 1 } : {}),
      }));
    },
    []
  );

  function handleRowClick(appointment: AppointmentListWithRelations) {
    setSelectedAppointment(appointment);
    setSheetOpen(true);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchInput(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setFilter('search', value);
    }, 400);
  }

  const hasActiveFilters =
    filters.search ||
    filters.categoryId ||
    filters.priority ||
    filters.canceled ||
    filters.started ||
    filters.finished;

  function clearFilters() {
    setFilters(INITIAL_FILTERS);
    setSearchInput('');
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl bg-card border border-border backdrop-blur-sm overflow-hidden">
        <div className="flex flex-col gap-3 px-4 pt-4 lg:px-6">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">
                Atendimentos
              </h2>
              {pagination && (
                <Badge
                  variant="outline"
                  className="bg-brand-orange-500/15 text-brand-orange-400 border-brand-orange-500/30 text-xs px-2 py-0.5"
                >
                  {pagination.total}
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  exportMutation.mutate(undefined, {
                    onSuccess(blob) {
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'atendimentos.xlsx';
                      a.click();
                      URL.revokeObjectURL(url);
                    },
                  });
                }}
                disabled={exportMutation.isPending}
                className="h-8 gap-1.5 text-xs border-input text-muted-foreground hover:text-foreground"
              >
                {exportMutation.isPending ? (
                  <Loader2Icon className="size-3.5 animate-spin" />
                ) : (
                  <FileDownIcon className="size-3.5" />
                )}
                {exportMutation.isPending ? 'Exportando...' : 'Exportar XLSX'}
              </Button>
            </div>
            <Button
              id="btn-new-appointment"
              size="sm"
              onClick={() => setCreateModalOpen(true)}
              className="h-8 gap-1.5 text-xs bg-brand-orange-500 hover:bg-brand-orange-600 text-white"
            >
              <PlusIcon className="size-3.5" />
              Novo Atendimento
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground text-xs h-7 px-2"
              >
                Limpar filtros
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="appointments-search" className="text-xs text-muted-foreground font-medium">
                Busca
              </Label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  id="appointments-search"
                  placeholder="Nome, CPF, senha..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="pl-9 h-9 bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-brand-orange-500/50 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="filter-category" className="text-xs text-muted-foreground font-medium">
                Categoria
              </Label>
              <Select
                value={filters.categoryId}
                onValueChange={(v) => setFilter('categoryId', v ?? '')}
              >
                <SelectTrigger
                  id="filter-category"
                  className="h-9 bg-background border-input text-foreground text-sm data-placeholder:text-muted-foreground"
                >
                  <SelectValue placeholder="Selecionar categoria">
                    {filters.categoryId
                      ? categories.find((cat) => cat.id === filters.categoryId)?.name
                      : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.prefix} — {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="filter-status" className="text-xs text-muted-foreground font-medium">
              Status
            </Label>
            <Select
              value={activeStatus ? `${activeStatus.field}:${activeStatus.value}` : ''}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger
                id="filter-status"
                className="h-9 bg-background border-input text-foreground text-sm data-placeholder:text-muted-foreground"
              >
                <SelectValue placeholder="Selecionar">
                  {activeStatus ? activeStatus.label : null}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={`${opt.field}:${opt.value}`} value={`${opt.field}:${opt.value}`}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground text-xs font-medium w-[100px] pl-4 lg:pl-6">
                  Senha
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium">
                  Beneficiário
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium hidden md:table-cell">
                  Categoria
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium hidden lg:table-cell">
                  Prioridade
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium hidden xl:table-cell">
                  Criado em
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium text-right pr-4 lg:pr-6 w-[80px]">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                Array.from({ length: filters.perPage }).map((_, i) => (
                  <TableRow
                    key={i}
                    className="border-b border-border/50 hover:bg-muted/30"
                  >
                    <TableCell className="pl-4 lg:pl-6">
                      <Skeleton className="h-5 w-16" />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="h-5 w-28" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Skeleton className="h-5 w-16" />
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell className="text-right pr-4 lg:pr-6">
                      <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              )}

              {isError && (
                <TableRow>
                  <TableCell colSpan={7} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <AlertCircleIcon className="size-8 text-rose-400/60" />
                      <span className="text-sm">Erro ao carregar atendimentos.</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && !isError && appointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <InboxIcon className="size-8 text-gray-600" />
                      <span className="text-sm">
                        {hasActiveFilters
                          ? 'Nenhum atendimento encontrado com os filtros aplicados.'
                          : 'Nenhum atendimento cadastrado.'}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                !isError &&
                appointments.map((appointment) => (
                  <TableRow
                    key={`${appointment.beneficiaryId}-${appointment.serviceCategoryId}`}
                    className="border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors duration-150 group"
                    onClick={() => handleRowClick(appointment)}
                  >
                    <TableCell className="pl-4 lg:pl-6">
                      <span className="font-mono text-sm font-bold text-brand-orange-400 group-hover:text-brand-orange-300 transition-colors">
                        {formatCallCode(appointment.callCode)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground">
                          {appointment.beneficiary.fullName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatCpf(appointment.beneficiary.cpf)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-brand-orange-400/70 bg-brand-orange-500/10 rounded px-1.5 py-0.5">
                          {appointment.serviceCategory.prefix}
                        </span>
                        <span className="text-sm text-foreground">
                          {appointment.serviceCategory.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <AppointmentStatusBadge appointment={appointment} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {appointment.priority ? (
                        <div className="flex items-center gap-1 text-brand-orange-400">
                          <StarIcon className="size-3 fill-current" />
                          <span className="text-xs font-medium">Prioritário</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Normal</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell text-xs text-muted-foreground">
                      {formatDate(appointment.createdAt)}
                    </TableCell>
                    <TableCell className="text-right pr-4 lg:pr-6" onClick={(e) => e.stopPropagation()}>
                      <AppointmentActions
                        appointment={appointment}
                        onEdit={() => {
                          setSelectedAppointment(appointment);
                          setUpdateModalOpen(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {pagination && (
          <div className="flex items-center justify-between gap-4 px-4 pb-4 lg:px-6 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FilterIcon className="size-3" />
              <span>
                Exibindo{' '}
                <span className="text-foreground font-medium">
                  {(pagination.page - 1) * pagination.perPage + 1}–
                  {Math.min(
                    pagination.page * pagination.perPage,
                    pagination.total
                  )}
                </span>{' '}
                de{' '}
                <span className="text-foreground font-medium">{pagination.total}</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="hidden sm:inline">Por página</span>
                <Select
                  value={String(filters.perPage)}
                  onValueChange={(v) => setFilter('perPage', Number(v))}
                >
                  <SelectTrigger
                    id="per-page"
                    className="h-7 w-16 bg-background border-input text-foreground text-xs"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {PER_PAGE_OPTIONS.map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 hidden sm:flex bg-background border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setFilter('page', 1)}
                  disabled={!pagination.hasPrevPage || isLoading}
                >
                  <ChevronsLeftIcon className="size-3.5" />
                  <span className="sr-only">Primeira página</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 bg-background border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setFilter('page', filters.page - 1)}
                  disabled={!pagination.hasPrevPage || isLoading}
                >
                  <ChevronLeftIcon className="size-3.5" />
                  <span className="sr-only">Página anterior</span>
                </Button>
                <span className="px-2 text-xs text-muted-foreground min-w-[80px] text-center">
                  {isLoading ? (
                    <Loader2Icon className="size-3 animate-spin mx-auto" />
                  ) : (
                    <>
                      <span className="text-foreground font-medium">{pagination.page}</span>
                      {' de '}
                      <span className="text-foreground font-medium">{totalPages}</span>
                    </>
                  )}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 bg-background border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setFilter('page', filters.page + 1)}
                  disabled={!pagination.hasNextPage || isLoading}
                >
                  <ChevronRightIcon className="size-3.5" />
                  <span className="sr-only">Próxima página</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 hidden sm:flex bg-background border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setFilter('page', totalPages)}
                  disabled={!pagination.hasNextPage || isLoading}
                >
                  <ChevronsRightIcon className="size-3.5" />
                  <span className="sr-only">Última página</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AppointmentDetailSheet
        appointment={selectedAppointment}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />

      <CreateAppointmentModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />

      <UpdateAppointmentModal
        key={`${updateModalOpen}-${selectedAppointment?.beneficiaryId}-${selectedAppointment?.serviceCategoryId}`}
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        appointment={selectedAppointment}
      />
    </>
  );
}

interface AppointmentActionsProps {
  appointment: AppointmentListWithRelations;
  onEdit: () => void;
}

function AppointmentActions({ appointment, onEdit }: AppointmentActionsProps) {
  const updateMutation = useUpdateAppointment();
  const deleteMutation = useDeleteAppointment();

  const handleAction = async (action: 'iniciar' | 'finalizar' | 'espera') => {
    let data = {};
    let label = '';

    if (action === 'iniciar') {
      data = {
        startedAt: new Date().toISOString(),
        finishedAt: null,
      };
      label = 'iniciado';
    } else if (action === 'finalizar') {
      data = {
        finishedAt: new Date().toISOString(),
      };
      label = 'finalizado';
    } else if (action === 'espera') {
      data = {
        startedAt: null,
        finishedAt: null,
      };
      label = 'enviado para a fila de espera';
    }

    updateMutation.mutate(
      {
        beneficiaryId: appointment.beneficiaryId,
        serviceCategoryId: appointment.serviceCategoryId,
        data,
      },
      {
        onSuccess: () => {
          toast.success(`Atendimento ${label} com sucesso!`);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Erro ao atualizar atendimento.');
        },
      }
    );
  };

  const handleDelete = () => {
    if (
      confirm(
        `Tem certeza que deseja excluir o atendimento do beneficiário "${appointment.beneficiary.fullName}"? Esta ação não pode ser desfeita.`
      )
    ) {
      deleteMutation.mutate(
        {
          beneficiaryId: appointment.beneficiaryId,
          serviceCategoryId: appointment.serviceCategoryId,
        },
        {
          onSuccess: () => {
            toast.success('Atendimento excluído com sucesso!');
          },
          onError: (err) => {
            toast.error(
              err?.response?.data?.message || 'Erro ao excluir atendimento.'
            );
          },
        }
      );
    }
  };

  const isWaiting = !appointment.startedAt && !appointment.finishedAt;
  const isStarted = !!appointment.startedAt && !appointment.finishedAt;
  const isFinished = !!appointment.finishedAt;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-white/10"
          disabled={updateMutation.isPending || deleteMutation.isPending}
        >
          {updateMutation.isPending || deleteMutation.isPending ? (
            <Loader2Icon className="size-4 animate-spin text-brand-orange-500" />
          ) : (
            <MoreHorizontalIcon className="size-4" />
          )}
          <span className="sr-only">Ações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card border border-border">
        {!appointment.canceled && (isWaiting || isFinished) && (
          <DropdownMenuItem onClick={() => handleAction('iniciar')} className="cursor-pointer gap-2">
            <PlayIcon className="size-4 text-emerald-500" />
            <span>Iniciar atendimento</span>
          </DropdownMenuItem>
        )}
        {!appointment.canceled && isStarted && (
          <DropdownMenuItem onClick={() => handleAction('finalizar')} className="cursor-pointer gap-2">
            <CheckCircle2Icon className="size-4 text-brand-orange-400" />
            <span>Finalizar atendimento</span>
          </DropdownMenuItem>
        )}
        {!appointment.canceled && (isStarted || isFinished) && (
          <DropdownMenuItem onClick={() => handleAction('espera')} className="cursor-pointer gap-2">
            <RotateCcwIcon className="size-4 text-amber-500" />
            <span>Voltar para espera</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer gap-2">
          <PencilIcon className="size-4 text-brand-orange-400" />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          className="cursor-pointer gap-2 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10"
        >
          <Trash2Icon className="size-4" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
