<template>
  <b-icon :icon="setIcon" :variant="setVariant" class="mr-1"></b-icon>
</template>

<script>
export default {
  props: {
    difficulty: String,
  },

  computed: {
    setVariant() {
      switch (this.$props.difficulty) {
        case "Facile":
          return "success";
          break;
        case "Moyen":
          return "warning";
          break;
        case "Difficile":
          return "danger";
          break;
        case "Hardcore":
          return "dark";
          break;
        default:
          return "light";
          break;
      }
    },

    setIcon() {
      switch (this.$props.difficulty) {
        case "Facile":
          return "reception1";
          break;
        case "Moyen":
          return "reception2";
          break;
        case "Difficile":
          return "reception3";
          break;
        case "Hardcore":
          return "reception4";
          break;
        default:
          return "light";
          break;
      }
    },
  },
};
</script>
