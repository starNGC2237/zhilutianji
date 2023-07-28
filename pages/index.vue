<template>
  <main class="absolute w-full h-full flex bg-[#fff] pb-[7.5em]">
    <section class="content h-full bg-[#fff] flex flex-col justify-center box-border text-4xl">
      <h1 class="text-5xl my-7 font-bold">💖 Hello. </h1>
      <h2 class="text-3xl my-6 font-bold">I am zhilutianji , a Front-end developer.</h2>
      <p class="text-xl my-5">You can find me in Twitter: <a target="_blank" class="text-[#87ceeb] no-underline hover:underline" href="https://twitter.com/zhilutianji">@zhilutianji</a>
        or Github: <a target="_blank" class="text-[#87ceeb] no-underline hover:underline" href="https://github.com/starNGC2237">@starNGC2237</a></p>
      <p class="text-xl my-5">and sometimes I also solve problems on  <a target="_blank" class="text-[#87ceeb] no-underline hover:underline" href="https://leetcode.cn/u/zhilutianji/">leetcode</a></p>
    </section>
    <section class="head h-full bg-[#fff] flex items-center justify-end box-border ">
      <img class="rounded-full" src="@/assets/images/head.png" alt="head pic"/>
    </section>
  </main>
</template>
<style scoped lang="scss">
.content{
  width: 55%;
  padding: 0 0 0 10vw;
}
.head{
  width: 45%;
  padding-right: 10vw;
  img{
    width: 46%;
    @media screen and (max-width: 1024px) {
      width: 80%;
    }
  }
}
</style>
<script setup lang="ts">
</script>
