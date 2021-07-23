import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import loadDirective from "./utils/directive";
import "./utils/crossStage/crossStage.scss";

const app = createApp(App);
loadDirective(app); // 加载自定义指令
app.use(router);
app.mount("#app");
