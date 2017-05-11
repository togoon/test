// React
var cx = require('classnames');
var React = require('react');
var ReactDOM = require('react-dom');
var Tree = require('react-ui-tree');

import 'react-ui-tree/dist/react-ui-tree.css'
// import 'react-ui-tree/example/theme.less'
// import 'react-ui-tree/example/app.less'

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

  renderNode(node) {
    return (
      <span className={cx('node', {
        'is-active': node === this.state.active
        })} onClick={this.onClickNode.bind(null, node)}>
        {node.module}
      </span>
    );
  },

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

  handleChange(tree) {
    this.setState({
      tree: tree
    });
  },

  updateTree() {
    var tree = this.state.tree;
    tree.children.push({module: 'test'});
    this.setState({
      tree: tree
    });
  }

});

ReactDOM.render(<App/>, document.getElementById('root'));
