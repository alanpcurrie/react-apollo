import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../../constants'
import styled from 'styled-components'
import {AccountCircle} from 'styled-icons/material'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <StyledHeader>
          <StyledLogo >Postify </StyledLogo>
          <Link to="/" className="ml1 no-underline black">
            new
          </Link>
          {authToken && (
              <Link to="/create" className="ml1 no-underline black">
                submit
              </Link>
          )}
          {authToken ? (
            <div onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.push(`/`)
              }}
            >
              <StyledLogout> <AccountCircle size="48"  />logout</StyledLogout>
            </div>
          ) : (
            <Link to="/login" className="ml1 no-underline black">
               <AccountCircle size="48"  />login
            </Link>
          )}
      </StyledHeader>
    )
  }
}

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background: #10ADED;
      a {
       color: red;
     }
`
const StyledLogo = styled.span`
    font-size: 1.2rem;
`
const StyledLogout = styled.span`
    font-size: 1.2rem;
`
export default withRouter(Header)