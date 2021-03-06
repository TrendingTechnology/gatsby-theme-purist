import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';
import Img, { GatsbyImageProps } from 'gatsby-image';
import React from 'react';
import Layout from '../components/Layout';

function HomePage({ data }) {
  const { heading, subHeading } = data.site.siteMetadata.hero;
  const articles = data.latestArticles.edges;

  return (
    <Layout>
      <Banner>
        <Heading>{heading}</Heading>
        {subHeading && <SubHeading>{subHeading}</SubHeading>}
      </Banner>
      {!!articles.length && (
        <>
          <Label>Latest Articles</Label>
          <ArticlesWrapper>
            {articles.map(({ node }) => (
              <Wrapper key={node.fields.slug} to={node.fields.slug}>
                <Image
                  fluid={node.frontmatter.featuredImage?.childImageSharp.fluid}
                />
                <Title>{node.frontmatter.title}</Title>
                <Excerpt>{node.excerpt}</Excerpt>
                <Subtitle>
                  {node.frontmatter.date} &middot; {node.timeToRead} min read
                </Subtitle>
              </Wrapper>
            ))}
          </ArticlesWrapper>
          <ArticlesLink to="/articles">All Articles →</ArticlesLink>
        </>
      )}
    </Layout>
  );
}

export const pageQuery = graphql`
  query Index {
    site {
      siteMetadata {
        hero {
          heading
          subHeading
        }
      }
    }
    latestArticles: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/content/" }
        fields: { draft: { ne: true } }
      }
      limit: 2
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          timeToRead
          excerpt
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY")
            featuredImage {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Excerpt = styled.div`
  color: var(--color-muted);
  margin-top: 1.25rem;
  line-height: 1.25rem;
`;

const Image = styled(Img)<GatsbyImageProps>`
  object-fit: cover;
  height: 16.5rem;
  border-radius: 0.375rem;
`;

const Title = styled.h3`
  display: inline-block;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-top: 1rem;
  font-family: var(--font-serif);
`;

const Subtitle = styled.div`
  color: var(--color-muted);
  margin-top: 1.25rem;
  font-size: 1rem;
  opacity: 0.5;
`;

const Wrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: var(--color-accent);
    & .gatsby-image-wrapper {
      transition: all 0.2s linear;
      transform: translateY(-1px);
      box-shadow: 0 8px 25px var(--color-hover);
    }
  }
`;

const Banner = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10rem 0;
`;

const Heading = styled.h1`
  font-family: var(--font-serif);
  font-size: 3rem;
  line-height: 2.5rem;

  @media (min-width: 768px) {
    font-size: 3.75rem;
    line-height: 1;
  }
`;

const SubHeading = styled.h2`
  font-size: 1.5rem;
  line-height: 2rem;
`;

const Label = styled.h3`
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-bottom: 1.5rem;
`;

const ArticlesWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ArticlesLink = styled(Link)`
  margin-top: 4rem;
  margin-bottom: 6rem;
  display: inline-block;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: inherit;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: var(--color-accent);
  }
`;

export default HomePage;
