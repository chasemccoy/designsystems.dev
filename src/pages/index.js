import React from 'react'
import { graphql } from 'gatsby'

const IndexPage = ({ data: { airtable } }) => (
  <React.Fragment>
    {airtable.groups.map(group => (
      <React.Fragment key={group.type}>
        <h2>{group.type}</h2>

        <ul>
          {group.nodes.map(node => (
            <li key={node.id}>
              <a href={node.data.url} title={node.data.title}>{node.data.title}</a>
            </li>
          ))}
        </ul>
      </React.Fragment>
    ))}
  </React.Fragment>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    airtable: allAirtable(sort: {fields: data___Title, order: ASC}) {
      groups: group(field: data___Type) {
        type: fieldValue
        nodes {
          id
          data {
            title: Title
            url: URL
          }
        }
      }
    }
  }
`