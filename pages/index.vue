<template>
    <section>
      <div class="full-page">
      </div>
      <h1>Welcome to the homepage</h1>
    </section>
</template>
<style scoped>
.full-page {
    position: relative;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: #000;
}
.projects {
    /** grid布局，一行三个*/
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
}
</style>