import React, {useContext, useState } from "react";
import { FetchError } from "app/lib/fetchJson";
import { Fade, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import Link from "../navigation/Link";
import { CustomThemeContext } from '../../store/customThemeContext';
import MailIcon from '../../../public/icons/email.svg';
import PassIcon from '../../../public/icons/password.svg';
import Image from 'next/image';
import { useSnackbar } from "notistack";
import useTranslation from '../../utility/useTranslation';
import { ExceptionStrings } from '../../lang/common/exceptions';
import { signIn } from "next-auth/react";
import { LoginStrings } from './lang/loginStrings';
import { GenericText } from "app/lang/common/genericText";
import { StyledButton } from "./styledComponents/styledButton";
import DoneIcon from '@mui/icons-material/Done';
import router from "next/router";

const LoginComponent = () => {
    const { theme } = useContext(CustomThemeContext);

    const { t } = useTranslation(ExceptionStrings);

    const loginStrings = useTranslation(LoginStrings).t;

    const genericText = useTranslation(GenericText).t;

    const { enqueueSnackbar } = useSnackbar();

    const [inputError, setInputError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setInputError(false);

        const body = {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        };

        try{
            const response: any = await signIn('credentials', {
                redirect: false,
                email: body.email,
                password: body.password,
                callbackUrl: `${window.location.origin}`,
            });

            if(response && !response.ok){
                enqueueSnackbar(t("authentication_failed"), { variant: "error" });
                setInputError(true);
            }else{
                setSuccess(true);
                router.push('/');
            }

            setLoading(false);
        } catch (error) {
            if (error instanceof FetchError) {
                console.error("An unexpected error happened:", error.data.message);
            } else {
                console.error("An unexpected error happened:", error);
            }

            setLoading(false);
        }
    }

    return (
        <Paper elevation={4} sx={{ maxWidth: "320px", p: "16px", textAlign: "center", borderRadius: "16px" }}>
            <Typography component={"h1"} padding="25px 0 35px" fontWeight={"400"} fontSize={"20px"}>{loginStrings("signInToLoop")}</Typography>
            <form onSubmit={handleSubmit}>
            <Grid container  spacing={2}>
                <Grid item xs={12} textAlign="center" sx={{ pb: "20px" }}>
                <TextField
                    required
                    fullWidth
                    error={inputError}
                    id="email"
                    label={genericText("email")}
                    name="email"
                    autoComplete="email"
                    type="text"
                    InputProps={{
                        sx: {  borderRadius: "12px" },
                        endAdornment: <InputAdornment position="end"><Image alt="mail icon" src={MailIcon} layout="fixed" width={20} height={16} /></InputAdornment>
                    }}
                />
                </Grid>
                <Grid item xs={12} textAlign="center">
                <TextField
                    required
                    fullWidth
                    error={inputError}
                    id="password"
                    label={genericText("password")}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    InputProps={{
                    sx: { paddingRight: "16px", borderRadius: "12px"},
                    endAdornment: <InputAdornment position="end"><Image alt="password icon" src={PassIcon} layout="fixed" width={16} height={21} /></InputAdornment>
                    }}
                />
                </Grid>
                <Grid item xs={12} textAlign="center" sx={{ pb: "16px" }}>
                <Link color={theme.palette.text.secondary} underline="hover" fontSize="14px" lineHeight="17px" href="/auth/forgot-password">
                    {loginStrings("resetPassword")}
                </Link>
                </Grid>
            </Grid>
            <StyledButton loading={loading} sx={{ backgroundColor: success?"success.main":"primary.dark" }} type="submit" variant="contained">
                {success?<Fade in={success}><DoneIcon fontSize="large" /></Fade>:loginStrings("signIn")}
            </StyledButton>
            </form>
        </Paper>
    )
}

export default LoginComponent;