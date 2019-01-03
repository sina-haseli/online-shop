import React, { Component } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "./Header.css";
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {showCartDlg, toggleMenu, setLoggedInUser} from "../../Redux/Actions"
import 'react-dropdown/style.css'
import cartImage from "../../Images/DeomiLogo.png"
import Person from '@material-ui/icons/PersonOutline';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import setAuthToke from '../../setAuthToken';
import HamburgerButton from "../MenuIcon/MenuIcon";


const mapStateToProps = state => {
   return { nrOfItemsInCard: 0,  loggedInUser: state.loggedInUser, };
};


class ConnectedHeader extends Component {
    state = {
        searchTerm: "",
        anchorEl: null,
    };

    render() {

        let { anchorEl } = this.state;

        return (
            <div className="header">
                <div className="left-part">
                    <div style={{ width: 100, marginTop: 20, marginLeft: 10 }}>
                        <IconButton onClick={() => {
                            this.props.dispatch(toggleMenu())
                        }}>
                            <HamburgerButton size="medium" />
                        </IconButton></div>

                    <img src={cartImage} alt={"Logo"} style={{ marginTop: 10, marginLeft: 10 }} width="64" height="64" />
                    <TextField
                        label="Search"
                        value={this.state.searchTerm}
                        onChange={(e) => {
                            this.setState({ searchTerm: e.target.value })
                        }}
                        style={{ marginLeft: 40, width: 250, marginTop: 10 }}
                    />



                </div>
                <div className="right-part">

                    <div style={{ width: 50, marginTop: 20, marginRight: 5 }}>
                        <IconButton aria-label="Cart" onClick={() => {
                            this.props.dispatch(showCartDlg(true))
                        }}>
                            <Badge badgeContent={this.props.nrOfItemsInCard || 0} color="primary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </div>
                    {!this.props.loggedInUser ?
                        (<Button
                            variant="outlined"
                            color="primary"
                            style={{ height: 10, marginTop: 25, marginRight:20 }}
                            onClick={() => {
                                this.props.history.push('/login');
                            }}>
                            Log in
                        </Button>) :
                        (<Avatar
                            onClick={(event) => {
                                this.setState({ anchorEl: event.currentTarget });
                            }}
                            style={{ marginTop: 22, marginRight: 20, backgroundColor: "#3f51b5" }} >
                            <Person />
                        </Avatar>)
                    }
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => { this.setState({ anchorEl: null }); }}
                    >
                        <MenuItem onClick={() => {
                            this.setState({ anchorEl: null })
                            this.props.history.push('/order');
                        }}>
                            Pending Order
                        </MenuItem>
                        <MenuItem onClick={() => {
                            if (setAuthToke()!==true) {
                                this.props.dispatch(setLoggedInUser(null));
                                this.props.history.push('/');
                            }
                            this.setState({ anchorEl: null });
                        }}>Logout</MenuItem>
                    </Menu>
                </div>
            </div >
        );
    }
}


const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;
