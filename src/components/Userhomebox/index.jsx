import * as React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './style.scss';

class Userhomebox extends React.Component {
    signOut() {
        var res = document.cookie;
        var multiple = res.split(";");
        for(var i = 0; i < multiple.length; i++) {
            var key = multiple[i].split("=");
            document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
        };
    }
	render(){
        return (
            <div  className="home-user-div">
            <DropdownButton size="lg" className="home-user-button" id="dropdown-basic-button" title={this.props.displayName || ""}>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/">Profile Setting</Dropdown.Item>
                <Dropdown.Item href="/">Account and Billing</Dropdown.Item>
                <Dropdown.Item href="/">Idear Published</Dropdown.Item>
                <Dropdown.Item href="/">Follower</Dropdown.Item>
                <Dropdown.Item href="/">Following</Dropdown.Item>
                <Dropdown.Item href="/" onClick={this.signOut}>Sign out</Dropdown.Item>
            </DropdownButton>
            </div>
        );
    }
}
export default Userhomebox;