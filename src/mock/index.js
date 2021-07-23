/**
 * 游戏进程
 *
 * [
 *  code: String,                               // 唯一标识
 *  process: [                                  // 游戏进程
 *      {
 *          stage: String,                      // 舞台名称
 *          role: [
 *              {
 *                  roleId: Number,             // 角色id
 *                  roleName: String,           // 角色名称
 *                  roleImg: String,            // 角色图片地址
 *              }
 *          ],
 *          lines: [
 *              {
 *                  roleId: Number,             // 角色id
 *                  rolePosition: String,       // 角色位置
 *                  text: String,               // 台词
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
      role: [
        {
          roleId: 1,
          roleName: "reborn",
          roleImg: "",
        },
        {
          roleId: 2,
          roleName: "泽田纲吉",
          roleImg: "",
        },
      ],
      lines: [
        {
          roleId: 1,
          rolePosition: "left",
          text: "从今天开始，你就是彭格列第十代首领。",
        },
        {
          roleId: 2,
          rolePosition: "right",
          text: "别开玩笑了，小朋友，你爸爸妈妈呢？",
        },
        {
          roleId: 1,
          rolePosition: "left",
          text: "（reborn跳起来，狠狠地给泽田纲吉来了一个爆栗）",
        },
      ],
    },
    {
      stage: "遇见",
      role: [
        {
          roleId: 3,
          roleName: "狱寺凖人",
          roleImg: "",
        },
        {
          roleId: 2,
          roleName: "泽田纲吉",
          roleImg: "",
        },
      ],
      lines: [
        {
          roleId: 2,
          rolePosition: "left",
          text: "（哇，这个人看着好凶啊）",
        },
        {
          roleId: 3,
          rolePosition: "right",
          text: "（眉头一皱）谁？",
        },
        {
          roleId: 2,
          rolePosition: "left",
          text: "不好意思！！！",
        },
      ],
    },
  ],
};
