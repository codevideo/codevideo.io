import React from 'react'
import Layout from '../components/layout/Layout'
import Multilingual from '../components/pages/multilingual/Multilingual'
import SEO from '../components/SEO'

export const Head = () => {
    return <SEO title="Multilingual Functionality - CodeVideo" description="Experience CodeVideo's multilingual video creation capabilities. Same Python lesson in English, German, Mandarin, Portuguese, and Spanish." />
}

export default function MultilingualPage() {
    return (
        <Layout>
            <Multilingual />
        </Layout>
    )
}
