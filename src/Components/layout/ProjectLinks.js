import React from 'react'
import { NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProjectLinks = (props) => {

    if (props.profile.firstName)
    {
        return (
            <NavItem componentClass={Link} href="/" to="/projects">Project List</NavItem>
        )} else return null
    }

export default ProjectLinks