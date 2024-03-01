import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Components
import MainLayout from './components/main-layout'

// Pages
import HomePage from './pages/home-page'
import NotePage from './pages/note-page'
import NotesListPage from './pages/notes-list-page'

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/notes" element={<NotesListPage />} />
              <Route path="/notes/:noteId" element={<NotePage />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
