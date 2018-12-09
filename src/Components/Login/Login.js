import React , {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Auth from '../../Auth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {setLoggedInUser} from '../../Redux/Actions';

import './Login.css';



class ConnectedLogin extends React.Component{
    state = {
        userName:"",
        pass:"",
        redirectToReferrer: false
    };
    userName = event => {
        this.setState({
            [event.target.userName]: event.target.value
        });
    };
    userPass= event => {
        this.setState({
            [event.target.pass]: event.target.value
        });
    };
    render(){
        const {from} = this.props.location.state|| {from: {pathname:'/'}};

        /*
        age user auth shode bod , befrestesh be hamon ja ke az aval omade bod
         */
        if (this.state.redirectToReferrer===true){
            return<Redirect to={from} />
        }

        return(
          <div className="Login-container">
              <div style={{marginBottom:50, fontSize:26, textAlign:"center", color:"gray"}}>Log in</div>
              <TextField
                    defaultValue={this.state.userName}
                    placeholder="User name"
                    onChange={this.userName}
              />

              <TextField
                    defaultValue={this.state.pass}
                    type="password"
                    placeholder="Password"
                    onChange={this.userPass}
              />
              <Button
                    style={{marginTop:10}}
                    variant="outlined"
                    color="primary"
                    onClick={()=> {

                        Auth.authenticate(this.state.userName, this.state.pass, (user)=>{

                            if (!user){
                                this.setState({wrongCred: true});
                                return;
                            }

                            this.props.dispatch(setLoggedInUser({name: user.name}));
                            this.setState(() => ({
                                redirectToReferrer: true
                            }))

                        })

                    }}>Log in </Button>

              {this.state.wrongCred && <div style={{color:"red"}}>wrong username and/or pass</div>}

          </div>

        );

    }
}

const Login = withRouter(connect()(ConnectedLogin));

export default Login;