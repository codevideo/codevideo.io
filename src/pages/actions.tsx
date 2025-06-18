import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import ActionsIndex from '../templates/actions-index'
import SEO from '../components/SEO'

const ActionsPage = ({ data }: any) => {
  return (
    <Layout>
      <SEO title="CodeVideo: Actions Reference" />
      <ActionsIndex  />
    </Layout>
  )
}

export default ActionsPage

export const pageQuery = graphql`
  query {
    allActionData {
      nodes {
        name
        description
        valueDescription
      }
    }
  }
`
