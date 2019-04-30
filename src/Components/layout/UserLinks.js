import React from 'react'
import { NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserLinks = (props) => {

    if (props.profile.firstName)
    {
        return (
            <NavItem componentClass={Link} href="/" to="/users">User List</NavItem>
        )} else return null
    }

export default UserLinks