import { createApp } from 'vue';
import router from './router/index';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import ToastView from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import FileUpload from 'primevue/fileupload';
import Rating from 'primevue/rating';
import InputNumber from 'primevue/inputnumber';
// import CodeHighlight from './AppCodeHighlight';
import ProgressBar from 'primevue/progressbar';
import SkeletonView from 'primevue/skeleton';
import ColumnView from 'primevue/column';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import DropdownView from 'primevue/dropdown';
import ButtonView from 'primevue/button';
import CheckboxView from 'primevue/checkbox';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DialogView from 'primevue/dialog';
import Tooltip from 'primevue/tooltip';
import OverlayPanel from 'primevue/overlaypanel';
import Card from 'primevue/card';
import DynamicLable from './components/resuable-component/DynamicLable.vue';
import DynamicInput from './components/resuable-component/DynamicInput.vue';
import DynamicButton from './components/resuable-component/DynamicButton.vue';
import DyanamicCheckbox from './components/resuable-component/DyanamicCheckbox.vue';
import Dropdown from 'primevue/dropdown';
import Panel from 'primevue/panel';
import Timeline from 'primevue/timeline';

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
// import 'prismjs/themes/prism-coy.css';
// import './App.scss';
import Ripple from 'primevue/ripple';
import InputSwitch from 'primevue/inputswitch';
import DataTable from 'primevue/datatable';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import store from './store';
import Menubar from 'primevue/menubar';
import StyleClass from 'primevue/styleclass';
import Carousel from 'primevue/carousel';
import MultiSelect from 'primevue/multiselect';
import VueMitter from '@nguyenshort/vue3-mitt';

import '@/assets/styles.scss';
import '@/components/itl-dataTable-files/itl-dataTable/commonDataTable.scss';
const app = createApp(App);

app.use(VueMitter);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(router);
app.use(store);

app.component('DataTable', DataTable);

app.component('Image', Image);

app.component('MegaMenu', MegaMenu);
app.component('InputNumber', InputNumber);
app.component('MultiSelect', MultiSelect);
app.component('Menu', Menu);
app.component('Menubar', Menubar);
app.component('Carousel', Carousel);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);

app.component('InputSwitch', InputSwitch);
app.component('ProgressBar', ProgressBar);
app.component('FileUpload', FileUpload);
app.component('Rating', Rating);

// app.directive('code', CodeHighlight);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);
app.directive('tooltip', Tooltip);
app.component('ToastView', ToastView);
app.component('Toast', Toast);
app.component('ColumnView', ColumnView);
app.component('SkeletonView', SkeletonView);
app.component('InputText', InputText);
app.component('RadioButton', RadioButton);
app.component('DropdownView', DropdownView);
app.component('ButtonView', ButtonView);
app.component('CheckboxView', CheckboxView);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('DialogView', DialogView);
app.component('OverlayPanel', OverlayPanel);
app.component('Card', Card);
app.component('Dropdown', Dropdown);
app.component('Panel', Panel);
app.component('Timeline', Timeline);

app.component('DynamicLable', DynamicLable);
app.component('DynamicInput', DynamicInput);
app.component('DynamicButton', DynamicButton);
app.component('DyanamicCheckbox', DyanamicCheckbox);

app.mount('#app');
