<template>
  <main class="flex-1">
    <div class="flex flex-1 flex-col overflow-y-auto xl:overflow-hidden">
      <div class="flex flex-1 xl:overflow-hidden">
        <!-- Secondary sidebar -->
        <div>
          <CoursesMaterialMenu />
        </div>

        <!-- Main content -->
        <div class="flex-1 xl:overflow-y-auto">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import CoursesMaterialMenu from "../../components/CoursesMaterialMenu.vue"
</script>

<style scoped></style>
