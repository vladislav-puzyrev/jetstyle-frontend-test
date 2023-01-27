import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { changeBook, setChangedBookId } from '../store/slices/booksSlice'
import { changedBookIdSelector } from '../store/selectors/changedBookIdSelector'

interface FormData {
  title: string
  author: string
  cover: FileList
}

export const ChangeForm: FC = () => {
  const dispatch = useDispatch()
  const changedBookId = useSelector(changedBookIdSelector)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  if (changedBookId === null) {
    return null
  }

  const onSubmit = handleSubmit(data => {
    const reader = new FileReader()
    reader.readAsDataURL(data.cover[0])
    reader.onload = () => {
      dispatch(changeBook({
        id: changedBookId,
        book: { title: data.title, author: data.author, cover: String(reader.result) }
      }))
      dispatch(setChangedBookId({ id: null }))
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
        Редактирование #{changedBookId}
      </Typography>
      <Grid
        component="form"
        onSubmit={onSubmit as () => void}
      >
        <Grid container spacing={2} direction="row">
          <Grid item>
            <TextField
              required
              label="Новое название"
              variant="standard"
              {...register('title', { required: true })}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Новый автор"
              variant="standard"
              {...register('author', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row" sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="contained" component="label">
              Новая обложка
              <input hidden accept="image/*" type="file" {...register('cover', { required: true })}/>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Изменить
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => dispatch(setChangedBookId({ id: null }))}>
              Отменить
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
