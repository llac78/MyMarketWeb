import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  state = {
    nome: "",
    descricao: ""
  };

  constructor() {
    super();
    this.ref = firebase.firestore().collection('produtos');
    this.state = {
		nome: '',
		descricao: ''
    };
  }

  isFormValid(){
    return this.state.nome && this.state.descricao;
  }

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";

    if (this.isFormValid()) {
      const { nome, descricao } = this.state;
      this.ref.add({
        nome,
        descricao
      }).then((docRef) => {
        this.setState({
          nome: '',
          descricao: ''
        });
        this.props.history.push("/")
      });
    }
  };

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

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
                Adicionar Produto
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
                <textArea id="id_descricao" class="form-control" name="descricao" onChange={this.onChange} placeholder="Descrição" cols="80" rows="3" required />
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

export default Create;