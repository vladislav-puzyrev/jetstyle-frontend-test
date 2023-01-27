import React, { type FC } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

export const Header: FC = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" component="h1" color="inherit" noWrap>
          jetstyle-frontend-test
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
