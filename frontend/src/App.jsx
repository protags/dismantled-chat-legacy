import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import './ui/themes.css';
import useThemes from './store/useThemes';
import useSocket from './store/useSocket';
import SplashScreen from './components/SplashScreen.jsx';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const { currentTheme, themes } = useThemes();
  const connect = useSocket((s) => s.connect);
  const disconnect = useSocket((s) => s.disconnect);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <div className={`min-h-dvh ${themes[currentTheme].prefix} overflow-hidden`}>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chat' element={<Chat />} />
          </Routes>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App