import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect}  from 'react-redux-firebase'
import { compose } from 'redux'
import { Panel, Col, Table, Form, Label, Tooltip, OverlayTrigger } from 'react-bootstrap'
import UserSummary from './UserSummary'
import { Redirect } from 'react-router-dom'

const UserList = (props) => {
        const { users, auth } = props
        if (!auth.uid) return <Redirect to= '/signin' />

        const tooltip = (
            <Tooltip id="tooltip">
              Only <strong>admin</strong> can delete projects, update users.
            </Tooltip>
          )
    
        if (users) {
            return (
                <Col smOffset={2} sm={8}>
                <Panel>
                <Panel.Heading>USER LIST</Panel.Heading>
                <Panel.Body>
                    <Form>
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>User Type</th>
                            <th>
                            <OverlayTrigger placement="right" overlay={tooltip}>
                                <Label bsStyle="danger">info</Label>
                            </OverlayTrigger>
                            </th>
                            </tr>
                        </thead>
                            { users && users.map(user => {
                                return (
                                    <UserSummary
                                        user={user} 
                                        key={user.id} />
                                    )
                                })}   
                    </Table>
                    </Form>
                </Panel.Body>
                </Panel>
                </Col>
            )} else return <Col smOffset={5} sm={8}><p>Loading...</p></Col>
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(UserList)
