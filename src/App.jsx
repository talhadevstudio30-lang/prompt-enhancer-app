import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import Hero from './components/Hero-Page/hero';
import Header from './components/header/header';
import Footer from './components/Footer/footer';

const Prompt_Enhancer = lazy(() => import('./components/Prompt-Enhancer/prompt-enhacer'));

function AppLayout() {
  return (
    <>
      <Header />
      {/* Suspense safely handles lazy loading for child routes rendered by Outlet */}
      <Suspense fallback={<div className="text-lg md:text-2xl text-center">Loading page...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/enhance" element={<Prompt_Enhancer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;