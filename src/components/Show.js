import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      produto: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('produtos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          produto: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("Sem produto!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('produtos').doc(id).delete().then(() => {
     this.props.history.push("/")
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  submit = () => {
    confirmAlert({
      title: 'Atenção!',
      message: 'Deseja remover este regitro?',
      buttons: [
        {
          label: 'SIM',
          onClick: () => this.delete(this.state.key)
        },
        {
          label: 'NÃO',
          onClick: () => this.handleClose()
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: false
    });
  };

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              MY MARKET 
            </h3>
          </div>
          <div class="panel-heading">
            <h4><Link to="/" class="btn btn-primary">Página Inicial</Link></h4>
      			<h3 class="panel-title">{this.state.produto.nome}</h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Descrição:</dt>
              <dd>{this.state.produto.descricao}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
            <button onClick={this.submit} class="btn btn-danger">Excluir</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;