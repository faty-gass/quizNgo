<template>
  <div class="h100">
    <div class="container px-0 py-4">
      <nav class="nav nav-pills flex-column flex-sm-row nav-justified">
        <router-link
          :to="{ name: 'Dashboard' }"
          class="flex-sm-fill text-center nav-link mx-3"
          >My Dashboard</router-link
        >
        <router-link
          :to="{ name: 'Profile' }"
          class="flex-sm-fill text-center nav-link mx-3"
          >Profile</router-link
        >
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>
