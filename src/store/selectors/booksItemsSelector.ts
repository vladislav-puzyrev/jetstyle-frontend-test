import { type RootState } from '../store'
import { type Book } from '../types/Book'

export const booksItemsSelector = (state: RootState): Book[] => state.books.items
