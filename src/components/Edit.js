import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
	    nome: '',
      descricao: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('produtos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const produto = doc.data();
        this.setState({
          key: doc.id,
		      nome: produto.nome,
          descricao: produto.descricao
        });
      } 
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({produto:state});
  }

  isFormValid(){
    return this.state.nome && this.state.descricao;
  }

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";

    if (this.isFormValid()) {
      const { nome, descricao } = this.state;

      const updateRef = firebase.firestore().collection('produtos').doc(this.state.key);
      updateRef.set({
        nome,
        descricao
      }).then((docRef) => {
        this.setState({
          key: '',
          nome: '',
          descricao: ''
        });
        this.props.history.push("/show/"+this.props.match.params.id)
      });
    }
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
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Página Inicial</Link></h4>
            <div class="panel-heading">
              <h3 class="panel-title">
                Editar Produto
              </h3>
            </div>
            <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
			        <div class="form-group">
                <label for="nome">Nome:</label>
                <input id="id_nome" type="text" class="form-control" name="nome" value={this.state.nome} onChange={this.onChange} placeholder="Nome" required />
                <div className="invalid-feedback">
                  Este campo é obrigatório
                </div>
              </div>
              <div class="form-group">
                <label for="descricao">Descrição:</label>
                <textArea id="id_descricao" class="form-control" name="descricao" onChange={this.onChange} placeholder="Descrição" cols="80" rows="3" required>{this.state.descricao}</textArea>
                <div className="invalid-feedback">
                  Este campo é obrigatório
                </div>
              </div>
              <button type="submit" class="btn btn-success">Salvar</button>
             
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;