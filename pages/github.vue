<template>
  <main class="absolute w-full min-h-full ">
    <section class="flex justify-center w-full min-h-screen">
      <div class="container pb-[8em] pt-[8em]">
        <h1 class="px-4 text-4xl my-7 w-[100%] sm:w-[90%] m-auto">Github:</h1>
        <div v-if="error">
          {{error}}
        </div>
        <div class="flex w-full flex-wrap justify-around px-4" v-else>
          <div class="p-6 bg-white w-[100%] sm:w-[40%] flex flex-col justify-left item rounded-lg border bg-opacity-70 backdrop-blur-sm hover:shadow-md" v-for="item in data" :key="item['id']">
            <h2 class="text-2xl mb-3"><a :href="item['html_url']" target="_blank" class="font-bold">{{item['name']}}</a></h2>
            <p>{{item['description'] === null ? '( no description )':item['description']}}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
const {data,error} = useAsyncData('list',()=>$fetch('https://api.github.com/users/starNGC2237/repos?sort=updated',{method:'GET'}))
</script>
<style scoped lang="postcss">
.item:not(:nth-last-of-type(-n+2)){
  margin-bottom: 20px;
}
</style>
