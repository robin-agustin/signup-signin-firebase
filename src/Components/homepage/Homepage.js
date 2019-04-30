import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Homepage extends Component {
    render () {
        
        const { auth } = this.props
        if (!auth.uid) return <Redirect to= '/signin' />

        return <h5>HOME PAGE</h5>
        }
    }

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Homepage)