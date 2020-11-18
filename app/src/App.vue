<template>
  <div class="bg-light">
    <NavBar
      :isLoggedIn="this.$store.getters.loggedIn"
      :isAdmin="this.$store.getters.isAdmin"
    />
    <router-view />
    <NavFooter class="nav-footer" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import NavFooter from "@/components/NavFooter.vue";

export default {
  components: {
    NavBar,
    NavFooter,
  },
};
</script>
