<template>
    <div class="header-outer-section">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'BreadcrumbView',
};
</script>
<style lang="scss">
.header-outer-section {
    padding: 20px;
    margin-left: 0;
    margin-right: 0;
}
</style>
