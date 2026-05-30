import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAppointments } from '@/hooks/queries/use-appointments';
import logo from '@/assets/logo-simple.png';

export default function PanelPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useAppointments({
    started: 'false',
    finished: 'false',
    canceled: 'false',
    perPage: 200,
  });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    }, 5000);
    return () => clearInterval(interval);
  }, [queryClient]);

  const waitingAppointments = (data?.data.items ?? [])
    .sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  const next = waitingAppointments[0] ?? null;
  const queueAppointments = waitingAppointments.slice(0, 6);

  const timeStr = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const dateStr = now
    .toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    .replace(/^\w/, (c) => c.toUpperCase());

  if (isLoading) {
    return (
      <div
        style={{ background: '#0a0a0a' }}
        className="min-h-screen lg:fixed lg:inset-0 flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-brand-orange-500/30 border-t-brand-orange-500 animate-spin" />
          <p className="text-gray-400 text-sm tracking-widest uppercase animate-pulse">
            Carregando painel...
          </p>
        </div>
      </div>
    );
  }

  return (
    /*
     * Desktop (lg+): fixed inset-0 + overflow-hidden → sem scroll, ocupa 100% da tela.
     * Mobile/Tablet (< lg): fluxo normal min-h-screen + overflow-y-auto → permite scroll.
     */
    <div
      style={{ background: '#0a0a0a' }}
      className="
        text-white flex flex-col
        min-h-screen overflow-y-auto
        lg:fixed lg:inset-0 lg:overflow-hidden
      "
    >
      {/* Ambient glow — apenas decorativo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, #f97316 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #fb923c 0%, transparent 70%)' }}
        />
      </div>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header
        className="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8 sm:py-5 border-b"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">

          <img src={logo} alt="Logo" className=" object-contain w-9 h-9" />
          <div>
            <div className="font-bold text-base sm:text-lg leading-tight text-white">
              Ação Social — Anhanguera
            </div>
            <div
              className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#fb923c' }}
            >
              Painel de Atendimento
            </div>
          </div>
        </div>

        {/* Clock */}
        <div className="text-right">
          <div
            className="text-2xl sm:text-4xl font-bold tabular-nums leading-none"
            style={{ letterSpacing: '-0.03em' }}
          >
            {timeStr}
          </div>
          <div className="text-xs sm:text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {dateStr}
          </div>
        </div>
      </header>

      {/* ── BODY ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row gap-5 p-4 sm:p-6 lg:min-h-0">

        {/* ── NEXT CALL (first in queue) ─────────────────────── */}
        <section
          className="flex flex-col items-center justify-center rounded-2xl relative overflow-hidden w-full flex-1 py-10 sm:py-12"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(249,115,22,0.2)',
            boxShadow: '0 0 60px rgba(249,115,22,0.06)',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }}
          />

          <div className="w-full flex flex-col items-center text-center px-4 sm:px-8">
            <p
              className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-6 sm:mb-8"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              ● Próximo a ser Chamado
            </p>

            {next ? (
              <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in zoom-in duration-500">
                <div
                  className="rounded-2xl px-6 sm:px-16 py-8 sm:py-10 mb-6 sm:mb-8 flex flex-col items-center w-full"
                  style={{
                    background: 'linear-gradient(145deg, rgba(249,115,22,0.12), rgba(249,115,22,0.04))',
                    border: '1px solid rgba(249,115,22,0.35)',
                    boxShadow: 'inset 0 1px 0 rgba(249,115,22,0.15), 0 20px 60px rgba(0,0,0,0.4)',
                  }}
                >
                  <span
                    className="text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase mb-2 sm:mb-3"
                    style={{ color: '#fb923c' }}
                  >
                    Senha
                  </span>
                  <div
                    className="font-black leading-none mb-3 sm:mb-4 tabular-nums"
                    style={{
                      fontSize: 'clamp(3.5rem, 5vw, 8rem)',
                      letterSpacing: '-0.04em',
                      background: 'linear-gradient(160deg, #ffffff 30%, #fb923c)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {next.callCode}
                  </div>

                  {next.priority && (
                    <div
                      className="px-4 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase"
                      style={{
                        background: 'rgba(249,115,22,0.2)',
                        border: '1px solid rgba(249,115,22,0.5)',
                        color: '#fb923c',
                        boxShadow: '0 0 12px rgba(249,115,22,0.3)',
                      }}
                    >
                      ★ Atendimento Prioritário
                    </div>
                  )}
                </div>

                <div
                  className="grid grid-cols-2 w-full rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="px-4 sm:px-6 py-4 sm:py-5"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderRight: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div
                      className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-1 sm:mb-2"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      Serviço
                    </div>
                    <div className="text-base sm:text-xl font-semibold text-white leading-tight">
                      {next.serviceCategory.name}
                    </div>
                  </div>
                  <div
                    className="px-4 sm:px-6 py-4 sm:py-5"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <div
                      className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-1 sm:mb-2"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      Nome
                    </div>
                    <div
                      className="text-base sm:text-xl font-semibold text-white leading-tight truncate"
                      title={next.beneficiary.fullName}
                    >
                      {next.beneficiary.fullName.split(' ')[0]}{' '}
                      {next.beneficiary.fullName.split(' ').slice(-1)[0]}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-16 select-none">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-5 text-3xl sm:text-4xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.15)',
                  }}
                >
                  —
                </div>
                <p
                  className="text-base sm:text-lg font-medium"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  Nenhuma senha na fila de espera
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── QUEUE ──────────────────────────────────────────── */}
        <aside
          className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col rounded-2xl overflow-hidden lg:min-h-0"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div
            className="px-5 py-4 shrink-0 flex items-center gap-3"
            style={{
              background: 'rgba(0,0,0,0.3)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0 animate-pulse"
              style={{ background: '#f97316', boxShadow: '0 0 6px #f97316' }}
            />
            <span
              className="text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: '#fb923c' }}
            >
              Fila de Espera
            </span>
            {waitingAppointments.length > 0 && (
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(249,115,22,0.15)',
                  color: '#fb923c',
                  border: '1px solid rgba(249,115,22,0.3)',
                }}
              >
                {waitingAppointments.length}
              </span>
            )}
          </div>

          <div className="lg:flex-1 lg:overflow-y-auto lg:min-h-0 p-4 flex flex-col gap-3">
            {queueAppointments.length > 0 ? (
              queueAppointments.map((app, idx) => (
                <div
                  key={`${app.beneficiaryId}-${app.serviceCategoryId}`}
                  className="flex items-center gap-3 rounded-xl p-3 sm:p-4 transition-all duration-300"
                  style={{
                    background: idx === 0 ? 'rgba(249,115,22,0.08)' : 'rgba(255,255,255,0.03)',
                    border: idx === 0
                      ? '1px solid rgba(249,115,22,0.25)'
                      : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      background: idx === 0 ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.05)',
                      color: idx === 0 ? '#fb923c' : 'rgba(255,255,255,0.3)',
                      border: `1px solid ${idx === 0 ? 'rgba(249,115,22,0.35)' : 'rgba(255,255,255,0.07)'}`,
                    }}
                  >
                    {idx + 1}º
                  </div>

                  <div
                    className="shrink-0 min-w-[52px] h-9 px-2 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    {app.callCode}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-white truncate">
                        {app.beneficiary.fullName.split(' ')[0]}{' '}
                        {app.beneficiary.fullName.split(' ').slice(-1)[0]}
                      </span>
                      {app.priority && (
                        <span
                          className="shrink-0 text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase"
                          style={{
                            background: 'rgba(249,115,22,0.15)',
                            color: '#fb923c',
                            border: '1px solid rgba(249,115,22,0.3)',
                          }}
                        >
                          PREF
                        </span>
                      )}
                    </div>
                    <div
                      className="text-xs truncate"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      {app.serviceCategory.name}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-12">
                <p className="text-sm text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Nenhuma pessoa na fila
                </p>
              </div>
            )}
          </div>

          {waitingAppointments.length > 6 && (
            <div
              className="px-5 py-4 shrink-0 text-center"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(0,0,0,0.2)',
              }}
            >
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
                +{waitingAppointments.length - 6} pessoa
                {waitingAppointments.length - 6 > 1 ? 's' : ''} aguardando
              </span>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
