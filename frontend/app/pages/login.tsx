import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/auth.service';
import { useAuthStore } from '@/hooks/store/use-auth';
import type { LoginCredentials } from '@/types/auth.type';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';
import type { AxiosError } from 'axios';
import type { ApiResponse } from '@/types/api.type';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const from = location.state?.from?.pathname || '/';

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      if (data.ok) {
        setAuth(data.data.user, data.data.accessToken);
        toast.success('Login efetuado com sucesso!');
        navigate(from, { replace: true });
      } else {
        toast.error(data.message || 'Erro ao realizar login.');
      }
    },
    onError: (error: AxiosError<ApiResponse<unknown>>) => {
      toast.error(error?.response?.data?.message || 'Falha na autenticação. Verifique suas credenciais.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning('Por favor, preencha todos os campos.');
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden text-white selection:bg-brand-orange-500/30">
      {/* Background decorativo premium seguindo o sistema de design (AGENTS.md) */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-brand-orange-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-anhanguera/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/60 transition-all duration-300 hover:border-white/15">
          
          {/* Espaço para Logo - Faculdade Anhanguera */}
          <div className="text-center mb-8 flex flex-col items-center">
            {/* INÍCIO DO ESPAÇO PARA SUA LOGO */}
            <img src={logo} alt="Logo Anhanguera" width={150} height={150} />
            {/* FIM DO ESPAÇO PARA SUA LOGO */}
            <p className="text-gray-400 text-xs mt-4 font-medium uppercase tracking-wider">
              Gestão de Atendimentos — Ação Social
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">E-mail Corporativo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.nome@anhanguera.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange-500/50 focus:border-brand-orange-500/50 transition-all text-sm"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Senha</label>
                <a href="#" className="text-xs text-brand-orange-400 hover:text-brand-orange-300 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha secreta"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange-500/50 focus:border-brand-orange-500/50 transition-all text-sm"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-brand-orange-500 to-brand-orange-600 hover:from-brand-orange-400 hover:to-brand-orange-500 text-white font-semibold text-sm transition-all transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-brand-orange-500/50 shadow-lg shadow-brand-orange-500/25 disabled:opacity-50 disabled:pointer-events-none mt-2"
            >
              {loginMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Autenticando...
                </span>
              ) : (
                'Entrar no Portal'
              )}
            </button>
          </form>
        </div>

        {/* Rodapé institucional */}
        <p className="text-center text-[10px] text-gray-500 mt-8 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Faculdade Anhanguera. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}

