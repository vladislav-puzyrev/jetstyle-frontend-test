import React, { type FC } from 'react'
import { Box, Typography } from '@mui/material'

export const Footer: FC = () => {
  return (
    <Box sx={{ p: 6, width: '100%' }} component="footer">
      <Typography variant="h6" component="div" align="center" gutterBottom>
        Тестовое задание
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="div"
      >
        Vladislav Puzyrev
      </Typography>
    </Box>
  )
}
