import { ThemeProvider, createTheme } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Devices from './components/pages/Devices.jsx'
import Start from './components/pages/Start.jsx'
import Playlists from './components/pages/playlists/Playlists.jsx'
import Authorization from './components/pages/Authorization.jsx'
import Songs from './components/pages/songs/Songs.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: "/callback",
    element: <Authorization />
  },
  {
    path: "/devices",
    element: <Devices />
  },
  {
    path: "/start",
    element: <Start />
  },
  {
    path: "/playlists",
    element: <Playlists />
  },
  {
    path: "/songs",
    element: <Songs />
  }
])

const theme = createTheme({});

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
)
