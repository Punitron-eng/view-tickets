<script setup>
import {defineProps} from 'vue'
import HeaderIcon from '../../assets/images/wismo-header.svg'
const props = defineProps(['Image','Heading','SubHeading'])
</script>

<template>

    <div class="page-header-common mb-4 md:mb-0">
        <div class="upper-section">
            <img :src="props.Image" />
            <div class="heading">
                {{ props.Heading }}
            </div>
        </div>
        <div class="sub-heading">
            {{ props.SubHeading }}
        </div>

    </div>

</template>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';
    .page-header-common{   
        padding: 0 8px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media screen and (max-width:767px) {
            align-items: flex-start;
        }
        gap:8px;
        max-width: 324px;
        .upper-section{
            display: flex;
            gap:8px;
            align-items: center;
            @media screen and (min-width:768px) {
                flex-direction: column;
            }
            img{
                width: 48px;
                height: 48px;
                @media screen and (max-width:768px) {
                width: 24px;
                height: 24px;
            }
            }
            .sub-heading{
                text-align: left;
            }
           

        .heading{
            font-family:$interBold;
            font-size: 24px;
            font-weight: bold;
            line-height: 1.17;
  letter-spacing: -0.24px;
  @include theme() {
                    color: theme-get('black-900');
                }
  @media screen and (max-width:768px) {
    font-size: 18px;
  }
        }
    }

        .sub-heading{
            text-align: left;
            font-size:13px;
            font-family:$interRegular;
            line-height: 1.43;

            @media screen and (min-width:768px) {
                text-align: center;
                font-size:14px;                
            }

        }
    }
    @media screen and (min-width:768px) {
                .page-header-common{   
                    padding:40px;
                }
                .heading{
                margin-top:8px;
                }
                
            }
</style>