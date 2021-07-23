/**
 * 过场动画
 */
function CSSEnd() {
  const el = document.createElement("surface");
  const transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
  };

  for (let t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

const id = "CROSS_ID";
const setEnd = CSSEnd();
const indexObj = {
  start: 500,
  end: -1,
};

/**
 * 主类: 过场动画
 */
class CrossStage {
  constructor() {
    this.cross = null;
    this.conf = [{}, {}, {}, {}];
    this.endNum = 0;
    this.callback = null;
  }

  // 初始化
  init() {
    const cross = {};
    cross.dom = this.create();
    cross.dom.addEventListener(setEnd, () => {
      this.endNum++;
      if (this.endNum / 2 === this.conf.length) {
        this.endNum = 0;
        this.callback && this.callback();
      }
    });
    this.cross = cross;
    return cross;
  }

  setIndex(type = "start") {
    this.cross.dom.style.zIndex = indexObj[type];
  }

  // 检查是否已初始化
  inspect() {
    if (!this.cross) {
      this.init();
    }
  }

  // 进入转场
  in(callback) {
    if (this.endNum > 0) return;
    this.inspect();
    this.setIndex("start");
    this.cross.dom.classList.replace("hide", "show");
    this.callback = callback;
  }

  // 离开转场
  out(callback) {
    if (this.endNum > 0) return;
    this.inspect();
    this.setIndex("start");
    this.cross.dom.classList.replace("show", "hide");
    this.callback = () => {
      this.setIndex("end");
      callback && callback();
    };
  }

  // 创建节点
  create() {
    const query = document.querySelector("#" + id);
    if (query) {
      return query;
    }
    let div = document.createElement("div");
    div.className = "cross-stage-wrap hide";
    div.id = id;
    const items = [];
    for (let i = 0; i < this.conf.length; i++) {
      items.push(`
        <div class="cross-stage-item"></div>
      `);
    }
    div.innerHTML = items.join("");
    document.body.appendChild(div);
    return div;
  }
}

export const cross = new CrossStage();

cross.init();
