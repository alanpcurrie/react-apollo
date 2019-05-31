import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../Header/Header'
import Login from '../Login/Login'
import CreateLink from '../CreateLink/CreateLink'
import LinkList from '../LinkList/LinkList'

class App extends Component {
  render() {
    return (
      <>
          <Header />
        <StyledApp>
          <Switch>
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
         </Switch>
      </StyledApp>
      </>
    )
  }
}

const StyledApp = styled.div`
  background: seashell;
  height: 100%;
`

export default App;
