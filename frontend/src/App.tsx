import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import PlatformComparison from './components/PlatformComparison';
import SignUp from './components/SignUp';
import TrendDetail from './components/TrendDetail';
import Settings from './components/Settings';
import TrendSearch from './components/TrendSearch';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SavedTrends from './components/SavedTrends';
import NotificationSettings from './components/NotificationSettings';
import DefaultLayout from './components/layout/DefaultLayout';
import LandingLayout from './components/layout/LandingLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingLayout>
              <LandingPage />
            </LandingLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <LandingLayout>
              <SignUp />
            </LandingLayout>
          }
        />
        <Route
          path="/login"
          element={
            <LandingLayout>
              <Login />
            </LandingLayout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <LandingLayout>
              <ForgotPassword />
            </LandingLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          }
        />
        <Route
          path="/compare"
          element={
            <DefaultLayout>
              <PlatformComparison />
            </DefaultLayout>
          }
        />
        <Route
          path="/trend/:id"
          element={
            <DefaultLayout>
              <TrendDetail />
            </DefaultLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DefaultLayout>
              <Settings />
            </DefaultLayout>
          }
        />
        <Route
          path="/search"
          element={
            <DefaultLayout>
              <TrendSearch />
            </DefaultLayout>
          }
        />
        <Route
          path="/saved"
          element={
            <DefaultLayout>
              <SavedTrends />
            </DefaultLayout>
          }
        />
        <Route
          path="/notifications"
          element={
            <DefaultLayout>
              <NotificationSettings />
            </DefaultLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
