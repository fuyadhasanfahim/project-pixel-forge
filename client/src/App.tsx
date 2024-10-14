import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage'
import ResetPassword from './pages/auth/ResetPassword'
import { Toaster } from 'react-hot-toast'
import OTPPage from './pages/auth/OTPPage'
import NewPasswordPage from './pages/auth/NewPasswordPage'
import useAuthCheck from './hooks/useAuthCheck'
import EmailVerificationPage from './pages/auth/EmailVerificationPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import ConfirmAccountPage from './pages/auth/ConfirmAccountPage'
import AddOrderPage from './pages/dashboard/AddOrderPage'
import PreviousOrdersPage from './pages/dashboard/PreviousOrdersPage'

export default function App() {
    const authChecked = useAuthCheck()

    return !authChecked ? (
        <div className="h-screen flex justify-center items-center bg-white">
            <img
                className="h-16 w-16"
                src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                alt=""
            />
        </div>
    ) : (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/auth"
                    element={
                        <PublicRoute>
                            <AuthPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/verify-email"
                    element={
                        <PrivateRoute>
                            <EmailVerificationPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/auth/forget-password"
                    element={
                        <PrivateRoute>
                            <ResetPassword />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/auth/forget-password/opt"
                    element={
                        <PrivateRoute>
                            <OTPPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/auth/forget-password/new-password"
                    element={
                        <PrivateRoute>
                            <NewPasswordPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/auth/confirm-account"
                    element={
                        <PrivateRoute>
                            <ConfirmAccountPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/add-order"
                    element={
                        <PrivateRoute>
                            <AddOrderPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/previous-orders"
                    element={
                        <PrivateRoute>
                            <PreviousOrdersPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
            <Toaster position="bottom-right" reverseOrder={false} />
        </BrowserRouter>
    )
}
