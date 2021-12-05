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

export const getSimilliarPosts = async (slug, categories) => {
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

    const result = await request(graphqlEndpoint, query, { slug, categories });
    return result.posts;
};

export const getCategories = async () => {
    const query = gql`
        query getCategories {
            categories {
                name
                slug
            }
        }
    `;

    const result = await request(graphqlEndpoint, query);
    return result.categories;
};

export const getPostDetails = async slug => {
    const query = gql`
        query getPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                title
                content {
                    raw
                }
                excerpt
                featuredImage {
                    url
                }
                createdAt
                slug
                author {
                    name
                    bio
                    photo {
                        url
                    }
                }
                categories {
                    name
                    slug
                }
            }
        }
    `;

    const result = await request(graphqlEndpoint, query, { slug });
    return result.post;
};

export const submitComment = async comment => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });

    return result.json();
};

export const getComments = async slug => {
    const query = gql`
        query getComments($slug: String!) {
            comments(where: { post: { slug: $slug } }) {
                name
                createdAt
                comment
            }
        }
    `;

    const result = await request(graphqlEndpoint, query, { slug });
    return result.comments;
};
