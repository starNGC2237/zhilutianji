<template>
    <main class="absolute w-full h-fit min-h-full flex bg-[#fff] pb-[8em] px-[10%] dark:bg-neutral-900">
      <section class="container h-fit sm:px-[4em] box-border pt-[4em] ">
        <ContentDoc class="prose max-w-none dark:prose-invert text-lg"/>
      </section>
      <div class="scrollToTop fixed md:bottom-5 md:right-[8%] bottom-[7rem] right-[5px] h-20 justify-center items-center flex flex-col gap-1">
        <UButton
            icon="i-heroicons-square-3-stack-3d"
            size="xl"
            color="primary"
            rounded-full
            variant="solid"
            @click="openModal"
        />
        <UButton
          icon="i-heroicons-bars-arrow-up"
          :class="show?'flex':'hidden'"
          size="xl"
          color="primary"
          rounded-full
          variant="solid"
          @click="scrollTop"
        />
      </div>
      <UModal v-model="isOpen">
        <UModal v-model="isOpen">
          <UCommandPalette
              :autoselect="false"
              :groups="groupLinks"
              @update:model-value="onSelect"
          />
        </UModal>
      </UModal>
    </main>

</template>
<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const { data: page } = await useAsyncData('my-page', queryContent(useRoute().fullPath).findOne);
let links = toRaw(page.value?.body.toc?.links || []);
console.log(links)
let haveChildrenLinks = (link:any)=>{
  return {
      key: link.id,
      label: link.text,
      commands: [
        {
          id: link.id,
          label: link.text
        }
      ].concat(link.children?.map((child: any) => ({
        id: child.id,
        label: child.text,
      })))
    }
}
let groupLinks:any[] = []
links.forEach(item=>{
  if(item.children){
    groupLinks.push(haveChildrenLinks(item))
  }else {
    groupLinks.push({
      key: item.id,
      commands: [{
        id: item.id,
        label: item.text
      }]
    })
  }
})
console.log(groupLinks)

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
const openModal = ()=>{
  isOpen.value = true;
  nextTick(()=>{
    const input = document.querySelector('#headlessui-combobox-input-11') as HTMLInputElement;
    input.blur()
  })
}
const onSelect = (option:any)=>{
  isOpen.value = false;
  router.push(route.path+ '#' + option.id)
}
onMounted(()=>{
  fullHeight.value = window.screen.height;
  window.addEventListener('scroll', throttled(()=> {
    show.value = document.documentElement.scrollTop >= fullHeight.value;
  },300))
})
onBeforeUnmount(()=>{
  window.removeEventListener('scroll', throttled(()=> {
    show.value = document.documentElement.scrollTop >= fullHeight.value;
  },300))
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
