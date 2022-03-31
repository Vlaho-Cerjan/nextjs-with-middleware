import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const ContentBox = styled(Box)`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
`

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box>
            <ContentBox component={"main"}>
                {children}
            </ContentBox>
        </Box>
    )
}

export default AuthLayout;