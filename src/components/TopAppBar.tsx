import React from 'react';
import { NavigationTab, UserProfile } from '../types';

interface TopAppBarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  user: UserProfile;
  onOpenMenu?: () => void;
  onOpenAuth?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentTab,
  onNavigate,
  user,
  onOpenMenu,
  onOpenAuth
}) => {
  const isQuestionnaire = currentTab === 'questionnaire';

  return (
    <header className="fixed top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-5 transition-all">
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
        <div className="flex items-center gap-3">
          {isQuestionnaire ? (
            <button
              onClick={() => onNavigate('home')}
              className="text-[#e9bcb6]/70 hover:text-white transition-colors active:scale-95 p-1 rounded-full"
              aria-label="Close survey"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          ) : (
            <button
              onClick={onOpenMenu}
              className="text-[#ffb4aa] hover:opacity-80 transition-opacity active:scale-95 p-1 rounded-full"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 text-left group"
          >
            <span className="font-montserrat text-xl sm:text-2xl font-extrabold text-[#e50914] tracking-tighter group-hover:opacity-90 transition-opacity">
              MindFlix <span className="text-white">AI</span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Sign In / Account Quick Toggle */}
          <button
            onClick={onOpenAuth}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#e50914]/50 transition-colors text-xs font-montserrat font-bold text-white/80"
          >
            <span className="material-symbols-outlined text-sm text-[#4cd6ff]">
              {user.provider === 'google' ? 'verified_user' : 'account_circle'}
            </span>
            <span>{user.email ? 'Account' : 'Sign In'}</span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            className={`relative w-10 h-10 rounded-full border-2 border-[#e50914] overflow-hidden active:scale-95 transition-transform duration-200 shadow-md ${
              currentTab === 'profile' ? 'ring-2 ring-[#4cd6ff] ring-offset-2 ring-offset-[#131313]' : ''
            }`}
            title="User Profile"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

