import { Box, Typography } from '@mui/material'
import React from 'react'

function PrivateLayout({children} : {children : React.ReactNode}) {
  return (
    <Box>
        <Typography>Private Layout</Typography>
        {children}
    </Box>
  )
}

export default PrivateLayout