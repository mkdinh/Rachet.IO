import React, { Component } from 'react'
import { Menu, Popup, Responsive, Checkbox } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoginForm from "../Form/Login";
import actions from "../../utils/actions";

const style = {
  wrapper: { margin: "0 0 1rem 0" },
  bold: { fontWeight: "bold" }
}

class Navbar extends Component {
  state = { activeItem: 'Chat Box' }

  handleItemClick = (e, { name }) => {
    if(!name){
      name = e.currentTarget.getAttribute("data-name");
      this.setState({ activeItem: name });
    }else{
      this.setState({ activeItem: name });
    };
    this.props.history.replace("/" + name);
  }

  handleLogout = () => {
    this.props.dispatch(actions.User.logout())
    .then(msg => null)
    .catch(err => console.log(err));
  }

  toggleView = () => this.props.dispatch(actions.User.toggleView());

  render() {
    const { activeItem } = this.state;
    const name = this.props.user ? this.props.user.name : null;
    const privilege = this.props.user ? this.props.user.privilege : null;

    return (
      <div>
        <Responsive style={style.wrapper} maxWidth={767}>
          <Menu pointing secondary>
            <Menu.Item data-name="Chat Box" icon="chat" link active={activeItem === 'Chat Box'} onClick={this.handleItemClick} />
            <Menu.Item data-name="Poll" icon="bar graph" link active={activeItem === "Poll"} onClick={this.handleItemClick} />
            {/* <Menu.Item data-name="Socket Canvas" icon="game" link active={activeItem === "Socket Canvas"} onClick={this.handleItemClick} /> */}
            <Menu.Item data-name="PowerPoint" icon="file powerpoint outline" link active={activeItem === "PowerPoint"} onClick={this.handleItemClick} />

              {privilege === 3 ? 
                <Menu.Menu position='right'>
                  <Menu.Item style={style.bold} name={`Hello ${name}`} link={false} />
                  <Menu.Item name='Logout' active={activeItem === "Logout"} onClick={this.handleLogout} />
                </Menu.Menu>
              : 
              <Menu.Menu position='right'>
                  <Checkbox onChange={this.toggleView} toggle/>
                  <Popup
                  trigger={<Menu.Item icon="user"/>}
                  content={<LoginForm/>}
                  on="click"
                  position="bottom left"/>
                </Menu.Menu>}
          </Menu>
        </Responsive>

        <Responsive style={style.wrapper} minWidth={768}>
          <Menu pointing secondary>
            <Menu.Item name="Chat Box" link active={activeItem === 'Chat Box'} onClick={this.handleItemClick} />
            <Menu.Item name="Poll" link active={activeItem === "Poll"} onClick={this.handleItemClick} />
            {/* <Menu.Item name="Socket Canvas" link active={activeItem === "Socket Canvas"} onClick={this.handleItemClick} /> */}
            <Menu.Item name="PowerPoint" link active={activeItem === "PowerPoint"} onClick={this.handleItemClick} />

              {privilege === 3 ? 
                <Menu.Menu position='right'>
                  <Menu.Item style={{ padding: "0.6rem 1rem" }}>
                    <Checkbox onChange={this.toggleView} toggle/>
                    <span style={{fontWeight: "bold", margin: "0 1rem"}}>Admin View</span>
                  </Menu.Item>
                  <Menu.Item style={style.bold} name={`Hello ${name}`} link={false} />
                  <Menu.Item name='Logout' active={activeItem === "Logout"} onClick={this.handleLogout} />
                </Menu.Menu>
              : 
                <Menu.Menu position='right'>
                  <Popup
                  trigger={<Menu.Item name="Login"/>}
                  content={<LoginForm/>}
                  on="click"
                  position="bottom left"/>
                </Menu.Menu>}
          </Menu>
        </Responsive>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    user: state.user
  })
}

Navbar = withRouter(Navbar);
Navbar = connect(mapStateToProps)(Navbar);

export default Navbar;