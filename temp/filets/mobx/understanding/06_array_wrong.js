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
    console.log(message.likes[0]);
})

message.likes.push("Jennifer"); // 这种情况下又不会react
