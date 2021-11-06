import { request, gql } from 'graphql-request';

const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query GetPosts {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;
    const result = await request(graphqlEndpoint, query);
    return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
    const query = gql`
            query getPostDetails() {
                posts(
                    orderBy: createdAt_ASC
                    last: 3
                    ) {
                        title
                        featuredImage {
                            url
                        }
                        createdAt
                        slug
                    }
            }
        `;

    const result = await request(graphqlEndpoint, query);
    return result.posts;
};

export const getSimilliarPosts = async (slug, category) => {
    const query = gql`
        query getSimilliarPosts($slug: String!, $categories: [String!]) {
            posts(
                where: {
                    slug_not: $slug
                    AND: { categories_some: { slug_in: $categories } }
                }
                orderBy: createdAt_DESC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const result = await request(graphqlEndpoint, query);
    return result.posts;
};
