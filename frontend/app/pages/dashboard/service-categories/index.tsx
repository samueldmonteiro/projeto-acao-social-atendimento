import { useState, useCallback, useRef } from 'react';
import {
  SearchIcon,
  AlertCircleIcon,
  InboxIcon,
  PlusIcon,
  MoreHorizontalIcon,
  Trash2Icon,
  EyeIcon,
  PencilIcon,
  TagIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  useServiceCategories,
  useDeleteServiceCategory,
} from '@/hooks/queries/use-service-categories';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateServiceCategoryModal } from './create-service-category-modal';
import { UpdateServiceCategoryModal } from './update-service-category-modal';
import { ServiceCategoryDetailSheet } from './service-category-detail-sheet';
import type { ServiceCategory } from '@/types/service-category.type';

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

export function meta() {
  return [
    { title: 'Categorias de Serviço | Ação Social' },
    { name: 'description', content: 'Gestão de categorias de serviço da ação social.' },
  ];
}

export default function ServiceCategoriesPage() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const { data, isLoading, isError } = useServiceCategories();
  const deleteMutation = useDeleteServiceCategory();

  const allCategories = data?.data ?? [];

  const categories = searchInput.trim()
    ? allCategories.filter(
      (c) =>
        c.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          c.prefix.toLowerCase().includes(searchInput.toLowerCase())
    )
    : allCategories;

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setSearchInput(value);
    }, 300);
  }, []);

  function handleRowClick(category: ServiceCategory) {
    setSelectedCategory(category);
    setSheetOpen(true);
  }

  function handleDeleteCategory(id: string, name: string) {
    if (
      confirm(
        `Tem certeza que deseja excluir a categoria "${name}"? Esta ação não pode ser desfeita.`
      )
    ) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success('Categoria excluída com sucesso!');
          if (selectedCategory?.id === id) {
            setSheetOpen(false);
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Erro ao excluir categoria.');
        },
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-xl bg-card border border-border backdrop-blur-sm overflow-hidden">
          {/* Header */}
          <div className="flex flex-col gap-3 px-4 pt-4 lg:px-6">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-foreground">
                  Categorias de Serviço
                </h2>
                {!isLoading && (
                  <Badge
                    variant="outline"
                    className="bg-brand-orange-500/15 text-brand-orange-400 border-brand-orange-500/30 text-xs px-2 py-0.5"
                  >
                    {categories.length}
                  </Badge>
                )}
              </div>

              <Button
                id="btn-new-service-category"
                size="sm"
                onClick={() => setCreateModalOpen(true)}
                className="h-8 gap-1.5 text-xs bg-brand-orange-500 hover:bg-brand-orange-600 text-white"
              >
                <PlusIcon className="size-3.5" />
                Nova Categoria
              </Button>
            </div>

            {/* Busca */}
            <div className="flex flex-col gap-1.5 max-w-sm">
              <Label htmlFor="categories-search" className="text-xs text-muted-foreground font-medium">
                Busca
              </Label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  id="categories-search"
                  placeholder="Nome ou prefixo..."
                  onChange={handleSearchChange}
                  className="pl-9 h-9 bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-brand-orange-500/50 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto mt-2">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs font-medium pl-4 lg:pl-6">
                    Prefixo
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium">
                    Nome
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium hidden md:table-cell">
                    Criado em
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium hidden lg:table-cell">
                    Atualizado em
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium text-right pr-4 lg:pr-6 w-[80px]">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Loading */}
                {isLoading &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-border/50 hover:bg-muted/30">
                      <TableCell className="pl-4 lg:pl-6">
                        <Skeleton className="h-6 w-12 rounded" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell className="text-right pr-4 lg:pr-6">
                        <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))}

                {/* Erro */}
                {isError && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-40 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <AlertCircleIcon className="size-8 text-rose-400/60" />
                        <span className="text-sm">Erro ao carregar categorias.</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {/* Vazio */}
                {!isLoading && !isError && categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-40 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <InboxIcon className="size-8 text-gray-600" />
                        <span className="text-sm">
                          {searchInput
                            ? 'Nenhuma categoria encontrada com os filtros aplicados.'
                            : 'Nenhuma categoria cadastrada.'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {/* Dados */}
                {!isLoading &&
                  !isError &&
                  categories.map((category) => (
                    <TableRow
                      key={category.id}
                      className="border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors duration-150 group"
                      onClick={() => handleRowClick(category)}
                    >
                      <TableCell className="pl-4 lg:pl-6">
                        <span className="font-mono text-sm font-bold text-brand-orange-400 group-hover:text-brand-orange-300 transition-colors bg-brand-orange-500/10 px-2 py-1 rounded">
                          {category.prefix}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TagIcon className="size-3.5 text-muted-foreground shrink-0" />
                          <span className="text-sm font-medium text-foreground">
                            {category.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                        {formatDate(category.createdAt)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                        {formatDate(category.updatedAt)}
                      </TableCell>
                      <TableCell
                        className="text-right pr-4 lg:pr-6"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                          <DropdownMenuContent
                            align="end"
                            className="w-40 bg-card border border-border"
                          >
                            <DropdownMenuItem
                              onClick={() => handleRowClick(category)}
                              className="cursor-pointer gap-2"
                            >
                              <EyeIcon className="size-4 text-brand-orange-400" />
                              <span>Ver detalhes</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedCategory(category);
                                setUpdateModalOpen(true);
                              }}
                              className="cursor-pointer gap-2"
                            >
                              <PencilIcon className="size-4 text-brand-orange-400" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleDeleteCategory(category.id, category.name)
                              }
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

          {/* Footer info */}
          {!isLoading && !isError && allCategories.length > 0 && (
            <div className="px-4 pb-4 lg:px-6">
              <p className="text-xs text-muted-foreground">
                {categories.length === allCategories.length
                  ? `${allCategories.length} ${allCategories.length === 1 ? 'categoria cadastrada' : 'categorias cadastradas'}`
                  : `Exibindo ${categories.length} de ${allCategories.length} categorias`}
              </p>
            </div>
          )}
        </div>
      </div>

      <ServiceCategoryDetailSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        category={selectedCategory}
      />

      <CreateServiceCategoryModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />

      <UpdateServiceCategoryModal
        key={`${updateModalOpen}-${selectedCategory?.id}`}
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        category={selectedCategory}
      />
    </div>
  );
}
