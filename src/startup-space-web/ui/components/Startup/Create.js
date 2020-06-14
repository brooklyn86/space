import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebaseConfig from '../../../services/firebaseConfig';
import {Link as RouterLink, useHistory} from 'react-router-dom';

export default function StartupCreateDialog() {
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const db = firebaseConfig.firestore();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    if(name == ""){
      alert('Campo Nome é obrigatorio')


    }else if(description == ""){
      alert('Campo Detalhes é obrigatorio')

    }else{
      setOpen(false);
      var uid = localStorage.getItem('uid');
      var statup = localStorage.getItem('startup')
      if(statup == '0'){
        db.collection("startups").add({
          name: name,
          description: description,
          user_id: uid,
      }).then(function(docRef) {
        alert('Startup Criada com sucesso!')
        var statup = localStorage.setItem('startup',1)
        history.push('/')
        })
        .catch(function(error) {
          alert('Falha ao cadastrar')
  
        })
      }else{
        alert('Não é permitido ter mais de uma startup!')
  
      }
    }
    
    
  }
  return (
    <div>
      {( localStorage.getItem('startup') == 1 
      ?
      <Button variant="outlined" color="primary" disabled>
        Criar Startup
      </Button>
      :
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Criar Startup
      </Button>
      )}
     
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Criar Startup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Crie sua startup em instantes, e ganhe o mundo a sua volta.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        <TextField
            margin="dense"
            id="name"
            required
            label="Detalhes"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={ handleCreate} color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}