import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { type FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { booksItemsSelector } from '../store/selectors/booksItemsSelector'
import { removeBook, setChangedBookId } from '../store/slices/booksSlice'

export const BooksList: FC = () => {
  const dispatch = useDispatch()
  const books = useSelector(booksItemsSelector)

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {(books.length === 0)
        ? (
          <Grid item xs={12} sm={6} md={4}>
            <Typography gutterBottom variant="h5" component="h2">
              Книги отсутствуют
            </Typography>
          </Grid>
          )
        : books.map((book, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"
                image={book.cover}
                alt="cover"
                width={145}
                height={205}
                sx={{ objectFit: 'contain' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  #{i}, {book.title}
                </Typography>
                <Typography>
                  {book.author}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => dispatch(setChangedBookId({ id: i }))}>Редактировать</Button>
                <Button size="small" onClick={() => {
                  dispatch(removeBook({ id: i }))
                  dispatch(setChangedBookId({ id: null }))
                }}>Удалить</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}
