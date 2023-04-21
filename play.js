window.play = play
/**
 * 抽奖游戏开始
 * @param {Ref<Number>} activedRef 高亮item的index
 * @param {Number} target 停的item的index
 * @param {Function} callback 抽奖游戏结束的回调函数
 */
function play(activedRef, target, callback) {
  const nums = [1, 2, 3, 6, 9, 8, 7, 4]; // 循环转动顺序
  let duration = 6000; // 持续时间
  let speed = 200; // 转动速度
  let l = null;
  let i = 0; // 索引
  let start = 0; // 记录开始时间
  let done = false; // 控制是否结束
  let oldtime = 0; // 上一次是什么时间运行的
  let elapsed = 0; // 总共需转时长
  let distance = 0; // 目前已转时长

  function loop(timestamp) {
    if (!timestamp) {
      // 没有时间戳说明还没进loop
      activedRef.value = 1;
    }
    if (!start && timestamp) {
      // 第一次loop
      start = timestamp;
      oldtime = start;
    }
    if (start && timestamp) {
      elapsed = timestamp - start;
    }
    if (elapsed > duration && activedRef.value === target) {
      // 总时长大于已转时长且当前转动至目标，退出循环
      done = true;
    } else if (elapsed > duration * (3 / 4)) {
      // 总时长过去3/4开始放慢速度
      speed = 300;
    } else {
      speed = 100;
    }
    if (oldtime) {
      distance = timestamp - oldtime;
    }
    if (!done) {
      if (distance > speed) {
        i = i === nums.length - 1 ? 0 : i + 1;
        activedRef.value = nums[i];
        oldtime = timestamp;
      }
      l = window.requestAnimationFrame(loop);
    } else {
      window.cancelAnimationFrame(l);
      l = null;
      if (callback) {
        setTimeout(() => {
          callback(); // 停一会弹抽奖结果
        }, 888);
      }
    }
  }
  loop();
}