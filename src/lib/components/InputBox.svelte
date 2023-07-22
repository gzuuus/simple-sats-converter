<script lang="ts">
  export let label: string;
  export let value: number;
  let inputId = `input-${Math.random().toString(36).substring(7)}`;
</script>

<div>
  <label for={inputId}>{label}</label>
  <input type="number" id={inputId} bind:value={value} />
</div>
  
  <style>
    div {
      margin-bottom: 1em;
    }
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.5em;
    }
    input {
      border-radius: 15px;
      padding: 15px;
      border: none;
    }
  </style>
  