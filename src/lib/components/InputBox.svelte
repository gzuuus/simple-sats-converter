<script lang="ts">
  export let value: number;
  let inputId = `input-conversion`;
</script>

<div>
  <input type="number" id={inputId} bind:value={value} />
</div>
  
  <style>
    div {
      margin-bottom: 1em;
    }
    input {
      border-radius: 15px;
      padding: 15px;
      border: 1px solid white;
      background: transparent;
      color: white;
      font-size: 16px;
      font-weight: bold;
      width: 42%;
      text-align: center;
    }
  </style>
  