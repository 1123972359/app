/**
 * 游戏进程
 *
 * [
 *  code: String,                                         // 唯一标识
 *  process: [                                            // 游戏进程
 *      {
 *          stage: String,                                // 舞台名称
 *          showVD: Boolean,                              // 是否展示立绘
 *          showTB: Boolean,                              // 是否展示对话框
 *          role: {
 *              roleId: {
 *                  roleId: Number,                       // 角色id
 *                  roleName: String,                     // 角色名称
 *                  roleImg: String,                      // 角色图片地址
 *              }
 *          },
 *          lines: [
 *              {
 *                  appearance: Boolean,                  // 是否展示立绘
 *                  roleId: Number,                       // 角色id
 *                  roleApproachMode: String,             // 角色进场方式
 *                  text: String,                         // 台词
 *              }
 *          ]
 *      }
 *  ]
 * ]
 */
export let processIndex = 0;
export const setProcessIndex = (i) => {
  processIndex = i;
};
export const processData = {
  code: "hitman",
  process: [
    {
      stage: "初见",
      showVD: true,
      showTB: true,
      role: {
        1: {
          roleId: 1,
          roleName: "reborn",
          roleImg: "",
        },
        2: {
          roleId: 2,
          roleName: "泽田纲吉",
          roleImg: "",
        },
      },
      lines: [
        {
          appearance: true,
          roleId: 1,
          roleApproachMode: "right",
          text: "从今天开始，你就是彭格列第十代首领。",
        },
        {
          appearance: true,
          roleId: 2,
          roleApproachMode: "left",
          text: "别开玩笑了，小朋友，你爸爸妈妈呢？",
        },
        {
          appearance: true,
          roleId: 1,
          roleApproachMode: "left",
          text: "（reborn跳起来，狠狠地给泽田纲吉来了一个爆栗）",
        },
        {
          appearance: true,
          roleId: 1,
          roleApproachMode: "right",
          text: "穿好衣服，准备上学了。",
        },
        {
          appearance: true,
          roleId: 2,
          roleApproachMode: "left",
          text: "为什么你就开始监督我了",
        },
        {
          appearance: false,
          roleId: 1,
          roleApproachMode: "right",
          text: "快点，走了！",
        },
      ],
    },
    {
      stage: "遇见",
      showVD: true,
      showTB: true,
      role: {
        3: {
          roleId: 3,
          roleName: "狱寺凖人",
          roleImg: "",
        },
        2: {
          roleId: 2,
          roleName: "泽田纲吉",
          roleImg: "",
        },
      },
      lines: [
        {
          appearance: true,
          roleId: 2,
          roleApproachMode: "left",
          text: "（哇，这个人看着好凶啊）",
        },
        {
          appearance: true,
          roleId: 3,
          roleApproachMode: "right",
          text: "（眉头一皱）谁？",
        },
        {
          appearance: true,
          roleId: 2,
          roleApproachMode: "left",
          text: "不好意思！！！",
        },
      ],
    },
  ],
};
