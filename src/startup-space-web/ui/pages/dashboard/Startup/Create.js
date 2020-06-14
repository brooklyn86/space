import React, {useState} from 'react';
import {Link as RouterLink,useHistory} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
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


export default function Create() {
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
       
        </>
    );
}
