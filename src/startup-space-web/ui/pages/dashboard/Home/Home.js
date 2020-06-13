import React, {useState} from 'react';
import {Link as RouterLink,useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Card from "@material-ui/core/Card";
import {REGISTER_ROUTE} from "../../../../Routes";
import Startups from "../../../components/Startup/Startup";
import Menu from "../../../components/Menu/Menu";


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


export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    var user = firebaseConfig.auth().currentUser;

    if (user) {
        console.log(user.uid)
    } else {
        history.push('/entrar');

    // No user is signed in.
    }
    const db = firebaseConfig.firestore();

    const classes = useStyles();

    return (
        <>
        <Menu />
        <Startups />
        </>
    );
}
