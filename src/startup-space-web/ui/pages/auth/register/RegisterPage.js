import React from 'react';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import StartupSpaceLogo from "../../assets/image/logo/startup-space.png";
import {LOGIN_ROUTE} from "../../../../Routes";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',

        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {

        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {},
}));

export  default function RegisterPage() {

    const classes = useStyles();

    return (
        <Grid container alignContent="center" justify={"center"} direction={"column"}>
            <Grid item>
                <Card elevation={4}>
                    <Container component="main" maxWidth="xs">
                        <div className={classes.paper}>
                            <img src={StartupSpaceLogo} width="360dp" alt="Logo"/>
                            <Box height={"36px"}/>
                            <form className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    name="name"
                                    autoComplete="name"
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar senha"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                />
                                <Box height={"12px"} />
                                <Grid container direction="row-reverse" justify={"space-between"}>
                                    <Grid item>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Cadastrar
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Box width={"12px"}/>
                                    </Grid>
                                    <Grid item>
                                        <Link  style={{textDecoration: "none"}} to={LOGIN_ROUTE} >
                                            <Button
                                                color="primary"
                                            >
                                                Voltar
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box height={"24px"} />
                            </form>
                        </div>
                    </Container>
                </Card>
            </Grid>
        </Grid>
    );
}
