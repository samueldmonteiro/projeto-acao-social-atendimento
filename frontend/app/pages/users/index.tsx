import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { findUsers } from '@/requests/user.request';
import { type User } from '@/types/user.type';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Users() {

  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    findUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Usuários</h1>
          <p className="text-gray-400">Gerencie todos os usuários cadastrados no sistema.</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-indigo-600/20">
          Novo Usuário
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user) => (
          <div key={user.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl border border-indigo-500/20">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {user.name}
                </h2>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Membro</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{user.email}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <Link to={`/users/${user.id}`} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-2">
                Ver Perfil Completo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}