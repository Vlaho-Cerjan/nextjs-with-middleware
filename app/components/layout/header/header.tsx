import styled from "@emotion/styled";
import { Box, Button, Divider, Skeleton, Avatar, Typography, TextField, InputAdornment, ButtonProps, Menu, MenuItem } from "@mui/material";
import { CustomThemeContext } from "app/store/customThemeContext";
import { signOut, useSession } from "next-auth/react";
import { useContext, useState, useEffect, useRef, MouseEvent } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Link from "app/components/navigation/Link";
import React from "react";

const HeaderBox = styled(Box)`
    display: flex;
    height: 94px;

    > div {
        flex: 1 1 auto;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`
const UserButton = styled(Button)`
    display: flex;
    align-items: center;
    text-transform: capitalize;
    padding: 2px 8px;
    border-radius: 22px;
`

const InputBox = styled(Box)`
    display: flex;
    padding: 0 40px;
`
interface HeaderProps {
    searchTitle: string, // set string in LayoutStrings.ts and call it on the page
    searchFunction: () => void,
    buttonTitle: JSX.Element | string, // set string in LayoutStrings.ts and call it on the page
    buttonHref: string,
}



const Header = ({searchTitle, searchFunction, buttonTitle, buttonHref}: HeaderProps) => {

    const CloseInputButton = (props: ButtonProps) => (
        <Button
            onClick={() => setSearchValue("")}
            variant="text"
            sx={{ p: 0, minWidth: "24px", minHeight: "24px" }}
            {...props}
        />
    )

    const { theme } = useContext(CustomThemeContext);

    const { data, status } = useSession();

    const searchRef = useRef<HTMLInputElement>(null);

    const [searchValue, setSearchValue] = useState("");

    const userButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if(searchRef.current) setSearchValue(searchRef.current.value);
    }, [])

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <HeaderBox component={"header"}>
            <InputBox>
                <Box sx={{ flexGrow: 1 }}>
                    <TextField
                        fullWidth
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        inputRef={searchRef}
                        inputProps={{
                            style: {
                                padding: "10.5px 0px",
                            }
                        }}
                        InputProps={{
                            sx: {
                                borderRadius: "22px",
                                backgroundColor: "background.default"
                            },
                            startAdornment:
                            <InputAdornment position="start">
                                <SearchRoundedIcon />
                            </InputAdornment>,
                            endAdornment:
                            <InputAdornment sx={{ opacity: (searchValue==="")?"0":"1",  visibility: (searchValue==="")?"hidden":"visible", transition: "opacity ease-in-out 0.5s, visibility ease-in-out 0.5s" }} component={CloseInputButton} position="end">
                                <HighlightOffTwoToneIcon
                                    sx={{ cursor: "pointer" }}
                                />
                            </InputAdornment>
                        }}
                        placeholder={searchTitle===""?"Search...":searchTitle}
                    />
                </Box>
                <Box sx={{ pl: "40px" }}>
                    <Button sx={{ minHeight: "44px", textTransform: "Capitalize", borderRadius: "22px" }} href={buttonHref} LinkComponent={Link}>
                        {buttonTitle}
                    </Button>
                </Box>
            </InputBox>
            <Divider sx={{ borderRightWidth: "2px" }} flexItem orientation="vertical" />
            <Box maxWidth={270}>
                {status === "loading"?(
                <Skeleton variant="text" width={190}/>
                ):(
                <UserButton
                    id="user-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    ref={userButtonRef}
                >
                    <Avatar sx={{ bgcolor: "transparent" }}><AccountCircleOutlinedIcon sx={{ fill: theme.palette.text.secondary }} /></Avatar>
                    <Typography maxWidth={180}>{(data?.user.first_name)+" "+(data?.user.last_name)}</Typography>
                    <KeyboardArrowDownIcon sx={{ fill: theme.palette.text.secondary }} />
                </UserButton>
                )}
                <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            width: userButtonRef.current?.clientWidth+"px",
                        }
                    }}
                    MenuListProps={{
                    'aria-labelledby': 'user-button',
                    }}
                >
                    <MenuItem
                        sx={{
                            color: "text.secondary",
                            justifyContent: "center",
                        }}
                        onClick={() => signOut()}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </HeaderBox>
    )
}

export default Header;