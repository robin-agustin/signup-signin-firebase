import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { ListGroupItem, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { deleteProject } from '../../store/actions/projectActions'

class ProjectSummary extends Component {
    constructor() {
        super();
 
        this.delete = this.delete.bind(this)
      }
    
    delete =(e) => {
        e.preventDefault()
        this.props.deleteProject(this.props.project.id)
    }

    render() {

        const { project, profile } = this.props
        let button = null
        if (profile.type === 'default') button = <Button bsSize="xs" bsStyle="danger" disabled>delete</Button>
        else button = <Button bsSize="xs" bsStyle="danger" onClick={this.delete} >delete</Button>
          
        if(profile.type){
            return (
   
                <ListGroupItem>
                <p><strong> {project.title}</strong></p>
                <p><small>by {project.firstName} {project.lastName}</small></p>
                    <LinkContainer to={'/project/' + project.id} >
                        <Button bsSize="xs" bsStyle="primary">update</Button>
                    </LinkContainer>
                    { button }
                </ListGroupItem> 
                
            )
        } else return null
    }
}   

const mapDispatchToProps = (dispatch, ownProps) => {

    const { project } = ownProps

    return {
        deleteProject: () => dispatch(deleteProject(project.id))
    }
}

export default connect(null, mapDispatchToProps)(ProjectSummary)