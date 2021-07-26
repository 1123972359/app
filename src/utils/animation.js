/**
 * 动画-贫穷版
 *  # 未完成点：运动曲线
 *  链式操作，设置动画之后必须调用.step()
 *      display: inline-block | block
 *      position: relative | absolute
 *  @config
 *      el {HTML}
 *      duration {Number}
 *  @event
 *      移动
 *          move(x: Number, y: Number)
 *          left(x: Number)
 *          top(y: Number)
 *      旋转
 *          rotate(deg: Number)
 *      缩放
 *          scale(n: Number)
 *      执行
 *          step({ times: Number, callback: Function })
 *              times {Number} 临时的动画时间
 *          # 重点，必须调用，将此方法前的动画都组合起来
 */
let id = 1;
class Animation {
  constructor(config) {
    this.el = config.el;
    this.duration = config.duration || 1000;
    this._tempDuration = "";
    this._dispatchStack = [{ id, dispatch: [], callback: () => {} }];
    this._locking = false;
  }

  _formatter(str) {
    const s = typeof str === "string" ? str.split("px")[0] : str;
    return s ? Number(s) : 0;
  }

  _min(...rest) {
    return Math.min(...rest);
  }

  _max(...rest) {
    return Math.max(...rest);
  }

  _execTransform(name, r) {
    const reg = new RegExp(r);
    return reg.exec(this.el.style.transform);
  }

  _getTransform(name, r) {
    const exec = this._execTransform(name, r);
    const data = exec ? exec[1] : 0;
    return data;
  }

  _getCur() {
    return {
      translateX: () =>
        this._formatter(this.el.offsetLeft || this.el.style.left),
      translateY: () => this._formatter(this.el.offsetTop || this.el.style.top),
      rotate: () =>
        Number(this._getTransform("rotate", `rotate\\((\\d+)deg\\)`)),
      scale: () => Number(this._getTransform("scale", `scale\\((\\d+)\\)`)),
    };
  }

  // 执行
  _mutations({ name, data }) {
    return {
      translateX: () => (this.el.style.left = `${data}px`),
      translateY: () => (this.el.style.top = `${data}px`),
      rotate: () => {
        const handle = ` rotate(${Math.round(data)}deg) `;
        const exec = this._execTransform("rotate", `rotate\\((\\d+)deg\\)`);
        if (exec) {
          return this.el.style.transform.replace(exec[0], handle);
        }
        return (this.el.style.transform += handle);
      },
      scale: () => {
        const handle = ` scale(${Number(data.toFixed(2))}) `;
        const exec = this._execTransform("scale", `scale\\((.*)\\)`);
        if (exec) {
          return this.el.style.transform.replace(exec[0], handle);
        }
        return (this.el.style.transform += " scale(1) ");
      },
    }[name];
  }

  // 派遣
  _dispatch() {
    let start;
    const duration = this._tempDuration;
    const curList = this._getCur();
    const step = (timestamp) => {
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      let transform = "";
      this._dispatchStack[0].dispatch.forEach((item) => {
        const cur = curList[item.name]();
        // 动画时间内每次执行的数量
        const exceNum = Math.abs(item.pos - cur) / duration;
        // 下一次执行之后的位置，以元素本身的位置，比较是加还是减
        const nextPos =
          item.pos > cur ? cur + exceNum * elapsed : cur - exceNum * elapsed;
        // 设置数据，如果是加法就取最小值，减法就取最大值
        const data =
          item.pos > cur
            ? this._min(nextPos, item.pos)
            : this._max(nextPos, item.pos);
        // 区分模式
        if (/translate/.test(item.name)) {
          this._mutations({ name: item.name, data })();
        } else {
          transform = this._mutations({ name: item.name, data })();
        }
      });
      if (elapsed < duration) {
        if (transform) {
          this.el.style.transform = transform;
        }
        window.requestAnimationFrame(step);
      } else {
        // 结束动画
        console.log("结束动画");
        this._dispatchStack[0].callback();
        this._dispatchStack.shift();
        this._locking = false;
        if (this._dispatchStack.length > 1) {
          this._dispatch();
        }
      }
    };
    window.requestAnimationFrame(step);
  }

  left(x = "") {
    if (x === "") {
      throw new Error("a property is missing: x");
    }
    this._dispatchStack[this._dispatchStack.length - 1].dispatch.push({
      name: "translateX",
      pos: Number(x),
    });
    return this;
  }

  top(y = "") {
    if (!y) {
      throw new Error("a property is missing: y");
    }
    this._dispatchStack[this._dispatchStack.length - 1].dispatch.push({
      name: "translateY",
      pos: Number(y),
    });
    return this;
  }

  move(...rest) {
    if (rest.length === 0) {
      return this;
    }
    if (rest.length === 1) {
      this.left(rest[0]);
      this.top(rest[0]);
      return this;
    }
    this.left(rest[0]);
    this.top(rest[1]);
    return this;
  }

  rotate(deg) {
    if (!deg) {
      throw new Error("a property is missing: deg");
    }
    this._dispatchStack[this._dispatchStack.length - 1].dispatch.push({
      name: "rotate",
      pos: Number(deg),
    });
    return this;
  }

  scale(n) {
    if (!n) {
      throw new Error("a property is missing: n");
    }
    this._dispatchStack[this._dispatchStack.length - 1].dispatch.push({
      name: "scale",
      pos: Number(n),
    });
    return this;
  }

  step({ times = "", callback = () => {} } = {}) {
    this._dispatchStack[this._dispatchStack.length - 1].callback = callback;
    this._dispatchStack.push({ id: id++, dispatch: [], callback: () => {} });
    if (!this._locking) {
      this._locking = true;
      this._tempDuration = times || this.duration;
      this._dispatch();
    }
    return this;
  }
}

export const createAnimation = (config) => {
  if (typeof config !== "object") {
    throw new Error("config should be a object");
  }
  if (!Object.prototype.hasOwnProperty.call(config, "el")) {
    throw new Error("a property is missing: el");
  }
  if (
    !/[object HTML\w+Element]/.test(Object.prototype.toString.call(config.el))
  ) {
    throw new Error("el should be a el");
  }
  return new Animation(config);
};
