<template>
  <div>
    <div v-if="error">
      {{error}}
    </div>
    <div v-else>
      <ul>
        <li v-for="item in data" :key="item['id']">
          <a :href="item['html_url']" target="_blank">{{item['name']}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const {data,error} = useAsyncData('list',()=>$fetch('https://api.github.com/users/starNGC2237/repos?sort=updated',{method:'GET'}))
</script>
<style scoped lang="scss">

</style>
