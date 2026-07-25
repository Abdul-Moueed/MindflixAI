import React from 'react';
import { NavigationTab } from '../types';

interface BottomNavBarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onNavigate }) => {
  // Hide bottom nav bar during active questionnaire or analyzing states for immersive feel
  if (currentTab === 'questionnaire' || currentTab === 'analyzing') {
    return null;
  }

  const navItems = [
    { tab: 'home' as NavigationTab, label: 'Home', icon: 'home' },
    { tab: 'search' as NavigationTab, label: 'Search', icon: 'search' },
    { tab: 'favorites' as NavigationTab, label: 'Favorites', icon: 'favorite' },
    { tab: 'profile' as NavigationTab, label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-[#0e0e0e]/85 backdrop-blur-3xl border-t border-white/10 shadow-2xl">
      <div className="flex justify-around items-center h-20 w-full max-w-screen-xl mx-auto px-4 pb-safe">
        {navItems.map(({ tab, label, icon }) => {
          const isActive = currentTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onNavigate(tab)}
              className={`flex flex-col items-center justify-center py-1 px-3 transition-all duration-200 group active:scale-90 ${
                isActive ? 'text-[#e50914] font-bold' : 'text-[#e9bcb6]/50 hover:text-white'
              }`}
            >
              <span
                className="material-symbols-outlined text-2xl mb-1 group-hover:scale-110 transition-transform"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {icon}
              </span>
              <span className="font-inter text-xs tracking-wide">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
