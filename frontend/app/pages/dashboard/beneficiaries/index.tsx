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
  FileDownIcon,
  PlusIcon,
  MoreHorizontalIcon,
  Trash2Icon,
  EyeIcon,
  PencilIcon,
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
  useBeneficiaries,
  useDeleteBeneficiary,
  useExportBeneficiariesXLSX,
} from '@/hooks/queries/use-beneficiaries';
import { useServiceCategories } from '@/hooks/queries/use-service-categories';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateBeneficiaryModal } from './create-beneficiary-modal';
import { UpdateBeneficiaryModal } from './update-beneficiary-modal';
import { BeneficiaryDetailSheet } from './beneficiary-detail-sheet';
import type { BeneficiaryWithAppointments } from '@/types/beneficiary.type';
import type { getAllBeneficiaryFilters } from '@/services/beneficiary.service';

const PER_PAGE_OPTIONS = [10, 20, 30, 50];

interface Filters {
  search: string;
  categoryId: string;
  page: number;
  perPage: number;
}

const INITIAL_FILTERS: Filters = {
  search: '',
  categoryId: '',
  page: 1,
  perPage: 10,
};

function buildQueryFilters(filters: Filters): getAllBeneficiaryFilters {
  const params: getAllBeneficiaryFilters = {
    page: filters.page,
    perPage: filters.perPage,
  };
  if (filters.search) params.search = filters.search;
  if (filters.categoryId) params.serviceCategoryId = filters.categoryId;
  return params;
}

function formatDate(dateStr: string | null | undefined, includeTime = false): string {
  if (!dateStr) return '—';
  try {
    const date = new Date(dateStr);
    const isDateOnly = dateStr.length === 10 || !dateStr.includes('T');
    const adjustedDate = isDateOnly ? new Date(date.getTime() + date.getTimezoneOffset() * 60000) : date;
    
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...(includeTime
        ? {
          hour: '2-digit',
          minute: '2-digit',
        }
        : {}),
    }).format(adjustedDate);
  } catch {
    return '—';
  }
}

function formatCpf(cpf: string | null | undefined): string {
  if (!cpf) return '—';
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return cpf;
  return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9)}`;
}

function formatPhone(phone: string | null | undefined): string {
  if (!phone) return '—';
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  }
  if (clean.length === 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
  }
  return phone;
}

export function meta() {
  return [
    { title: 'Beneficiários | Ação Social' },
    { name: 'description', content: 'Gestão de beneficiários da ação social.' },
  ];
}

export default function BeneficiariesPage() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [searchInput, setSearchInput] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryWithAppointments | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const queryFilters = buildQueryFilters(filters);
  const { data, isLoading, isError } = useBeneficiaries(queryFilters);
  const { data: categoriesData } = useServiceCategories();
  const exportMutation = useExportBeneficiariesXLSX();
  const deleteMutation = useDeleteBeneficiary();

  const beneficiaries = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;
  const categories = categoriesData?.data ?? [];

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.perPage) : 1;

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

  function handleRowClick(beneficiary: BeneficiaryWithAppointments) {
    setSelectedBeneficiary(beneficiary);
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

  const hasActiveFilters = filters.search || filters.categoryId;

  function clearFilters() {
    setFilters(INITIAL_FILTERS);
    setSearchInput('');
  }

  function handleDeleteBeneficiary(id: string, name: string) {
    if (confirm(`Tem certeza que deseja excluir o beneficiário "${name}"? Esta ação não pode ser desfeita.`)) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success('Beneficiário excluído com sucesso!');
          if (selectedBeneficiary?.id === id) {
            setSheetOpen(false);
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Erro ao excluir beneficiário.');
        },
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-xl bg-card border border-border backdrop-blur-sm overflow-hidden">
          <div className="flex flex-col gap-3 px-4 pt-4 lg:px-6">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-foreground">
                  Beneficiários
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
                        a.download = 'beneficiarios.xlsx';
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
                id="btn-new-beneficiary"
                size="sm"
                onClick={() => setCreateModalOpen(true)}
                className="h-8 gap-1.5 text-xs bg-brand-orange-500 hover:bg-brand-orange-600 text-white"
              >
                <PlusIcon className="size-3.5" />
                Novo Beneficiário
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
                <Label htmlFor="beneficiaries-search" className="text-xs text-muted-foreground font-medium">
                  Busca
                </Label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="beneficiaries-search"
                    placeholder="Nome ou CPF..."
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="pl-9 h-9 bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-brand-orange-500/50 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="filter-category" className="text-xs text-muted-foreground font-medium">
                  Categoria de Atendimento
                </Label>
                <Select
                  value={filters.categoryId}
                  onValueChange={(v) => setFilter('categoryId', v ?? '')}
                >
                  <SelectTrigger
                    id="filter-category"
                    className="h-9 bg-background border-input text-foreground text-sm data-placeholder:text-muted-foreground text-left"
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
          </div>

          <div className="overflow-x-auto mt-4">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs font-medium pl-4 lg:pl-6">
                    Nome / CPF
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium">
                    Contato
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium hidden md:table-cell">
                    Nascimento / Gênero
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium text-center">
                    Atendimentos
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium hidden lg:table-cell">
                    Cadastrado em
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
                        <div className="flex flex-col gap-1.5">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1.5">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col gap-1.5">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-8 rounded-full mx-auto" />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell className="text-right pr-4 lg:pr-6">
                        <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                )}

                {isError && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <AlertCircleIcon className="size-8 text-rose-400/60" />
                        <span className="text-sm">Erro ao carregar beneficiários.</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && !isError && beneficiaries.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <InboxIcon className="size-8 text-gray-600" />
                        <span className="text-sm">
                          {hasActiveFilters
                            ? 'Nenhum beneficiário encontrado com os filtros aplicados.'
                            : 'Nenhum beneficiário cadastrado.'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading &&
                  !isError &&
                  beneficiaries.map((beneficiary) => (
                    <TableRow
                      key={beneficiary.id}
                      className="border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors duration-150 group"
                      onClick={() => handleRowClick(beneficiary)}
                    >
                      <TableCell className="pl-4 lg:pl-6">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-foreground group-hover:text-brand-orange-400 transition-colors">
                            {beneficiary.fullName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatCpf(beneficiary.cpf)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-foreground font-medium">
                            {formatPhone(beneficiary.phone)}
                          </span>
                          {beneficiary.email && (
                            <span className="text-xs text-muted-foreground break-all">
                              {beneficiary.email}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-foreground">
                            {formatDate(beneficiary.birthDate)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {beneficiary.gender === 'MALE' ? 'Masculino' : 'Feminino'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className="bg-brand-orange-500/10 text-brand-orange-400 border-brand-orange-500/20 text-xs px-2 py-0.5 font-semibold"
                        >
                          {beneficiary.appointments?.length ?? 0}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                        {formatDate(beneficiary.createdAt, true)}
                      </TableCell>
                      <TableCell className="text-right pr-4 lg:pr-6" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white/10"
                            >
                              <MoreHorizontalIcon className="size-4" />
                              <span className="sr-only">Ações</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 bg-card border border-border">
                            <DropdownMenuItem
                              onClick={() => handleRowClick(beneficiary)}
                              className="cursor-pointer gap-2"
                            >
                              <EyeIcon className="size-4 text-brand-orange-400" />
                              <span>Ver detalhes</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedBeneficiary(beneficiary);
                                setUpdateModalOpen(true);
                              }}
                              className="cursor-pointer gap-2"
                            >
                              <PencilIcon className="size-4 text-brand-orange-400" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteBeneficiary(beneficiary.id, beneficiary.fullName)}
                              className="cursor-pointer gap-2 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10"
                            >
                              <Trash2Icon className="size-4" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {pagination && (
            <div className="flex items-center justify-between gap-4 px-4 pb-4 lg:px-6 flex-wrap border-t border-border/50 pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FilterIcon className="size-3" />
                <span>
                  Exibindo{' '}
                  <span className="text-foreground font-medium">
                    {(pagination.page - 1) * pagination.perPage + 1}–
                    {Math.min(pagination.page * pagination.perPage, pagination.total)}
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
      </div>

      <BeneficiaryDetailSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        beneficiary={selectedBeneficiary}
      />

      <CreateBeneficiaryModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />

      <UpdateBeneficiaryModal
        key={`${updateModalOpen}-${selectedBeneficiary?.id}`}
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        beneficiary={selectedBeneficiary}
      />
    </div>
  );
}
