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


export default function Home() {
    const history = useHistory();


    firebaseConfig.auth().onAuthStateChanged(function(user) {
        if (!user) {
            history.push('/entrar');

        } 
    });

    const db = firebaseConfig.firestore();

    const classes = useStyles();

    return (
        <>
        
        <Menu />
        <Startups />
        </>
    );
}
