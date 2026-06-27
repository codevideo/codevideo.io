import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import ActionsIndex from '../templates/actions-index'
import SEO from '../components/SEO'

const ActionsPage = ({ data }: any) => {
  return (
    <Layout>
      <SEO title="Actions Reference — CodeVideo" description="Browse all CodeVideo actions: editor commands, terminal operations, file management, mouse interactions, and slide controls." pathname="/actions" />
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
