<script setup>
    import SidebarSetting from '../setting-sidebar/SidebarSetting.vue';

    import { readonly, ref, onMounted} from 'vue';
    const inputDynamicValue = ref({
           comapnyLabel:{
                    forLabel:'comapny',
                    class: 'input-label',
                    lableName: 'Company Name'
           },
           comapnyInput: {
                    type : 'text',
                    id : 'comapny',
                    placeholder : 'Alex Pvr ltd',
                    name : 'comapny',
                    class : 'input-text company-text',                 
          }, 
          vendorLabel:{
                    forLabel:'vendor',
                    class: 'input-label',
                    lableName: 'Vendor ID'
           },
           vendorInput: {
                    type : 'text',
                    id : 'vendor',
                    placeholder : 'XI099230090',
                    name : 'vendor',
                    class : 'input-text vendor-text',
          },  
          imgUploadLabel: {
                   forLabel:'forvendor',
                    class: 'input-label',
                    lableName: 'Upload Logo'
          },
          imgUploadInput: { 
                    text : 'text',
                    placeholder: 'upload Image',
                    class: 'upload-img'
          },
          returnpolicyLabel :{
                    forLabel:'retrunpolicy',
                    class: 'input-label',
                    lableName: 'Return Policy Link'
          },  
          returnpolicyInput : {
                    type : 'text',
                    id : 'retrunpolicy',
                    placeholder : 'Enter URL',
                    name : 'retrunpolicy',
                    class : 'input-text'
          },
          privacypolicyLabel : {
                    forLabel:'privacypolicy',
                    class: 'input-label',
                    lableName: 'Privacy Policy Link'
          },
          privacypolicyInput : {
                    type : 'text',
                    id : 'privacypolicy',
                    placeholder : 'Enter URL',
                    name : 'privacypolicy',
                    class : 'input-text'
          },
          termConditionLabel : {
                    forLabel:'termcondition',
                    class: 'input-label',
                    lableName: 'Terms and Condition Link'
          },
          termConditionInput : {
                    type : 'text',
                    id : 'termcondition',
                    placeholder : 'Enter URL',
                    name : 'termcondition',
                    class : 'input-text'
          },
          saveBtn :{
                    type: 'submit',
                    class: 'save-btn',
                    text: 'Save'
          },
          whatsupOption :{
                    type:"checkbox",
                    id:"whatsupoption",
                    name:"whatsupoption",
                    value: "whatsupoption",
                    change:"handleChange" 
          },
          whatsupLabel:{
                    forLabel:'whatsupoption',
                    class: 'input-label',
                    lableName: 'whatsup'
          },
          smsOption: {
                    type:"checkbox",
                    id:"smsoption",
                    name:"smsoption",
                    value: "smsoption",
                    change:"handleChange" 
            },
          smsLabel:{
                    forLabel:'smsoption',
                    class: 'input-label',
                    lableName: 'SMS'
          },
          emailOption:{
                    type:"checkbox",
                    id:"emailoption",
                    name:"emailoption",
                    value: "emailoption",
                    change:"handleChange"
          },
          emailLabel:{
                    forLabel:'emailoption',
                    class: 'input-label',
                    lableName: 'Email'
          },
        });
</script>
<template>
     <div class="setting-main-outer">
        <!-- <SidebarSetting></SidebarSetting> -->
        <!-- <RouterView></RouterView> -->
        <!-- <MainCheckout></MainCheckout> -->
        <!-- <div class="checkoutsetting">
        <div class="main-sections">
            <section>
            <div class="basic-info">
                <header>
               <div class="logo">
                    <img src="public/demo/images/checkoutsetting/Shopify_logo_2018 1.png">
               </div>
               <hr>
             </header>
            <div class="conatiner">
             <div class="general-info">
                <div class="general-basic-info">
                    <span class="app-name"> App Name</span>
                    <span class="developer-name">Developer Email</span>               
                    <img>
                </div>
                <div class="general-shopify">
                    <div class="itl-info">
                    <span>ITL Checkout</span>
                     <img class="copy-img" src="/src/assets/images/copy.png">
                    </div>
                    <span class="itl-email">Support@ithinklogistic.com</span>
                </div>
             </div>
             <div class="form-section">
                    <InputFiled />
             </div>
            </div>
            </div>
           </section>
        </div>
        <div class="main-sections">
            <section>
            <div class="company-section">
                <div class="main-info">
                    <div class="company-text">
                        <span>Company Information</span>            
                    </div>  
                    <hr>    
                </div>
            <div class="conatiner">
                <div class="company-info">
                <div class="company-info-left">
                    <div class="main-input">
                        <DynamicLable :lableValues="inputDynamicValue.comapnyLabel"/>
                        <DynamicInput :inputValues="inputDynamicValue.comapnyInput"/>
                        <div class="img-upload">
                        <DynamicLable :lableValues="inputDynamicValue.imgUploadLabel"/>
                        <AjaxFileUpload />
                        </div>
                    </div>   
                    
                </div>
                <div class="company-info-right">
                    <div class="main-input">
                        <DynamicLable :lableValues="inputDynamicValue.vendorLabel"/>
                        <DynamicInput :inputValues="inputDynamicValue.vendorInput"/> 
                    </div>
                </div>
             </div>
            </div> 
            </div>
                    
        </section>
        </div>
            <div class="main-sections">
                <section>
                    <div class="conatiner">
                        <div class="send-order-section">
                            <div class="send-order">
                                <h3 class="order-conf">Send Order Confirmation</h3>
                                <div class="switch-btn">
                                <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider round"></span>
                                </label>
                                </div>
                            </div>
                            <div class="socialmedia-option">
                        <div class="media-options">
                            <DyanamicCheckbox :inputCheckbox="inputDynamicValue.whatsupOption" />
                            <DynamicLable :lableValues="inputDynamicValue.whatsupLabel"/>
                            <img>
                        </div>
                        <div class="media-options">
                            <DyanamicCheckbox :inputCheckbox="inputDynamicValue.smsOption" />
                            <DynamicLable :lableValues="inputDynamicValue.smsLabel"/>
                            <img>
                        </div>
                        <div class="media-options">
                            <DyanamicCheckbox :inputCheckbox="inputDynamicValue.emailOption" />
                            <DynamicLable :lableValues="inputDynamicValue.emailLabel"/>
                            <img>
                        </div>                      
                            </div>
                     </div>
                  </div>       
                </section>
            </div>
   
        <div>
            <div class="container">
                <DynamicButton :buttonValue = inputDynamicValue.saveBtn />
            </div>
        </div>
         </div> -->
    </div>
   
</template>

<style lang="scss" scoped>
    @import "./CheckoutSetting.scss";
</style>