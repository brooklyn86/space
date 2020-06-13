import React, {useState} from 'react';

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
import firebaseConfig from '../../../../services/firebaseConfig';
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
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const classes = useStyles();
    const db = firebaseConfig.firestore();

    function handlerSubmitForm(e){
        e.preventDefault();
        firebaseConfig.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result) {
            localStorage.setItem('uid',result.user.uid);
            db.collection("users").add({
                name: name,
                id: result.user.uid,
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            console.log(result.user.uid);
          // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
        }).catch(function(error) {
            console.log(error)
          // Handle error.
        });
    }
    return (
        <Grid container alignContent="center" justify={"center"} direction={"column"}>
            <Grid item>
                <Card elevation={4}>
                    <Container component="main" maxWidth="xs">
                        <div className={classes.paper}>
                            <img src={StartupSpaceLogo} width="360dp" alt="Logo"/>
                            <Box height={"36px"}/>
                            <form  onSubmit={handlerSubmitForm} className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
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
