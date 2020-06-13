import React, {useState, useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Card from "@material-ui/core/Card";
import firebaseConfig from '../../../services/firebaseConfig';
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


export default function Startups() {
    const [startups, setStartups] = useState([]);
    const [password, setPassword] = useState('');
    const history = useHistory();

    const db = firebaseConfig.firestore();

    const classes = useStyles();
    useEffect(() => {
      var startup = [];
      db.collection("startups").get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          startup.push(doc.data());
      });
      
        setStartups(startup)
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    }, []);
    return (
      <div className='row'>
        
          {startups.map(item => (

            <Container key={item.id}>
            <Link to={`/statup/${item.id}`}><h1>{item.name}</h1></Link>
            </Container>
          ))}
         
        </div>
    );
}
