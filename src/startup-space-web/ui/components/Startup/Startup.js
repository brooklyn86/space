import React, {useState, useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateStartup from "./Create";

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
    table: {
      minWidth: 650,
    },
}));


export default function Startups() {
    const [startups, setStartups] = useState([]);
    const history = useHistory();
    const db = firebaseConfig.firestore();

    const classes = useStyles();
    useEffect(() => {
      var startup = [];
      db.collection("startups").get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          
          startup.push([{'id' : doc.id, 'dados' : doc.data()}]);
      });
      
        setStartups(startup)
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    }, []);
    return (
      <div className='row'>
          <h4>Conheça algumas das nossas Statups 
            <div className='row'>
            <CreateStartup />
            {
              (localStorage.getItem('startup') == "1"
              &&
              <Link to={'/my-startup'}><Button>Minha Startup</Button></Link>
              
              )

            }
            </div>
          </h4>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Startup</TableCell>
                  <TableCell>Descrição</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {startups.map((row) => (
                  <Link to={`/startup/${row[0].id}`}>
                    <TableRow key={row[0].id}>
                      <TableCell component="th" scope="row">
                        {row[0].dados.name}
                      </TableCell>
                      <TableCell component="th" scope="row">{row[0].dados.description}</TableCell>
                    </TableRow>
                  </Link>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        
        </div>
    );
}
