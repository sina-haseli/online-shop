import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../Redux/Actions';


class Register extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName:'',
            phone:'',
            nationalCode:'',
            email: '',
            password: '',
            errors: {}
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone:this.state.phone,
            nationalCode:this.state.nationalCode,
            email: this.state.email,
            password: this.state.password,
        };
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return (
            < div className="container" style={{ marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Registration</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="firstName"
                            className="form-control"
                            name="firstName"
                            onChange={ this.handleInputChange }
                            defaultValue={this.state.firstName}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="lastName"
                            className="form-control"
                            name="lastName"
                            onChange={this.handleInputChange}
                            defaultValue={this.state.lastName}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="09--_-------"
                            className="form-control"
                            name="phone"
                            onChange={this.handleInputChange}
                            defaultValue={this.state.phone}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="1234567890"
                            className="form-control"
                            name="nationalCode"
                            onChange={this.handleInputChange}
                            defaultValue={this.state.nationalCode}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            name="email"
                            onChange={ this.handleInputChange }
                            defaultValue={ this.state.email }
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            name="password"
                            onChange={ this.handleInputChange }
                            defaultValue={ this.state.password }
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register User
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    firstName: PropTypes.any.isRequired,
    lastName:PropTypes.any.isRequired,
    email:PropTypes.any.isRequired,
    phone:PropTypes.any.isRequired,
    nationalCode:PropTypes.any.isRequired,
    password:PropTypes.any.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))