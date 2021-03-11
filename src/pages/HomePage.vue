<template>
  <div class="home container">
    <div class="row">
      <div class="col py-3">
        <h2>Todays Hot Ham Posts!</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#create-post">
          Make Ham
        </button>
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

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      loading: true,
      posts: computed(() => AppState.posts),
      showForm: false
    })
    onMounted(async() => {
      await postsService.getAll()
      state.loading = false
    })
    return {
      state
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
