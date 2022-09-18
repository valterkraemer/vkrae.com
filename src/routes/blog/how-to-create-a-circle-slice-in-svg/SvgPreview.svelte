<script lang="ts">
  export let viewBox: string;
  export let gridSize = 1;
  export let gridStrokeWidth = 0.1;

  let minX: number;
  let minY: number;
  let width: number;
  let height: number;

  $: {
    [minX, minY, width, height] = viewBox.split(" ").map(parseFloat);
  }

  $: widthWithGrid = width === 0 ? 0 : width + gridStrokeWidth / 2;
  $: heightWithGrid = height === 0 ? 0 : height + gridStrokeWidth / 2;
</script>

{@html "<!-- Hey! Don't look at this one, it is a bit different. E.g the grid is added! -->"}
<svg viewBox="{minX} {minY} {widthWithGrid} {height + gridStrokeWidth / 2}">
  <defs>
    <pattern
      id="grid"
      width={gridSize}
      height={gridSize}
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M {gridSize} 0 L 0 0 0 {gridSize}"
        fill="none"
        stroke="gray"
        stroke-width={gridStrokeWidth}
      />
    </pattern>
  </defs>

  <rect
    x={-width}
    y={-height}
    width={widthWithGrid * 3}
    height={heightWithGrid * 3}
    fill="url(#grid)"
  />

  <slot />
</svg>

<style>
  svg {
    width: 100%;
  }
</style>
