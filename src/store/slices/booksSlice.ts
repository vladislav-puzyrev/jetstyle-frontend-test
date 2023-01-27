import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Book } from '../types/Book'

const initialState = {
  items: [] as Book[],
  changedBookId: null as number | null
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<{ book: Book }>) => {
      const { book } = action.payload
      state.items.push(book)
    },
    changeBook: (state, action: PayloadAction<{ id: number, book: Book }>) => {
      const { id, book } = action.payload
      state.items[id] = book
    },
    removeBook: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload
      state.items.splice(id, 1)
    },
    setChangedBookId: (state, action: PayloadAction<{ id: number | null }>) => {
      const { id } = action.payload
      state.changedBookId = id
    }
  }
})

export const { addBook, changeBook, removeBook, setChangedBookId } = booksSlice.actions
export default booksSlice.reducer
