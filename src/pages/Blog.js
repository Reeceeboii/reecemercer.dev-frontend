import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import HeaderGeneric from '../components/HeaderGeneric'

import Layout from '../components/layout'

const Blog = (props) => {
  const posts = props.data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Helmet title="Blog"/>
      <HeaderGeneric headerText="Reece's Rambles" paragraphText="Slightly interesting content from someone who spends too long sat at his computer"/>
      <div id="main">
        <section className="main special">
          <header className="major">
            <h2>Posts</h2>
          </header>

          <ul className="features">
            {
              posts.map(post => (
                <li>
                  <h3><Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link></h3>
                    <h4>{post.node.frontmatter.date}</h4>
                    <p>{post.node.excerpt}</p>

                </li>
              ))
            }
          </ul>
          <Link to="/" className="button">Return home</Link>
        </section>
      </div>
    </Layout>
  )
}

export default Blog;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2000
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            path
          }
        }
      }
    }
  }
`;