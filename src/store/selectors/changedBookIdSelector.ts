import { type RootState } from '../store'

export const changedBookIdSelector = (state: RootState): number | null => state.books.changedBookId
