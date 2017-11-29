// React 
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

autorun(() => {
    console.log(message.likes.length);
})

message.likes.push("Jennifer");
message.likes[2] = 'haha' // 这里虽然length没有改变，但因为数组改变了，所以仍然会react
