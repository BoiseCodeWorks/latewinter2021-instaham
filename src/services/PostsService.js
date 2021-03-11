import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    AppState.posts = res.data
  }

  async createPost(postData) {
    await api.post('api/posts', postData)
    this.getAll()
  }

  async getVotesByPostId(id) {
    const res = await api.get(`/api/posts/${id}/votes`)
    AppState.votes[id] = res.data
  }

  async vote(v) {
    await api.post('/api/votes', v)
    this.getVotesByPostId(v.post)
  }
}

export const postsService = new PostsService()
