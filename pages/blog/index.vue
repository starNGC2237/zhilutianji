<script setup lang="ts">
const { data: blogList,error } = await useAsyncData(`content`, () => {
  return queryContent().find()
})
</script>

<template>
  <main class="absolute w-full min-h-full bg-white dark:bg-neutral-900">
    <section class="flex justify-center w-full min-h-screen">
      <div class="container pb-[8em] pt-[3em]">
        <h1 class="px-4 text-4xl mb-7 w-[100%] sm:w-[90%] dark:text-[#e8e6e3] m-auto">Blog:</h1>
        <div v-if="error">
          {{error}}
        </div>
        <div class="flex w-full flex-wrap justify-around px-4 sm:w-[90%] m-auto" v-if="blogList">
          <UCard v-for="item in blogList" :key="item['id']" class="w-[100%] sm:w-[100%] flex flex-col justify-left item border">
            <h2 class="text-2xl mb-3"><a :href="item['_path']" class="font-bold">{{item['title']}}</a></h2>
            <p>{{item['description'] === '' ? '( no description )':item['description']}}</p>
          </UCard>
        </div>
      </div>
    </section>
  </main>

</template>

<style scoped lang="postcss">
.item:not(:last-child){
  margin-bottom: 20px;
}
</style>
