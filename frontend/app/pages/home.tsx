import { Link } from 'react-router';

export function meta() {
  return [
    { title: 'Ação Social - Atendimento e Gestão' },
    { name: 'description', content: 'Sistema moderno de gestão para ações sociais e atendimento comunitário.' },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center sm:py-24">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-8 animate-fade-in">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        Novidades na Gestão Social
      </div>
      
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl max-w-3xl mb-6">
        Transformando o <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">Atendimento Social</span> com Tecnologia
      </h1>
      
      <p className="max-w-2xl text-lg text-gray-400 mb-10 leading-relaxed">
        Uma plataforma completa para gerenciar atendimentos, usuários e impacto social de forma eficiente, humana e segura.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link 
          to="/usuarios" 
          className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 active:scale-95"
        >
          Ver Usuários
        </Link>
        <Link 
          to="/about" 
          className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 border border-white/10"
        >
          Saiba Mais
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {[
          { title: 'Gestão Ágil', desc: 'Atenda mais pessoas em menos tempo com fluxos otimizados.' },
          { title: 'Dados Seguros', desc: 'Privacidade e segurança total para as informações dos assistidos.' },
          { title: 'Relatórios Reais', desc: 'Visualize o impacto da sua ação social com dados precisos.' }
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-colors text-left group">
            <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
              <div className="h-6 w-6 rounded bg-indigo-500/40" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
