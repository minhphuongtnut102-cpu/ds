import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { SinglyVisualizer } from './components/SinglyVisualizer';
import { DoublyVisualizer } from './components/DoublyVisualizer';

export default function App() {
  const [view, setView] = useState<'home' | 'singly' | 'doubly'>('home');

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {view === 'home' && <HomePage onSelect={setView} />}
      {view === 'singly' && <SinglyVisualizer onBack={() => setView('home')} />}
      {view === 'doubly' && <DoublyVisualizer onBack={() => setView('home')} />}
    </div>
  );
}
