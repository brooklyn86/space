import React, {useState,useEffect} from 'react';
import {Link ,useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddToPhotosRoundedIcon from '@material-ui/icons/AddToPhotosRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {REGISTER_ROUTE} from "../../../../Routes";
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
    root: {
        maxWidth: "100%",
    },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
}));


export default function Startup() {
    const [startup, setStartup] = useState([]);
    const [member, setMember] = useState('');
    const history = useHistory();
    const db = firebaseConfig.firestore();
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    useEffect(() => {
        firebaseConfig.auth().onAuthStateChanged(function(user) {
            if (!user) {
                history.push('/entrar');
    
            } 
        });
        var uid = localStorage.getItem('uid');
     
        var dono = db.collection("startups").where("user_id", "==",uid)
        dono.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var array = [{'id':doc.id, 'dados':doc.data()}]
                setStartup(array);
            });

        });


        var docRef = db.collection("startup_members").where("user_id", "==",uid)

       docRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var startupArray = [doc.data()];
            setMember(doc.id)
            var startupsDB = db.collection("startups").doc(startupArray[0].startup_id)
            startupsDB.get().then(function(query) {
                if(query.exists == true){
                    var array = [{'id':startupArray[0].startup_id, 'dados':query.data()}]
                    setStartup(array);
                }else{
                 history.push('/dashboard');

                }
               
             });

        });
        
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
    },[]);
    function handleDelete(){
        db.collection("startups").doc(startup[0].id).delete().then(function() {
            var docRef = db.collection("startup_members").where("startup_id", "==",startup[0].id)
            docRef.get().then(function(querySnapshot) {
                if(querySnapshot.empty == false){
                    querySnapshot.forEach(function(doc) {
                        db.collection("startup_members").doc(doc.id).delete().then(function() {});
                    })
                }
                
            });
            localStorage.setItem('startup',0);
           alert("Startup deletada com sucesso");
           history.push('/dashboard');
           
        }).catch(function(error) {
           alert("Erro ao deletar");
        });
    }

    function handleExit(){
        db.collection("startup_members").doc(member).delete().then(function() {
            localStorage.setItem('startup',0)
           alert("Você saiu!");

            history.push('/dashboard');
        }).catch(function(error) {
           alert("Erro ao deletar");
        });
    }
    return (
        <>
        {console.log(startup)}
   
        <Menu />
        {startup.length > 0 ? 
        <Card className={classes.root}>
        <CardHeader
            avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
                {startup[0].dados.name}
            </Avatar>
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={startup[0].dados.name}
            subheader=""
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                {startup[0].dados.description}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            {
                localStorage.getItem('uid') ==startup[0].dados.user_id ?
                <IconButton aria-label="Fazer Parte" >
                    <Button onClick={handleDelete}>Excluir</Button>
                </IconButton>
                :
                <div>
                    
                    <h5><Button onClick={handleExit}>Sair</Button></h5>
                </div>
            }
           

        </CardActions>

        </Card>

    
    :
            <h5>Carregando...</h5>
    }
        
        </>
    );
}

