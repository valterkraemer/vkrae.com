<script lang="ts">
  import type { Post } from ".svelte-kit/types/src/routes/blog/proxy+page.server";

  export let data: { posts: Post[] };

  const { posts } = data;
</script>

<h1>Posts</h1>

<ol>
  {#each posts as post}
    <a href={post.url}>{post.title}</a>
  {/each}
</ol>
