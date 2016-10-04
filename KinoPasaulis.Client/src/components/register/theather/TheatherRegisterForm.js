import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { registerTheather } from '../../../actions/registerActions';

class TheatherRegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {fields: {username, password, repeat, email, title, city, address, phone} } = this.props;
    //
    // this.props.dispatch(register(username.value, password.value, confirm.value));
  }

  render() {
    const {fields: {username, password, repeat, email, title, city, address, phone} } = this.props;

    return (
      <div>
        <div className="container col-md-4 col-md-offset-4">
          <h1> Kino teatro registracija </h1>
          <hr />
          <div className="row">
            <div className="form-group">
              <label htmlFor="username">Vartotojo vardas</label>
              <input type="text" placeholder="Vartotojo vardas" className="form-control" id="username" name="Username" { ...username } />
            </div>
            <div className="form-group">
              <label for="email">Elektroninis paštas</label>
              <input type="email" placeholder="El. paštas" className="form-control" id="email" name="Email" { ...email } />
            </div>
            <div className="form-group">
              <label for="username">Slaptažodis</label>
              <input type="password" placeholder="Slaptažodis" className="form-control" name="Password" { ...password } />
            </div>
            <div className="form-group">
              <label for="username">Pakartoti slaptažodi</label>
              <input type="password" placeholder="Pakartoti slaptažodi" className="form-control" name="Repeat" { ...repeat } />
            </div>
            <div className="form-group">
              <label for="username">Pavadinimas</label>
              <input type="text" placeholder="Pavadinimas" className="form-control" name="Title" { ...title } />
            </div>
            <div className="form-group">
              <select name="City" className="form-control" { ...city }>
                <option hidden >Miestas</option>
                <option value="Vilnius">Vilnius</option>
                <option value="Kaunas">Kaunas</option>
                <option value="Šiauliai">Šiauliai</option>
                <option value="Panevežys">Panevežys</option>
                <option value="Klaipeda">Klaipeda</option>
              </select>
            </div>
            <div className="form-group">
              <label for="username">Adresas</label>
              <input type="text" placeholder="Adresas" className="form-control" name="Address" { ...address } />
            </div>
            <div className="form-group">
              <label for="username">Telefonas</label>
              <input type="text" placeholder="Telefonas" className="form-control" name="Phone" { ...phone } />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" onClick={this.handleSubmit}>Registruotis</button>
          </div>
        </div>
      </div>
    );
  }
}

TheatherRegisterForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'registerTheather',                   // a unique name for this form
  fields: ['username', 'password','repeat', 'title', 'city', 'address', 'phone'] // all the fields in your form
};

export default reduxForm(config)(TheatherRegisterForm);