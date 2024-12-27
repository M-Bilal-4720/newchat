<template>
    <div v-if="isLoading" class="spinner-overlay">
      <div class="spinner">
        <!-- Customize the spinner here -->
        <div class="loader"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'pinia'; // Replace with Vuex if using Vuex
  import { useSpinnerStore } from "@/stores/spinnerStore"; // Spinner store
  
  export default {
    computed: {
      ...mapState(useSpinnerStore, ['isLoading']),
    },
  };
  </script>
  
  <style>
  .spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #4caf50;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  