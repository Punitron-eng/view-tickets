<template>
    <!-- <div class="checkbox-custom-outer"> -->
    <input type="checkbox" :class="className" :id="checkboxId" name="option" :value="checkboxValue" />
    <span class="input-before"></span>
    <!-- </div>     -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CheckboxView',
    // props:['checkboxType','checkboxId', 'checkboxValue' ],
    props: {
        checkboxId: {
            type: String,
        },
        checkboxValue: {
            type: String,
        },
        className: {
            type: String,
        },
    },
    data() {
        return {
            // checkboxData:'',
        };
    },
});
</script>
<style lang="scss">
.checkbox-custom-outer {
    position: relative;
}
.checkbox-custom-outer .input-before {
    content: '';
    display: inline-block;
    height: 16px;
    width: 16px;
    border: 1px solid #b9babb;
    border-radius: 2px;
    margin-right: 10px;
    margin-top: -3px;
    vertical-align: middle;
    background:transparent;
}
.checkbox-custom-outer .input-before::after {
    left: 4px;
    top: 3px;
    position: absolute;
}
.checkbox-custom-outer .input-before::after {
    content: '';
    display: inline-block;
    height: 6px;
    width: 9px;
    border-radius: 2px;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: rotate(-45deg);
}
.checkbox-custom-outer input[type='checkbox'] {
    opacity: 0;
    position: absolute;
    z-index: 1;
    top: 0px;
    width: 16px;
    height: 16px;
    padding: 0;
    margin: 0;
}
.checkbox-custom-outer input[type='checkbox']:checked + .input-before {
    border: 1px solid #0065ff;
    background: #0065ff;
    border-color: #0065ff;
}
</style>
