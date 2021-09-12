<script lang="ts">
  import { onMount } from "svelte";

  import Face from "./_Face.svelte";

  let connected = false;

  onMount(async () => {
    (window as any).parcelRequire = undefined;
    const Peer = (await import("peerjs")).default;

    const peer = new Peer();

    const svg = document.querySelector("svg");

    peer.on("open", () => {
      const conn = peer.connect("color-picker-yo");

      conn.on("open", () => {
        connected = true;
        conn.on("data", (data) => {
          console.log("Received", data);
          if (data.color) {
            document.body.style["background-color"] = data.color;
          }
        });
      });

      conn.on("close", () => {
        connected = false;
      });
    });
  });
</script>

<Face />

<style>
  :global(html) {
    height: 100%;
  }

  :global(body) {
    position: fixed;
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
  }
</style>
