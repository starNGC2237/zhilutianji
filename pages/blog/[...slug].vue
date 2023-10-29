<template>
    <main class="absolute w-full h-fit min-h-full flex bg-[#fff] pb-[8em] px-[10%] dark:bg-neutral-900">
      <section class="container h-fit sm:px-[4em] box-border pt-[4em] ">
        <ContentDoc class="prose max-w-none dark:prose-invert text-lg"/>
      </section>
      <div :class="show?'flex':'hidden'" class="scrollToTop fixed md:bottom-5 md:right-[8%] bottom-[6rem] right-[5px] h-20  justify-center items-center ">
        <UButton
          icon="i-heroicons-bars-arrow-up"
          size="xl"
          color="primary"
          rounded-full
          variant="solid"
          @click="scrollTop"
        />
      </div>
      <USlideover v-model="isOpen" :ui="{width:'max-w-[40%]'}">
        <!-- Content -->
      </USlideover>
    </main>

</template>
<script setup lang="ts">

let show = ref(false)
let fullHeight = ref(0);
let isOpen = ref(false);

const throttled = (fn: any, wait:number)=>{
  let timeout: NodeJS.Timeout | null = null;
  return ()=> {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn();
      }, wait)
    }
  }
}

onMounted(()=>{
  fullHeight.value = window.screen.height;
  window.onscroll = throttled(()=> {
    show.value = document.documentElement.scrollTop >= fullHeight.value;
  },300);
})
onBeforeUnmount(()=>{
  window.onscroll = null;
})
const scrollTop = ()=>{
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
</script>
<style scoped lang="postcss">

</style>
