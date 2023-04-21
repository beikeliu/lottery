const { createApp, ref, computed } = Vue;
const component = {
  setup() {
    const light = ref(0);
    const target = ref(1);
    let isRun = false;
    const start = () => {
      if (isRun) return;
      if (target.value < 1 || target.value > 9 || target.value === 5) {
        return alert("抽奖结果设置异常，请遵循规则进行！");
      }
      isRun = true;
      play(light, target.value, () => {
        isRun = false;
        console.log("over");
      });
    };
    return { light, target, start };
  },
};
const App = createApp(component);
App.mount("#app");
