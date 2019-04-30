import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Label, Panel, Col } from 'react-bootstrap'

const UserProfile = (props) => {

    const { profile, auth} = props;

    if (!auth.uid) return <Redirect to= '/signin' />

        return (
            <Col smOffset={2} sm={8}>
            <Panel>
            <Panel.Heading>USER PROFILE</Panel.Heading>
            <Panel.Body>
                <p><Label bsStyle="default">First Name</Label> { profile.firstName } </p>
                <p><Label bsStyle="default">Last Name</Label> { profile.lastName } </p>
                <p><Label bsStyle="default">User Email</Label> { auth.email } </p>
                <p><Label bsStyle="default">User Type</Label> { profile.type } </p>
            </Panel.Body>
            </Panel>
            </Col>
            )    
    }

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const users = state.firebase.auth
    const user = users ? users[id] : null
    return {
        user: user,
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect ([
        { collection: 'users' }
    ])
)(UserProfile)