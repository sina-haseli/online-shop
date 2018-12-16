import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
//import Auth from '../../Auth';

import {login, setCurrentUser} from '../../Redux/Actions';
import classnames from 'classnames';

import './Login.css';




class ConnectedLogin extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
            redirectToReferrer: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.login(user);
    }


    componentWillReceiveProps(nextProps) {

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if (this.state.redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        return(
            <div className="container" style={{ marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Login</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={ this.handleInputChange }
                            defaultValue={ this.state.email }
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={ this.handleInputChange }
                            defaultValue={ this.state.password }
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" onClick={()=> {
                            //this.props.dispatch(setCurrentUser({email: user.email}));
                            this.setState(()=>({
                                redirectToReferrer: true
                            }))
                        }}>
                            Login User
                        </button>
                    </div>
                    <div className="form-group">
                        <a className="btn btn-primary" href="../Register/Register.js" role="button">Register</a>
                    </div>
                </form>
            </div>
        )
    }


}

ConnectedLogin.propTypes = {
    errors: PropTypes.object,
    email:PropTypes.string,
    password:PropTypes.any
};

const mapStateToProps = (state) => ({
    errors: state.errors,
});
const Login = withRouter(connect(mapStateToProps, {login})(ConnectedLogin));

export default Login;