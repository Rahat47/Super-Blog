import { Author, Categories, Comments, CommentsForm, PostDetail, PostWidget } from "../../components";
import { getPostDetails, getPosts } from "../../services";

const PostDetails = ({ data }) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={data} />
                    <Author author={data.author} />
                    <CommentsForm slug={data.slug} />
                    <Comments slug={data.slug} />
                </div>

                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget slug={data.slug} categories={
                            data.categories.map(category => category.slug)

                        } />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;


export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug);

    return {
        props: {
            data
        }
    }
}


export async function getStaticPaths() {
    const result = await getPosts();

    const paths = result.map(post => ({
        params: {
            slug: post.node.slug
        }
    }));

    return {
        paths,
        fallback: false
    }
}