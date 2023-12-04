export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en: {
      hello: "Hello",
      doneSign: ".",
      introductionMyself: "I am zhilutianji , a Front-end developer.",
      findMeInGithub: "You can find me in Github:",
      findMeInLeetCode: "and sometimes I also solve problems on",
    },
    zh: {
      hello: "你好",
      doneSign: "。",
      introductionMyself: "我是 zhilutianji ， 一名前端开发者。",
      findMeInGithub: "你可以在 Github 找到我：",
      findMeInLeetCode: "有时候我也会在 LeetCode 上刷题：",
    },
  },
}));
