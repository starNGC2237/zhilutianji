<template>
    <div>
      <h1>Welcome to the aboutpage</h1>
      <div class="projects">
        <AppProject v-for="item in 10"></AppProject>
      </div>
    </div>
</template>
<style scoped>
.projects {
    /** grid布局，一行三个*/
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
}
</style>