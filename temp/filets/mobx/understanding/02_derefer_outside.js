// React 
/*
 * 如果将引用的操作提到autorun之外，则不会react
 */
import { observable, autorun, 
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

var title = message.title; // 引用放到了外面，无法autorun
autorun(() => console.log(title))
message.title = "Bar"
