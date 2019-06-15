import React from 'react'
import { graphql } from 'gatsby'

const IndexPage = ({ data: { airtable } }) => (
  <ul>
    {airtable.nodes.map(node => (
      <li key={node.id}>
        <a href={node.data.url} title={node.data.title}>{node.data.title}</a>
      </li>
    ))}
  </ul>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    airtable: allAirtable {
      nodes {
        id
        data {
          title: Title
          url: URL
        }
      }
    }
  }
`