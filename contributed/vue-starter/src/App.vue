<template>
  <!-- 
    This is the template section where we define the HTML structure of our component.
    In Vue, we use a single-file component (SFC) approach that combines template, logic, and styles.
  -->
    <!-- 
            Please note that this document does not use the spectrum web components theme for Express.
            You may use "addOnUISdk.app.ui.theme" to get the current theme and style accordingly.
        -->
        
  <div class="container">
    <!-- 
      Vue directives start with ':' or 'v-' and provide special functionality:
      - :disabled is a shorthand for v-bind:disabled, which binds the disabled attribute to the isReady state
      - @click is a shorthand for v-on:click, which attaches a click event handler
      - {{ buttonText }} is a template expression that displays the value of buttonText reactive variable
    -->
    <button :disabled="!isReady" @click="handleClick">{{ buttonText }}</button>
  </div>
</template>

<script>
// Import necessary functions from Vue's Composition API
import { ref, onMounted, readonly, inject } from 'vue'

export default {
  // Name of the component for debugging purposes
  name: 'App',  
  
  // The setup() function is the entry point for Vue's Composition API
  setup() {
    // Create reactive state variables using ref()
    // These will automatically update the UI when their values change
    const isReady = ref(false);     // Controls button disabled state
    const buttonText = ref('Click me');    

    // Inject the Adobe Express SDK that was provided in index.js
    // This makes the SDK available only in this component without global variables
    const addOnUISdk = inject('addOnUISdk');

    // Define the function that runs when the button is clicked
    const handleClick = async () => {
        // Update the button text (UI will automatically update)
        buttonText.value = 'Clicked'        
        
        // Log the SDK details to the console
        console.table(JSON.stringify(addOnUISdk));                
    }

    // onMounted lifecycle hook runs after the component is mounted to the DOM
    onMounted(async () => {
        console.log("App.vue is ready for use.")
        // Enable the button once the component is mounted
        isReady.value = true
    });

    // Values returned from setup() are exposed to the template
    return {
      isReady,
      buttonText,
      handleClick
    }
  }
}
</script>

<style>
/* CSS styles for the component */
.container {
  margin: 24px;
  display: flex;
  flex-direction: column;
}

button {
  background-color: rgb(82, 88, 228);  /* Adobe blue color */
  border-color: rgb(82, 88, 228);
  border-radius: 16px;
  border-style: solid;
  color: rgb(255, 255, 255);  /* White text */
  font-family: sans-serif;
  height: 32px;
}

/* Styles for the disabled button state */
button:disabled {
  background-color: rgb(177, 177, 177);  /* Gray color when disabled */
  border-color: rgb(177, 177, 177);
}

/* Hover effect for the button (only when not disabled) */
button:not([disabled]):hover {
  background-color: rgb(64, 70, 202);  /* Darker blue on hover */
  cursor: pointer;
}
</style> 