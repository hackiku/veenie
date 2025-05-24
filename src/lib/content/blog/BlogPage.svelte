<!-- src/lib/blog/BlogPage.svelte -->
<script lang="ts">
  import ArticleGrid from "./components/ui/ArticleGrid.svelte";
  import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
  import Turtles from "./components/ui/Turtles.svelte";
  import Title from "./components/ui/Title.svelte";
  import EmailOptin from "./components/cta/EmailOptin.svelte";
  import type { BlogPost } from './types';
  
  export let posts: BlogPost[];
  $: regularPosts = posts;
</script>

<main class="text-foreground relative overflow-x-hidden">
  <section class="relative pt-28 md:pt-36">
    <div class="relative z-10">
      <Title className="mb-6" />

      <div class="container md:px-20 lg:px-20 xl:px-44">
        <div class="space-y-6">
          <p class="text-xl md:text-2xl text-muted-foreground/80 font-normal">
            Turtles all the way down.
          </p>

          <EmailForm 
            buttonText="Subscribe"
            size="sm"
            wrap={false}
            source="Blog Post"
            className="max-w-sm"
          />
        </div>
      </div>

      <Turtles 
        position="bottom-right"
        size="lg"
        opacity={0.05}
        echoes={3}
				className=""
      />
    </div>
  </section>

  <section class="container z-50 md:px-20 lg:px-20 xl:px-44 py-12 overflow-hidden">
    <ArticleGrid posts={regularPosts} />
  </section>
  
  <section class="container md:px-20 lg:px-20 xl:px-44">
    <EmailOptin />
  </section>
</main>