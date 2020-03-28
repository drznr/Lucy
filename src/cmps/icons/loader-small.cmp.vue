<template>
    <svg
      class="loader-small"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="background: none; display: block; shape-rendering: auto;"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(263.066 50 50)">
        <path
          d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843"
          fill="none"
          stroke="#9c9c9c"
          stroke-width="10"
        />
        <path d="M49 -1L49 31L65 15L49 -1" fill="#9c9c9c" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </g>
    </svg>
</template>

<script>
export default {
  props: {}
};
</script>