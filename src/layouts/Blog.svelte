<script>
  /** @type {string} */
  export let title;
  /** @type {string} */
  export let author;
  /** @type {string} */
  export let date;
</script>

<h1>{title}</h1>
<pre>
    {author}
    {date}
</pre>

<slot />
