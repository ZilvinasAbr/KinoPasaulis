import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../../common/LoggedOfNavigationBar';

const TheaterRegisterPage = (props) => {
    return (
        <div>
            <LoggedOfNavigationBar changePageToLanding={props.changePageToLanding} changePageToLogin={props.changePageToLogin} changePageToRegister={props.changePageToRegister} />
            <div className="container col-md-4 col-md-offset-4">
                <h1> Kino teatro registracija </h1>
                <hr />
                <div className="row">
                    <div className="form-group">
                        <label for="username">Vartotojo vardas</label>
                        <input type="text" placeholder="Vartotojo vardas" className="form-control" id="username" name="Username" />
                    </div>
                    <div className="form-group">
                        <label for="email">Elektroninis paštas</label>
                        <input type="email" placeholder="El. paštas" className="form-control" id="email" name="Email" />
                    </div>
                    <div className="form-group">
                        <label for="username">Slaptažodis</label>
                        <input type="password" placeholder="Slaptažodis" className="form-control" name="Password" />
                    </div>
                    <div className="form-group">
                        <label for="username">Pakartoti slaptažodi</label>
                        <input type="password" placeholder="Pakartoti slaptažodi" className="form-control" name="Repeat" />
                    </div>
                    <div className="form-group">
                        <label for="username">Pavadinimas</label>
                        <input type="text" placeholder="Pavadinimas" className="form-control" name="Title" />
                    </div>
                    <div className="form-group">
                        <select name="City" className="form-control">
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
                        <input type="text" placeholder="Adresas" className="form-control" name="Address" />
                    </div>
                    <div className="form-group">
                        <label for="username">Telefonas</label>
                        <input type="text" placeholder="Telefonas" className="form-control" name="Phone" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg">Registruotis</button>
                </div>
            </div>
        </div>
    );
};

TheaterRegisterPage.propTypes = {

};

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        changePageToLanding: () => {
            dispatch(push('/'));
        },
        changePageToLogin: () => {
            dispatch(push('login'));
        },
        changePageToRegister: () => {
            dispatch(push('register'));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheaterRegisterPage);
