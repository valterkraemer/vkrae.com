<script lang="ts">
  type Replacement = {
    text: string;
    value: string;
  };
  export let replacements: Replacement[];

  const replacementsSlice = replacements.slice();

  const textNodes: Node[] = [];

  function findReplacementTextNodes(element: HTMLDivElement) {
    const treeWalker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const foundIndex = replacementsSlice.findIndex(
            (replacement) => replacement.text === node.textContent
          );

          if (foundIndex !== -1) {
            textNodes.push(node);

            replacementsSlice.splice(foundIndex, 1);
          }

          return NodeFilter.FILTER_REJECT;
        },
      }
    );

    treeWalker.nextNode();
  }

  function update() {
    replacements.forEach(({ value }, index) => {
      const node = textNodes[index];
      if (node) {
        node.textContent = value;
      }
    });
  }

  $: replacements && update();
</script>

<div use:findReplacementTextNodes>
  <slot />
</div>
