<template>
  <div class="bg-[#fff] dark:bg-neutral-900">
    <SpeedInsights />
    <slot />
    <div class="tabs">
      <ul class="tabs-ul">
        <li
          class="tabs-li"
          :class="$route.path === '/' ? 'bg-slate-200 dark:bg-slate-700' : ''"
        >
          <NuxtLink class="link-class" aria-label="home" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-all m-1"
              :class="$route.path === '/' ? '' : 'h-96'"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span
              class="overflow-hidden"
              :class="$route.path === '/' ? '' : 'hidden'"
              >Home</span
            >
          </NuxtLink>
        </li>
        <li
          class="tabs-li"
          :class="
            $route.path === '/github' ? 'bg-slate-200 dark:bg-slate-700' : ''
          "
        >
          <NuxtLink
            class="link-class"
            aria-label="my github repos"
            to="/github"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-all m-1"
              :class="$route.path === '/github' ? '' : 'h-96'"
            >
              <path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
              />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span
              class="overflow-hidden"
              :class="$route.path === '/github' ? '' : 'hidden'"
              >Github</span
            >
          </NuxtLink>
        </li>
        <li
          class="tabs-li"
          :class="
            $route.path === '/blog' ? 'bg-slate-200 dark:bg-slate-700' : ''
          "
        >
          <NuxtLink class="link-class" aria-label="blog" to="/blog">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-all m-1"
              :class="$route.path === '/blog' ? '' : 'h-96'"
            >
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
            <span
              class="overflow-hidden"
              :class="$route.path === '/blog' ? '' : 'hidden'"
              >Blog</span
            >
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>
<style scoped lang="postcss">
.tabs {
  @apply fixed bottom-0 left-0 right-0 shadow-sm bg-white border rounded-none bg-opacity-70 backdrop-blur-sm z-50 dark:bg-neutral-900;
  @apply md:bottom-5 md:left-1/2 md:right-auto md:-translate-x-1/2 md:rounded-3xl;
}
.tabs-ul {
  @apply flex justify-center items-center;
}
.tabs-li {
  @apply h-20 w-20 m-2 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700;
}
.link-class {
  @apply h-full flex flex-col justify-center items-center transition-all dark:text-[#e8e6e3];
}
@media print {
  .tabs {
    @apply hidden;
  }
}
</style>
