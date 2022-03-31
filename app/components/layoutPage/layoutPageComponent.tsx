import { Box, styled, Paper, Typography, Button, Divider } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

const ContainerBox = styled(Box)`
    padding: 0 80px;
`

const StyledPaper = styled(Paper)`
    border-radius: 16px;
`

const LayoutHeaderBox = styled(Box)`
    display: flex;
    align-items: center;
    padding: 25px 40px;
`

const LayoutHeaderButtons = styled(Button)`
    border-radius: 22px;
    padding: 10px 20px;
    text-transform: capitalize;
`

const LayoutHeaderButtonText = styled(Typography)`
    font-size: 14px;
    line-height: 17px;
    color: #fff;
`

const LayoutPageComponent = () => {

    return (
        <ContainerBox>
            <StyledPaper
                variant='outlined'
            >
                <LayoutHeaderBox>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography component={"h1"}>
                            Edit Layout
                        </Typography>
                    </Box>
                    <Box>
                        <LayoutHeaderButtons
                            variant="contained"
                            color="success"
                            sx={{ mr: "15px" }}
                            startIcon={<SaveOutlinedIcon sx={{ fontSize: "24px", fill: "#fff" }} />}
                        >
                            <LayoutHeaderButtonText>
                                Save Draft
                            </LayoutHeaderButtonText>
                        </LayoutHeaderButtons>
                        <LayoutHeaderButtons
                            variant="contained"
                            sx={{ ml: "15px" }}
                            startIcon={<BackupOutlinedIcon sx={{ fontSize: "24px", fill: "#fff" }}/>}
                        >
                            <LayoutHeaderButtonText>
                                Publish Live
                            </LayoutHeaderButtonText>
                        </LayoutHeaderButtons>
                    </Box>
                </LayoutHeaderBox>
                <Divider sx={{ borderBottomWidth: "2px" }} />
                <Box sx={{ p: "42px 0" }} >

                </Box>
            </StyledPaper>
        </ContainerBox>
    )
}

export default LayoutPageComponent;