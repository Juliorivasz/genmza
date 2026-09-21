import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HomePage } from './pages/home/HomePage';
import { BudgetPage } from './pages/budget/BudgetPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/presupuesto" element={<BudgetPage />} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
