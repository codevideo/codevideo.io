import React from "react";
import { graphql, Link } from "gatsby";
import Layout from '../components/layout/Layout'
import { Container, Flex, Heading, Text, Box, Section, Separator, Card, Badge, Code } from '@radix-ui/themes'
import SEO from '../components/SEO'
import { domainColors } from "../constants/domainColors";

export const Head = ({ data }: any) => {
  const { actionData } = data;
  return <SEO title={`${actionData.name} - CodeVideo Action`} description={actionData.description} />
}

export default function ActionTemplate({ data }: any) {
  const { actionData } = data;
  
  // Extract domain from action name (everything before the first dash)
  const domain = actionData.name.split('-')[0];

  return (
    <Layout>
      <Container size="3" py="9" mt="9">
        <Flex direction="column" align="center" justify="center">
          <Box style={{ maxWidth: '750px', width: '100%' }}>
            
            {/* Header */}
            <Flex direction="column" gap="4" mb="6">
              <Flex align="center" gap="3">
                <Badge color={domainColors[domain] || 'gray'} size="2">
                  {domain}
                </Badge>
              </Flex>
              
              <Heading size="9" color="mint">
                <Code>{actionData.name}</Code>
              </Heading>
              
              <Text size="5" color="gray">
                {actionData.description}
              </Text>
            </Flex>

            {/* Content */}
            <Section>
              <Card>
                <Flex direction="column" gap="4" p="4">
                  
                  {/* Description */}
                  <Box>
                    <Heading size="4" mb="2">Description</Heading>
                    <Text size="3">{actionData.description}</Text>
                  </Box>

                  <Separator />

                  {/* Value Description */}
                  <Box>
                    <Heading size="4" mb="2">Value</Heading>
                    <Text size="3">{actionData.valueDescription}</Text>
                  </Box>

                  <Separator />

                  {/* Usage Example */}
                  <Box>
                    <Heading size="4" mb="2">Usage Example</Heading>
                    <Code style={{ 
                      display: 'block', 
                      padding: 'var(--space-3)', 
                      backgroundColor: 'var(--gray-3)',
                      borderRadius: 'var(--radius-2)',
                      whiteSpace: 'pre-wrap'
                    }}>
{`{
  "name": "${actionData.name}",
  "value": "${actionData.valueDescription.includes('typically') ? '1' : 'your-value-here'}"
}`}
                    </Code>
                  </Box>

                  {/* Domain Info */}
                  <Separator />
                  <Box>
                    <Heading size="4" mb="2">Domain</Heading>
                    <Flex align="center" gap="2">
                      <Badge color={domainColors[domain] || 'gray'}>
                        {domain}
                      </Badge>
                      <Text size="2" color="gray">
                        Actions that control {domain === 'file' ? 'file explorer' : domain} functionality
                      </Text>
                    </Flex>
                  </Box>

                </Flex>
              </Card>
            </Section>

            {/* Navigation */}
            <Flex justify="center" mt="8">
              <Link to="/actions">
                <Text size="3">← Back to all actions</Text>
              </Link>
            </Flex>

          </Box>
        </Flex>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($actionName: String!) {
    actionData(name: { eq: $actionName }) {
      name
      description
      valueDescription
    }
  }
`;
