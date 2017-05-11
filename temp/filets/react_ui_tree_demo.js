// React
var cx = require('classnames');
var React = require('react');
var ReactDOM = require('react-dom');

/*
 * 整个库就一个Tree组件对象
 */
import Tree from 'react-ui-tree'

/*
 * 这个库太简陋了，不引用它自己的css将无法执行展开和关闭的操作
 */
import 'react-ui-tree/dist/react-ui-tree.css' 

/*
 * 这是Tree需要的所有状态数据，也就是state
 * children, collapsed, leaf是关键字段（但个人感觉leaf字段是多余的吧）
 */
const tree = { 
  "module": "react-ui-tree",
  "children": [
    {
      "module": "dist",
      "collapsed": false,
      "children": [
        {
          "module": "node.js",
          "leaf": true
        },
        {
          "module": "react-ui-tree.css",
          "leaf": true
        },
        {
          "module": "react-ui-tree.js",
          "leaf": true
        },
        {
          "module": "tree.js",
          "leaf": true
        }
      ]
    },
    {
      "module": "example",
      "children": [
        {
          "module": "app.js",
          "leaf": true
        },
        {
          "module": "app.less",
          "leaf": true
        },
        {
          "module": "index.html",
          "leaf": true
        }
      ]
    },
    {
      "module": "lib",
      "children": [
        {
          "module": "node.js",
          "leaf": true
        },
        {
          "module": "react-ui-tree.js",
          "leaf": true
        },
        {
          "module": "react-ui-tree.less",
          "leaf": true
        },
        {
          "module": "tree.js",
          "leaf": true
        }
      ],
      "collapsed": false
    },
    {
      "module": ".gitiignore",
      "leaf": true
    },
    {
      "module": "index.js",
      "leaf": true
    },
    {
      "module": "LICENSE",
      "leaf": true
    },
    {
      "module": "Makefile",
      "leaf": true
    },
    {
      "module": "package.json",
      "leaf": true
    },
    {
      "module": "README.md",
      "leaf": true
    },
    {
      "module": "webpack.config.js",
      "leaf": true
    },
  ],
  "collapsed": false
}

var App = React.createClass({

  getInitialState() {
    return {
      active: null,
      tree: tree
    };
  },

  /*
   * renderNode函数，Tree需要一个对于node的render方法（很自然的需求）
   */
  renderNode(node) {
    return (
      <span className={cx('node', {
        'is-active': node === this.state.active
        })} onClick={this.onClickNode.bind(null, node)}>
        {node.module}
      </span>
    );
  },

  /*
   * 在renderNode中被调用
   */
  onClickNode(node) {
    this.setState({
      active: node
    });
  },

  render() {
    return (
      <div className="app">
        <div className="tree">
          <Tree
            paddingLeft={20}
            tree={this.state.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
        </div>
        <div className="inspector">
          <button onClick={this.updateTree}>update tree</button>
          <pre>
          {JSON.stringify(this.state.tree, null, '  ')}
          </pre>
         </div>
      </div>
    );
  },

  /*
   * 这相当于一个controlled component
   * 但不知道这里是否有坑，如果使用freezer的对象的话，数据是否会被破坏？
   */
  handleChange(tree) {
    this.setState({
      tree: tree
    });
  },

  /*
   * 演示更新Tree
   */
  updateTree() {
    var tree = this.state.tree;
    tree.children.push({module: 'test'});
    this.setState({
      tree: tree
    });
  }

});

ReactDOM.render(<App/>, document.getElementById('root'));
