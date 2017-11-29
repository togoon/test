// React 
/*
 * mobx的最普通的用法
 */
import { observable, autorun, 
  whyRun, // 仅作为一个调试的工具
} from 'mobx'

let message = observable({
  title: "Foo",
  author: {
    name: "Michel"
  },
  likes: [
    "John", "Sara"
  ]
})

autorun(() => { // 初始化的时候，会run一次
  console.log(message.title)
  whyRun()
})

// observable被改变引发autorun的react
message.title = "Bar"

// 注：以下代码不会引发react!!
message = observable({ title: "Bar" })
