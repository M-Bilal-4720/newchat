<template>

  <div id="app">
    <spinner v-if="spinnerStore.isLoading" />
    <router-view />
  </div>

</template>
<script>
import axios from './axios';
import Spinner from "@/views/SpinnerVue.vue";
import { useSpinnerStore } from "@/stores/spinnerStore";
export default {
  name: "App",
  components: {
    Spinner,
  },
  setup() {
    const spinnerStore = useSpinnerStore();
    return { spinnerStore };
  },
  mounted() {
    this.updateActiveStatus(1);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    window.addEventListener("beforeunload", () => this.updateActiveStatus(0));
    let token=localStorage.getItem('token');
    if(token){
      this.$router.push({name:"LoginPage"});
    }
    
  },
   beforeUnmount() {
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    window.removeEventListener("beforeunload", () => this.updateActiveStatus(0));
  },

  methods: {
    async updateActiveStatus(status) {
      try {
        await axios.post("/user/active/status", { is_active: status });
        console.log("User status updated:", status);
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    },
    handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        this.updateActiveStatus(1); 
      } else {
        this.updateActiveStatus(0); 
      }
    },
  }
};
</script>
