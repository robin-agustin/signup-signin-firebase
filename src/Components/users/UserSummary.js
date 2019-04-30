import React, { Component } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { updateUser } from '../../store/actions/authActions'

class UserSummary extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            ...this.state,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            type: props.user.type
          };
      }

    handleChange = (e) => {
        this.setState ({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit =(e) => {
        e.preventDefault()
        this.props.updateUser(this.state, this.props.user.id)
    }

    render () {
        const { user, profile } = this.props

        let button = null
        if (profile.type === 'admin') button = <Button bsStyle="primary" onClick={this.handleSubmit}type="submit">Update</Button>
        else button = <Button disabled bsStyle="primary" >Update</Button>
        
        
            return (
                <tbody>
                <tr>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                      <FormControl onChange={this.handleChange} id="type" componentClass="select" defaultValue={user.type}  >
                        <option>admin</option>
                        <option>default</option>
                      </FormControl></td>
                  <td>{ button }</td>
                </tr>
                </tbody>
            )
    }
}

    const mapStateToProps = (state) => {

        return {
            profile: state.firebase.profile,
            auth: state.firebase.auth
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            updateUser: (user, key) => dispatch(updateUser(user, key))
        }
    }
    
    export default compose(
        connect(mapStateToProps, mapDispatchToProps),
        firestoreConnect ([
            { collection: 'users' }
        ])
    )(UserSummary)