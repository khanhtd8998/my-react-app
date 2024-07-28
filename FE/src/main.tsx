import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/style.scss'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ToastProvider } from './components/ui/toast.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
