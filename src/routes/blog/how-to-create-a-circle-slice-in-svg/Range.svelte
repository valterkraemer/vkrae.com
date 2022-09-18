<script lang="ts">
  export let label: string;
  export let value: number;
  export let min: number;
  export let max: number;
  export let step = 0.25;
</script>

<div>
  <label>
    {label}
    <input type="range" bind:value {min} {max} {step} />
  </label>
  <code>{value}</code>
</div>
