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


export default function Startup(props) {
    const [startup, setStartup] = useState([]);
    const history = useHistory();
    const db = firebaseConfig.firestore();
    const startupId = props.match.params.id;
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
        console.log(startupId);
       var docRef = db.collection("startups").doc(startupId)

       docRef.get().then(function(doc) {
           
        setStartup(doc.data())
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
    },[startupId]);

    function handleParticipe(){
        var uid = localStorage.getItem('uid');
        var statup = localStorage.getItem('startup')
        if(statup == '0'){
          db.collection("startup_members").add({
            startup_id: startupId,
            user_id: uid,
        }).then(function(docRef) {
          alert('Sucesso ao entrar nessa Startup!')
          var statup = localStorage.setItem('startup',1)
          history.push('/dashboard')
    
          })
          .catch(function(error) {
            alert('Falha ao Entrar!')
    
          })
        }else{
          alert('Não é permitido ter mais de uma startup!')
    
        }
    }
    return (
        <>
     
        <Menu />
        <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                   {startup.name}
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={startup.name}
                subheader=""
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {startup.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {
                    localStorage.getItem('startup') == 0 ?
                    <IconButton aria-label="Fazer Parte" >
                        <Button onClick={handleParticipe}> Fazer Parte </Button>
                    </IconButton>
                    :
                    <div>
                        
                        <h5><Button disabled> Fazer Parte </Button> Você já pertence ou possui uma startup</h5>
                    </div>
                }
               

            </CardActions>

            </Card>

        </>
    );
}

