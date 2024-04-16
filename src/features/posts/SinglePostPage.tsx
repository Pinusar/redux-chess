import { useAppSelector } from '../../app/hooks';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactionButtons } from './ReactionButtons';

export function SinglePostPage({match} : Props) {
  const postId = match.params.postId
  const posts = useAppSelector(state => state.posts)
  const post = posts.find(p => p.id === postId)
  const user = useAppSelector(state => state.users.find(u => u.id === post?.userId))

  if (!post) {
    return <h2>Post not found</h2>
  }
  return <section>
    <article>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </article>
    {user && <div>
      <p>Written by:</p>
      <p>{user.name}</p>
    </div>}
    <ReactionButtons post={post} />
    <Link to={`/editPost/${post.id}`} className="button">Edit post</Link>
  </section>
}

interface MatchParams {
  postId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}