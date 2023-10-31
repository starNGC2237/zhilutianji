<template>
  <main class="absolute w-full h-full flex bg-[#fff] dark:bg-neutral-900 justify-center">
    <section class="container flex pb-[8em] px-[2em]">
      <section class="w-[55%] h-full flex flex-col justify-center box-border text-4xl">
        <h1 class="text-5xl my-7 font-bold dark:text-[#e8e6e3]">💖 Hello. </h1>
        <h2 class="text-3xl my-6 font-bold dark:text-[#e8e6e3]">I am zhilutianji , a Front-end developer.</h2>
        <p class="text-xl my-5 dark:text-[#e8e6e3]">You can find me in Github: <a target="_blank" class="text-[#0000CD] dark:text-blue-500 underline hover:underline" href="https://github.com/starNGC2237">@starNGC2237</a></p>
        <p class="text-xl my-5 dark:text-[#e8e6e3]">and sometimes I also solve problems on  <a target="_blank" class="text-[#0000CD] dark:text-blue-500 underline hover:underline" href="https://leetcode.cn/u/zhilutianji/">LeetCode</a></p>
      </section>
      <section class="w-[45%] h-full flex items-center justify-end box-border ">
        <nuxt-img preload class="rounded-full 2xl:w-[300px] xl:w-[40%] lg:w-[55%] md:w-[65%] sm:w-[80%] w-[80%] h-auto" width="80%" height="auto" src="/head.jpg" alt="head pic" title="What's new?" @click="$router.push('/dev')"/>
      </section>
    </section>

  </main>
</template>
<script setup lang="ts">
</script>
