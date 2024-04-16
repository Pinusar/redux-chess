import { Post, reactionAdded } from './postsSlice';
import { useDispatch } from 'react-redux';

export function ReactionButtons(props: ReactionButtonProps) {
  const post = props.post
  const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
  }

  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(a => {
    const emojiName = a[0];
    const emojiPic = a[1];
    return <button
      key={emojiName} type="button" className="muted-button reaction-button"
      onClick={() => dispatch(reactionAdded({postId: post.id, reaction: emojiName}))}
    >
      {emojiPic}
    </button>
  })

  return <div>{reactionButtons}</div>
}

export interface ReactionButtonProps {
  post: Post
}