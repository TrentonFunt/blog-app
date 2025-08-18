import { RouterProvider } from "react-router"
import { routes } from "./routes"
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--b1)',
            color: 'var(--bc)',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
