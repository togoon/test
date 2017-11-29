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

const author = message.author;
autorun(() => {
    console.log(author.name)
})
message.author.name = "Sara"; // react
message.author = { name: "John" }; // 不react
