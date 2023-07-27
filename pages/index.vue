<template>
  <main class="index">
    <section class="content">
      <h1>💖 Hello. </h1>
      <h2>I am zhilutianji , a Front-end developer.</h2>
      <p>You can find me in Twitter: <a href="https://twitter.com/zhilutianji">@zhilutianji</a>
        or Github: <a href="https://github.com/starNGC2237">@starNGC2237</a></p>
        <p>and sometimes I also solve problems on  <a href="https://leetcode.cn/u/zhilutianji/">leetcode</a></p>
    </section>
    <section class="head">
      <img src="@/assets/images/head.png" alt="head pic"/>
    </section>
  </main>
</template>
<style scoped lang="scss">
.index {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
}
.content{
  width: 55%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 0 0 10vw;
  font-size: 20px;
  a{
    color: skyblue;
  }
}
.head{
  width: 45%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: right;
  box-sizing: border-box;
  padding-right: 10vw;
  img{
    width: 46%;
    @media screen and (max-width: 1024px) {
      width: 80%;
    }
    border-radius: 50%;
  }
}

</style>
<script setup lang="ts">
</script>
