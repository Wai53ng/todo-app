<script setup>
const props = defineProps({
    type: String,
})
</script>

<template>
    <button
        type="button"
        class="btn"
        :class="[
            `btn-${props.type}`
        ]"
    >
        <slot></slot>
    </button>
</template>
