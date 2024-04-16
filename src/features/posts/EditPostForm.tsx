import { useAppSelector } from '../../app/hooks';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUpdated } from './postsSlice';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';

export function EditPostForm({match}: Props) {
  const postId = match.params.postId
  const post = useAppSelector(state => state.posts.find(p => p.id === postId))

  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const onUpdateClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(postUpdated({
      postId,
      title,
      content,
    }));
    history.push(`/posts/${postId}`)
  }

  return <section>
    <h3>Add post</h3>
    <label>Title</label>
    <input
      value={title}
      onChange={e => setTitle(e.target.value)}
      type="text" />
    <br/>
    <label>Content</label>
    <textarea
      value={content}
      onChange={e => setContent(e.target.value)}
    />
    <br/>
    <button onClick={(e) => onUpdateClicked(e)}>Update</button>
  </section>
}

interface MatchParams {
  postId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}