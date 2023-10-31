<template>
  <main class="absolute w-full min-h-full bg-white  dark:bg-neutral-900">
    <section class="flex justify-center w-full min-h-screen">
      <div class="container pb-[8em] pt-[3em]">
        <h1 class="px-4 text-4xl mb-7 w-[100%] sm:w-[90%] m-auto dark:text-[#e8e6e3]">Github:</h1>
        <div v-if="error" class="px-4 m-auto sm:w-[90%]">
          {{error}}
        </div>
        <div class="flex flex-wrap justify-between px-4 w-full sm:w-[90%] m-auto" v-if="data?.length===0">
            <UCard v-for="item in 10" :key="item['id']" class="w-[100%] sm:w-[40%] flex flex-col justify-left item border">
              <USkeleton class="text-2xl mb-3 h-7 w-[40%]"></USkeleton>
              <div class="space-y-3">
                <USkeleton class="h-6"/>
                <USkeleton class="h-6"/>
              </div>
            </UCard>
        </div>
        <div class="flex flex-wrap justify-between px-4 w-full sm:w-[90%] m-auto" v-if="data?.length>0">
          <UCard v-for="item in data" :key="item['id']" class="w-[100%] sm:w-[40%] flex flex-col justify-left item border">
            <h2 class="text-2xl mb-3"><a :href="item['html_url']" target="_blank" class="font-bold">{{item['name']}}</a></h2>
            <p>{{item['description'] === null ? '( no description )':item['description']}}</p>
          </UCard>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
let data = ref([]);
let error = ref(null);
fetch('https://api.github.com/users/starNGC2237/repos?sort=updated').then(res=>res.json()).then(res=>data.value = res).catch(err=>error.value = err)
</script>

<style scoped lang="postcss">
.item{
  margin-bottom: 20px;
}
</style>
