// React 
import { observable, autorun, 
} from 'mobx'
import _ from 'lodash'

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
  console.log(_.get(message, 'author.name'))
})

message.author.name = "Sara" // react
message.author.name = "Sara" // 值没有真正改变，不react
message.author = 'haha' // react
message.author = {name:'heihei'} // react

