import { useState } from 'react';
import { postAdded } from './postsSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';

export function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const users = useAppSelector(state => state.users)
  const userOptions = users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)
  const [selectedUserId, setSelectedUserId] = useState(users[0].id)

  const addPost = () => {
    if (title && content) {
      dispatch(postAdded(title, content, selectedUserId))
      setTitle('')
      setContent('')
    }
  }

  return <section>
    <h3>Add post</h3>
    <label>Select user</label>
    <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
      {userOptions}
    </select>
    <br />
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
    <button onClick={addPost}>Add</button>
  </section>
}