import React, { type FC } from 'react'
import { Container, CssBaseline } from '@mui/material'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BooksForm } from './components/BooksForm'
import { ChangeForm } from './components/ChangeForm'
import { BooksList } from './components/BooksList'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store/store'

const persistor = persistStore(store)

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading="Persisting.." persistor={persistor}>
        <CssBaseline/>
        <Header/>
        <Container component="main" maxWidth="md" sx={{ flexGrow: 1 }}>
          <BooksForm/>
          <ChangeForm/>
          <BooksList/>
        </Container>
        <Footer/>
      </PersistGate>
    </Provider>
  )
}

export default App
