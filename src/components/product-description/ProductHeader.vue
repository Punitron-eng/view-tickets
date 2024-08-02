<template>
    <div class="header">
        <div class="wrapper">
            <img src="../../assets/images/word-magic-icon.svg" alt="logo" />
            <h1 class="poppins-semibold word-magic-text">Word Magic</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderComp',
};
</script>
<style scoped lang="scss">
//   @import '../../assets/sass/style.scss';
@import '../../assets/styles.scss';
@import '../../views/product-description/productDescription.scss';
.header {
    display: flex;
    @include padding(24px, 0, 25px, 0);
    @include theme() {
        background-color: theme-get('card-bg');
    }
    @include media-query($tablet-screen) {
        .wrapper {
            @include flexbox($flex-direction: row, $justify-content: flex-start);
        }
    }
    img {
        @include dimensions(48px, 48px);
    }
    h1 {
        padding-top: 13px;
        margin-left: 32px;
        @include theme() {
            color: theme-get('black-800');
        }
        @include text($size: 20px, $weight: 600, $style: normal, $text-align: left, $family: 'Poppins-SemiBold');
        line-height: 1.2;
        letter-spacing: normal;
    }
}
.word-magic-text {
    margin-top: 0 !important;
}
</style>
