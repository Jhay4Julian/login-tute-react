import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginForm from './components/LoginForm'
import Dashboard from './pages/dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
