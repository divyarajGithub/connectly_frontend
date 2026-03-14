import { Box } from '@mui/material'
import React from 'react'

function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box>{children}</Box>
    )
}

export default PublicLayout