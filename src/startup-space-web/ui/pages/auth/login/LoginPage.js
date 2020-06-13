import React, {useState} from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Card from "@material-ui/core/Card";
import {REGISTER_ROUTE} from "../../../../Routes";

import StartupSpaceLogo from "../../assets/image/logo/startup-space.png";
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


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    var user = firebaseConfig.auth().currentUser;

    if (user) {
        history.push('/dashboard');

    } 
    const db = firebaseConfig.firestore();

    function handlerSubmitFormLogin(e){
        e.preventDefault();
        firebaseConfig.auth().signInWithEmailAndPassword(email, password)
        .then(function(result) {
            localStorage.setItem('uid',result.user.uid);
            console.log(result.user.uid);

            db.collection("users").where("id", "==", result.user.uid)
            .get()
            .then(function(querySnapshot) {

                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
                history.push('/dashboard');
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

          // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
        }).catch(function(error) {
            console.log(error)
          // Handle error.
        });
    }
    const classes = useStyles();

    return (
        <Grid container alignContent="center" justify="center" direction="column">
            <Grid item>
                <Card elevation={4}>
                    <Container component="main" maxWidth="xs">

                        <div className={classes.paper}>
                            <img width="360dp" src={StartupSpaceLogo}/>
                            <Box height={"36px"}/>

                            <form onSubmit={handlerSubmitFormLogin} className={classes.form} noValidate>
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
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <Box height={"24px"} />
                                <Grid container direction="row" justify="flex-end">

                                    <Grid item>
                                        <RouterLink style={{ textDecoration: "none" }}to={REGISTER_ROUTE}>
                                            <Button
                                                color="primary"
                                            >
                                                Cadastre-se
                                            </Button>
                                        </RouterLink>
                                    </Grid>
                                    <Grid item> <Box width={"12px"}/></Grid>
                                    <Grid item> <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Entrar
                                    </Button></Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>
                    <Box height={"24px"} />
                </Card>
            </Grid>
        </Grid>
    );
}
