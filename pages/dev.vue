<script setup lang="ts">
type projectItem = {
  name:string;
  html_url:string;
  description:string;
  openMethod:'_popup'|'_blank';
}
const data:projectItem[] = [
  {
    name:'价值一亿的AI代码',
    html_url:'http://47.122.9.25:5000/',
    description:'价值一亿的AI代码',
    openMethod:'_popup',
  },
  {
    name:'星空科技',
    html_url:'http://47.122.9.25:8089/',
    description:'星空科技 - 创新型网络技术企业',
    openMethod:'_blank',
  },
  {
    name:'opal',
    html_url:'https://opal.starlibrary.online/',
    description:'opal - 每天60s看完全球资讯',
    openMethod:'_blank',
  },
  {
    name:'教学能力比赛赛务平台',
    html_url:'http://47.122.9.25:9998/demo1/',
    description:'教学能力比赛赛务平台',
    openMethod:'_blank',
  },
  {
    name:'某商城',
    html_url:'https://shops.starlibrary.online/',
    description:'某商城',
    openMethod:'_blank',
  },
  {
    name:'运营平台',
    html_url:'http://47.122.9.25:7777/',
    description:'vue3',
    openMethod:'_blank',
  },
]
const openUrl = (item:any)=>{
  if(item.openMethod === '_blank'){
    window.open(item.html_url,'_blank');
  }else if(item.openMethod === '_popup'){
    window.open(item.html_url,'','height=529, width=700, top=265,left=645, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
  }

}
</script>

<template>
  <main class="absolute w-full min-h-full bg-white  dark:bg-neutral-900">
    <section class="flex justify-center w-full min-h-screen">
      <div class="container pb-[8em] pt-[3em]">
        <h1 class="px-4 text-4xl mb-7 w-[100%] sm:w-[90%] m-auto dark:text-[#e8e6e3]">项目预览:</h1>
        <div class="flex w-full flex-wrap justify-between px-4 sm:w-[90%] m-auto">
          <UCard v-for="item in data" :key="item['id']" class="w-[100%] sm:w-[40%] flex flex-col justify-left item border">
            <h2 class="text-2xl mb-3">
              <a :href="item['html_url']" @click.prevent="openUrl(item)" class="font-bold">{{item['name']}}</a>
            </h2>
            <p>{{item['description'] === null ? '( no description )':item['description']}}</p>
          </UCard>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="postcss">
.item{
  box-sizing: border-box;
  margin-bottom: 20px;
}
</style>
