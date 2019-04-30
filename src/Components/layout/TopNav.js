import React from 'react'
import { NavLink } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import UserLinks from './UserLinks'
import ProjectLinks from './ProjectLinks'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, Label}  from 'react-bootstrap'

const TopNav = (props) => {
    
    const { auth, profile } = props
    const signedInLinks = auth.uid ? <SignedInLinks profile={profile} profileID={auth.uid}/> : null
    let label = auth.uid ?<Label bsStyle="info">{profile.type}</Label>: null
    const userLink = <UserLinks profile={profile} profileID={auth.uid}/> 
    const projectLink = <ProjectLinks profile={profile} profileID={auth.uid}/> 


    return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <NavLink to="/">HOME</NavLink>
                    </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>{ projectLink }</Nav>
                    <Nav>{ userLink }</Nav>
                    <Nav pullRight>
                    { signedInLinks }
                    <NavItem disabled>{ label }</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
         )
    }

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(TopNav)

