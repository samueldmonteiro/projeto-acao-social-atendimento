import { Link } from 'react-router';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-black/40 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5 text-white"
                >
                  <path d="m12 19 7-7 3 3-7 7-3-3z"/>
                  <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                  <path d="m2 2 7.586 7.586"/>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Ação<span className="text-indigo-400">Social</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Sistema de gestão de atendimento para ações sociais. Transformando vidas através da tecnologia e empatia.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">Sistema</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/usuarios" className="hover:text-white transition-colors">Usuários</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Sobre</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">Suporte</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Ação Social Atendimento. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {/* Social placeholders */}
            <div className="h-5 w-5 bg-white/10 rounded-full cursor-pointer hover:bg-indigo-500 transition-colors"></div>
            <div className="h-5 w-5 bg-white/10 rounded-full cursor-pointer hover:bg-indigo-500 transition-colors"></div>
            <div className="h-5 w-5 bg-white/10 rounded-full cursor-pointer hover:bg-indigo-500 transition-colors"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
