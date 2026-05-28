import { SectionCards } from '@/components/section-cards';
import { AppointmentsTable } from '@/components/appointments-table';

export function meta() {
  return [
    { title: 'Ação Social - Atendimento e Gestão' },
    { name: 'description', content: 'Sistema moderno de gestão para ações sociais e atendimento comunitário.' },
  ];
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <AppointmentsTable />
      </div>
    </div>
  );
}
