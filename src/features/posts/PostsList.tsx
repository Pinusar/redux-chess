import { useSelector } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { selectPosts } from './postsSlice';
import { Link} from 'react-router-dom'
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

export function PostsList() {
  const posts = useAppSelector(selectPosts)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(p =>
    <article className="post-excerpt" key={p.id}>
      <h3>{p.title}</h3>
      <TimeAgo timestamp={p.date} />
      <p className="post-content">{p.content.substring(0, 100)}</p>
      <ReactionButtons post={p} />
      <Link to={`/posts/${p.id}`} className="button muted-button">View post</Link>
    </article>
  )

  return <section>
    <h2>Posts</h2>
    {renderedPosts}
  </section>
}