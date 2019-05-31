import React, { Component } from 'react'
import styled from 'styled-components'
import Link from '../Link/Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

  /**
  * @descHere write the query as a JavaScript constant using the gql parser function
  */

 const FEED_QUERY = gql`
 {
   feed {
     links {
       id
       createdAt
       url
       description
       postedBy {
         id
         name
       }
       votes {
         id
         user {
           id
         }
       }
     }
   }
 }
`

class LinkList extends Component {
    render() {
      return (
        <Query query={FEED_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            const linksToRender = data.feed.links

            return (
             <StyledLinkedList>
                {linksToRender.map((link, index) => (
                  <Link key={link.id} link={link} index={index} />
                ))}
            </StyledLinkedList>
            )
          }}
        </Query>
      )
    }
  }

  const StyledLinkedList = styled.div`
    background: papayawhip;
    color: rosybrown;
`

export default LinkList