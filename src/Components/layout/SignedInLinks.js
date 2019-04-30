import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { MenuItem, NavDropdown } from 'react-bootstrap'

const SignedInLinks = (props) => {

    if (props.profile.firstName)
    {
        return (
            <NavDropdown eventKey="4" title={ props.profile.firstName + ' ' + props.profile.lastName}  id="basic-nav-dropdown">
                <LinkContainer to={ '/profile/id?' + props.profileID}>
                    <MenuItem>View Profile</MenuItem>
                </LinkContainer>
                <LinkContainer to="/create">
                    <MenuItem>Add Project</MenuItem>
                </LinkContainer>
                    <MenuItem divider />
                <MenuItem onClick={ props.signOut }>Log Out</MenuItem>
            </NavDropdown>
            )
        } else return null
    }

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)