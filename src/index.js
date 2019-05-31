import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App/App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './styles/index.css'
import { AUTH_TOKEN } from './constants'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import {
  space,
  color,
  fontSize,
  width,
  fontWeight,
  lineHeight,
} from 'styled-system'


const Style = createGlobalStyle`
  * { box-sizing: border-box; }
  body{ margin:0; }
`

const theme = {
    fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
    space: [
      // margin and padding
      0,
      4,
      8,
      16,
      32,
      64,
      128,
      256,
    ],
    colors: {
      blue: '#07c',
      red: '#e10',
    },
  }

  const StyledRoot = styled.div`
  font-family: system-ui, sans-serif;
  line-height: 1.5;
`

const Box = styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`
Box.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
}

const Text = styled.div`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
`
Text.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...lineHeight.propTypes,
  ...color.propTypes,
}

/**
  * @descHere you create the httpLink that will connect your ApolloClient instance with the GraphQL API,
  * your GraphQL server will be running on http://localhost:4000.
*/

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
  })


  /**
  * @descHere Now you instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache.
  */

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })


  /**
  * @descHere Now you instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache.
  */

 const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


  /**
  * @descHere Finally you render the root component of your React app.
  * The App is wrapped with the higher-order component ApolloProvider that gets passed the client as a prop.
  */

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <StyledRoot>
                    <Style />
                    <App />
                </StyledRoot>
            </ThemeProvider>
        </ApolloProvider>
    </BrowserRouter>,
     document.getElementById('root')
)
serviceWorker.unregister();
