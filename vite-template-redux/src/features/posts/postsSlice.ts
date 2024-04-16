import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {sub} from 'date-fns';

export interface Post {
  id: string,
  title: string,
  content: string,
  userId: string | undefined,
  date: string,
  reactions: ReactionsCounter
}

const emptyReactions : ReactionsCounter = {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}

const initialState : Array<Post> = [
  { id: '1', title: 'First Post!', content: 'Hello!', date: sub(new Date(), {minutes: 10}).toISOString(), userId: undefined, reactions: emptyReactions },
  { id: '2', title: 'Second Post', content: 'More text', date: sub(new Date(), {minutes: 5}).toISOString(), userId: undefined, reactions: emptyReactions }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>)  {
        state.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: emptyReactions
          }
        }
      }
    },
    postUpdated(state, action) {
      const {postId, title, content} = action.payload
      const post = state.find(post => post.id === postId)
      if (post) {
        post.title = title
        post.content = content
      }
    },
    reactionAdded(state, action: PayloadAction<ReactionAddedPayload>) {
      const {postId, reaction} = action.payload
      const post = state.find(p => p.id === postId)
    }
  }
});

interface ReactionsCounter {
  thumbsUp: number,
  hooray: number,
  heart: number,
  rocket: number,
  eyes: number
}

interface ReactionAddedPayload {
  postId: string,
  reaction: string
}

export const selectPosts = (state: RootState) => state.posts

export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions

export default postsSlice.reducer