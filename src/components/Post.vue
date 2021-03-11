<template>
  <div class="post col-md-3 my-2">
    <div class="card text-left m-">
      <div class="text-right" v-if="post.creatorEmail == state.user.email">
        <i class="fas fa-times text-danger" @click="deletePost"></i>
      </div>
      <img class="card-img-top" :src="post.imgUrl" alt="">
      <div class="card-body">
        <p><strong>{{ post.title }}</strong> | {{ state.voteCount }}</p>
        <small class="lighten" v-if="post.creator">
          {{ post.creator.name }}
        </small>
        <div class="voting" v-if="state.user.isAuthenticated">
          <i class="fas fa-thumbs-up mr-3" @click="vote(1)"></i>
          <i class="fas fa-thumbs-down" @click="vote(-1)"></i>
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

      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
