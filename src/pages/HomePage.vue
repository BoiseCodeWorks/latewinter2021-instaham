<template>
  <div class="home container">
    <div class="row">
      <div class="col py-3">
        <h2>Todays Hot Ham Posts!</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button v-if="!state.showForm" type="button" class="btn btn-primary btn-lg" @click="state.showForm = true">
          Make Ham
        </button>
        <button v-else type="button" class="btn btn-danger btn-lg" @click="state.showForm = false">
          Burn the Ham
        </button>
        <form class="form-inline" @submit.prevent="createPost" v-if="state.showForm">
          <div class="form-group">
            <input type="text"
                   name="title"
                   id="title"
                   class="form-control"
                   placeholder="Enter post Title"
                   aria-describedby="helpId"
                   v-model="state.newPost.title"
            >
            <input type="text"
                   name="imgUrl"
                   id="imgUrl"
                   class="form-control"
                   placeholder="Enter img url"
                   aria-describedby="helpId"
                   v-model="state.newPost.imgUrl"
            >
            <button class="btn btn-success" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row py-3">
      <i class="fas fa-spinner fa-spin" v-if="state.loading"></i>
      <Post v-else v-for="post in state.posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      loading: true,
      posts: computed(() => AppState.posts),
      showForm: false,
      newPost: {}
    })
    onMounted(async() => {
      await postsService.getAll()
      state.loading = false
    })
    return {
      state,
      async createPost() {
        try {
          await postsService.createPost(state.newPost)
          state.newPost = {}
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
