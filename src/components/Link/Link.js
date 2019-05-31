import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../../constants'
import { timeDifferenceForDate } from '../../utils'
import styled from 'styled-components'

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <StyledLink>
        <div>
          <span>{this.props.index + 1}.</span>
          {authToken && (
          <Mutation mutation={VOTE_MUTATION} variables={{ linkId: this.props.link.id }}>
          {voteMutation => (
            <div className="ml1 gray f11" onClick={voteMutation}>
              ▲
            </div>
          )}
        </Mutation>
          )}
        </div>
        <div>
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div>
            {this.props.link.votes.length} votes | by{' '}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </StyledLink>
    )
  }
}

const StyledLink = styled.div`
    font-size: 1.2rem;
    background: white;
`

export default Link