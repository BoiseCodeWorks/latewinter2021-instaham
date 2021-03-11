<template>
  <div class="post col-md-4 my-2">
    <div class="card text-left m-">
      <div class="text-right absolute top right p-2 z-2" v-if="post.creatorEmail == state.user.email">
        <i class="fas fa-times text-danger action" @click="deletePost"></i>
      </div>
      <div class="bg-dark">
        <img class="card-img-top" :src="post.imgUrl" alt="">
      </div>
      <div class="card-body absolute bottom text-light p-2 d-flex justify-content-between w-100">
        <p><strong>{{ post.title }}</strong> | {{ state.voteCount }}</p>
        <div class="voting" v-if="state.user.isAuthenticated">
          <i class="fas fa-thumbs-up mr-3 action" @click="vote(1)"></i>
          <i class="fas fa-thumbs-down action" @click="vote(-1)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
export default {
  name: 'Post',
  props: {
    post: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      votes: computed(() => AppState.votes[props.post.id]),
      voteCount: computed(() => {
        let total = 0
        if (state.votes) {
          state.votes.forEach(v => {
            total += v.value
          })
        }
        return total
      }),
      editPost: false
    })

    onMounted(async() => {
      postsService.getVotesByPostId(props.post.id)
    })

    return {
      state,
      vote(val) {
        const vote = { post: props.post.id, value: val }
        postsService.vote(vote)
      },
      deletePost() {
        postsService.delete(props.post.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  mask-image: linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 25%);
}

.voting i:hover {
  color: var(--primary);
}

.action:hover {
  cursor: pointer;
  transform: scale(1.2)
}

.z-2 {
  z-index: 2;
}
</style>
