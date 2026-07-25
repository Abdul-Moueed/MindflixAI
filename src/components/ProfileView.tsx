import React from 'react';
import { UserProfile } from '../types';
import { MOOD_HISTORY } from '../data/movies';

interface ProfileViewProps {
  user: UserProfile;
  favoritesCount?: number;
  onLogOut: () => void;
  onOpenSettingsItem: (settingName: string) => void;
  onOpenAuthModal?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  favoritesCount = 4,
  onLogOut,
  onOpenSettingsItem,
  onOpenAuthModal
}) => {
  const settingsOptions = [
    {
      id: 'eq',
      title: 'Emotional Intelligence Settings',
      subtitle: 'Refine recommendation algorithms & mood sensitivity',
      icon: 'psychology',
      iconBg: 'bg-[#7701d0]/20',
      iconColor: 'text-[#dcb8ff]'
    },
    {
      id: 'services',
      title: 'Linked Streaming Services',
      subtitle: 'Netflix, HBO Max, Prime Video, Apple TV+',
      icon: 'hub',
      iconBg: 'bg-[#007d9a]/20',
      iconColor: 'text-[#4cd6ff]'
    },
    {
      id: 'plan',
      title: 'Subscription Plan',
      subtitle: user.plan || 'MindFlix Pro Neural',
      subtitleColor: 'text-[#e50914]',
      icon: 'loyalty',
      iconBg: 'bg-[#e50914]/15',
      iconColor: 'text-[#e50914]'
    },
    {
      id: 'privacy',
      title: 'Privacy & Data Vault',
      subtitle: 'Synced with Supabase encrypted database',
      icon: 'shield_with_heart',
      iconBg: 'bg-[#353534]',
      iconColor: 'text-[#e9bcb6]'
    }
  ];

  return (
    <div className="pt-20 pb-32 px-5 max-w-screen-md mx-auto space-y-8 animate-fade-in">
      {/* Profile Header */}
      <section className="flex flex-col items-center text-center space-y-3 pt-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full ai-gradient-border p-1 ai-pulse shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="absolute bottom-1 right-1 bg-[#e50914] p-1.5 rounded-full shadow-lg border border-white/20">
            <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>
        </div>

        <div>
          <h2 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-white">
            {user.name}
          </h2>
          <p className="font-inter text-xs text-[#ffb4aa] tracking-widest uppercase font-semibold">
            {user.title || "Pro Cinema Architect"}
          </p>
          <p className="font-inter text-[11px] text-[#e9bcb6]/60 mt-1">
            Member since {user.joinedDate || "October 2024"}
          </p>
        </div>

        {/* Account Provider Banner */}
        <div className="w-full max-w-md p-4 rounded-2xl bg-[#1c1b1b] border border-white/10 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7701d0]/20 border border-[#7701d0]/40 flex items-center justify-center text-[#4cd6ff]">
              <span className="material-symbols-outlined text-xl">
                {user.provider === 'google' ? 'verified_user' : 'account_circle'}
              </span>
            </div>
            <div className="text-left">
              <p className="font-montserrat font-bold text-xs text-white">
                {user.email || "Guest User"}
              </p>
              <p className="font-inter text-[11px] text-[#e9bcb6]/60">
                {user.provider === 'google'
                  ? 'Authenticated via Google'
                  : user.provider === 'email'
                  ? 'Authenticated via Email'
                  : 'Local Demo Account'}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAuthModal}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-montserrat font-bold text-xs transition-colors border border-white/10 whitespace-nowrap"
          >
            {user.email ? 'Switch' : 'Sign In'}
          </button>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-3 gap-3">
        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center space-y-1 shadow-lg border border-white/10 text-center">
          <span className="font-montserrat font-extrabold text-xl sm:text-2xl text-[#4cd6ff]">
            {user.analyzedFilms || 14}
          </span>
          <span className="font-inter text-[10px] text-[#e9bcb6]/70 uppercase tracking-wider font-semibold">
            Total Analyses
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center space-y-1 shadow-lg border border-white/10 text-center">
          <span className="font-montserrat font-extrabold text-xl sm:text-2xl text-[#e50914]">
            {favoritesCount}
          </span>
          <span className="font-inter text-[10px] text-[#e9bcb6]/70 uppercase tracking-wider font-semibold">
            Saved Movies
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center space-y-1 shadow-lg border border-white/10 text-center">
          <span className="font-montserrat font-extrabold text-xl sm:text-2xl text-[#dcb8ff]">
            {user.eqAlignment || 94}%
          </span>
          <span className="font-inter text-[10px] text-[#e9bcb6]/70 uppercase tracking-wider font-semibold">
            EQ Alignment
          </span>
        </div>
      </section>

      {/* Mood History Overview */}
      <section className="glass-card p-5 rounded-2xl border border-white/10 space-y-3 shadow-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd6ff] text-sm">history</span>
            <h3 className="font-montserrat text-sm font-bold text-white uppercase tracking-wider">
              Recent Mood History
            </h3>
          </div>
          <span className="font-inter text-[11px] text-[#e9bcb6]/60">7-Day Trend</span>
        </div>

        <div className="flex items-end justify-between h-20 gap-2 pt-2">
          {MOOD_HISTORY.map((item) => (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full bg-[#201f1f] rounded-full h-full relative overflow-hidden flex items-end">
                <div
                  className={`w-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ height: `${item.value}%` }}
                ></div>
              </div>
              <span className="font-inter text-[10px] text-[#e9bcb6]/60 font-semibold">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Settings Options */}
      <section className="space-y-3">
        <h3 className="font-montserrat text-lg font-bold text-white px-1">
          Settings & Preferences
        </h3>

        <div className="space-y-2.5">
          {settingsOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenSettingsItem(item.title)}
              className="glass-panel p-4 rounded-2xl flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-transform border border-white/10 hover:border-white/20 shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                  <span className={`material-symbols-outlined ${item.iconColor} text-xl`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {item.icon}
                  </span>
                </div>

                <div>
                  <p className="font-inter font-semibold text-sm text-white group-hover:text-[#ffb4aa] transition-colors">
                    {item.title}
                  </p>
                  <p className={`font-inter text-xs ${item.subtitleColor || 'text-[#e9bcb6]/50'}`}>
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <span className="material-symbols-outlined text-[#e9bcb6]/40 group-hover:text-[#ffb4aa] transition-colors text-sm">
                chevron_right
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Logout */}
      <section className="pt-2 space-y-4">
        <button
          onClick={onLogOut}
          className="w-full py-3.5 rounded-2xl font-montserrat font-bold text-sm text-[#e50914] border border-[#e50914]/30 hover:bg-[#e50914]/10 active:scale-95 transition-all duration-200"
        >
          Log Out
        </button>

        <p className="text-center font-inter text-[11px] text-[#e9bcb6]/30">
          MindFlix AI • Production Engine v4.2.0
        </p>
      </section>
    </div>
  );
};
