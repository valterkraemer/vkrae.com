<script lang="ts">
  import { onMount } from "svelte";

  import Face from "./_Face.svelte";

  let connected = false;
  let text = "";

  onMount(async () => {
    (window as any).parcelRequire = undefined;
    const Peer = (await import("peerjs")).default;

    const peer = new Peer();

    const svg = document.querySelector("svg");

    peer.on("open", () => {
      const conn = peer.connect("color-picker-yo");

      conn.on("open", () => {
        connected = true;
        conn.on("data", (data: any) => {
          console.log("Received", data);
          if (data.color) {
            document.body.style["background-color"] = data.color;
          }
          if (data.text !== undefined) {
            text = data.text;
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

{#if connected}
  <div id="connected-dot" />
{/if}

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

  h1 {
    text-align: center;
    padding: 16px;
    margin-top: 8%;
  }

  #connected-dot {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.15);
  }
</style>
