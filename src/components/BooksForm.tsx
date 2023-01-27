import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addBook } from '../store/slices/booksSlice'

interface FormData {
  title: string
  author: string
  cover: FileList
}

export const BooksForm: FC = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = handleSubmit(data => {
    const reader = new FileReader()
    reader.readAsDataURL(data.cover[0])
    reader.onload = () => {
      dispatch(addBook({
        book: { title: data.title, author: data.author, cover: String(reader.result) }
      }))
    }
  })

  return (
    <Box sx={{ pt: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Добавить книги
      </Typography>
      <Grid
        component="form"
        onSubmit={onSubmit as () => void}
      >
        <Grid container spacing={2} direction="row">
          <Grid item>
            <TextField
              required
              label="Название"
              variant="standard"
              {...register('title', { required: true })}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Автор"
              variant="standard"
              {...register('author', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row" sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="contained" component="label">
              Загрузить обложку
              <input hidden accept="image/*" type="file" {...register('cover', { required: true })}/>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Добавить
            </Button>
          </Grid>
        </Grid>
        {(errors.cover != null)
          ? (
            <Grid sx={{ mt: 2 }}>
              <Typography color="error">
                Добавьте обложку
              </Typography>
            </Grid>
            )
          : null}
      </Grid>
    </Box>
  )
}
