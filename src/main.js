import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mitt from 'mitt';

const emitter = mitt();

import AppBarWidget from './components/widgets/nav/AppBarWidget';
import LeftBarWidget from './components/widgets/nav/LeftBarWidget';
import RightBarWidget from './components/widgets/nav/RightBarWidget';
import SpinnerWidget from './components/widgets/ui/SpinnerWidget';

const app = createApp(App);

app.component('app-bar-widget', AppBarWidget);
app.component('left-bar-widget', LeftBarWidget);
app.component('right-bar-widget', RightBarWidget);
app.component('spinner-widget', SpinnerWidget);

app.config.globalProperties.emitter = emitter;
app.config.globalProperties.serverIp = "localhost";

app.use(router);
app.mount('#app');
