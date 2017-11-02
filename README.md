
#### 技术栈

react + react-router + redux  + postcss + ES6/7 + webpack + fetch + immutable.js

> demo的服务器有时候是有问题，需要多刷新几次，我已经在alert里面阐明了问题。因为是测试环境。
>

#### 项目使用

```shell
git clone https://github.com/web-Marker/react.git
cd react
npm install
node server.js
浏览器访问: http://localhost:8883
npm run production 发布命令 需要配置绝对地址域名 具体参考webpack.config.js
```

#### 环境

> 本项目主要理解 react 和 redux 的原理，以及 react + redux 之间的配合方式，写一遍可以了解redux的数据传递机制。

> 开发环境 macOS 10.12  Chrome 61.0.3163.100 nodejs 8.4.0

#### 针对redux最适合的框架react的总结

##### react是干啥的

​	React 创造了虚拟dom并且将它们储存起来，每当状态发生变化的时候就会创造新的虚拟节点和以前的进行对比，让变化的部分进行渲染。整个过程没有对dom进行获取和操作，只有一个渲染的过程，所以react说是一个ui框架。

##### 怎么玩react


​	单独用react也行，数据层次不多的项目可以舍弃redux，如果不需要多单页面应用可以舍弃router，如果不想用node的热更新，可以舍弃node，webpack不想用，那就不能用es6/7，babel。只能用ES5并且页面引入react库。~~~这是最基本的玩法，纯加载react+jsx。不过你能找到github上面来，相信不是我说的这种低级需求了，最好全部你都要玩一遍，这样才算入了react家族的门。接着需要玩按需加载，react的单元测试，还有一个Immutable.js 优化redux写法的库，后期都要集成进来。

##### react

	react是干啥的

​	React 创造了虚拟dom并且将它们储存起来，每当状态发生变化的时候就会创造新的虚拟节点和以前的进行对比，让变化的部分进行渲染。整个过程没有对dom进行获取和操作，只有一个渲染的过程，所以react说是一个ui框架。

	react的 Diff算法

​	react的diff算法用在什么地方呢？当组件更新的时候，react会创建一个新的虚拟dom树并且会和之前储存的dom树进行比较，这个比较多过程就用到了diff算法，所以组件初始化的时候是用不到的。react提出了一种假设，相同的节点具有类似的结构，而不同的节点具有不同的结构。在这种假设之上进行逐层的比较，如果发现对应的节点是不同的，那就直接删除旧的节点以及它所包含的所有子节点然后替换成新的节点。如果是相同的节点，则只进行属性的更改。

对于列表的diff算法稍有不同，因为列表通常具有相同的结构，在对列表节点进行删除，插入，排序的时候，单个节点的整体操作远比一个个对比一个个替换要好得多，所以在创建列表的时候需要设置key值，这样react才能分清谁是谁。当然不写key值也可以，但这样通常会报出警告，通知我们加上key值以提高react的性能。

![diff](https://ws2.sinaimg.cn/large/006tKfTcgy1fkowxksbn9j30kg0bdaae.jpg)



#### 组件的生命周期



#### ![react-lifecycle](https://ws1.sinaimg.cn/large/006tKfTcgy1fkox1s7k0oj31kw1ns405.jpg)

**组件在初始化时会触发5个钩子函数：**

**1、getDefaultProps()**

> 设置默认的props，也可以用dufaultProps设置组件的默认属性。

**2、getInitialState()**

> 在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props。

**3、componentWillMount()**

> 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。

**4、 render()**

> react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。

**5、componentDidMount()**

> 组件渲染之后调用，可以通过this.getDOMNode()获取和操作dom节点，只调用一次。

**在更新时也会触发5个钩子函数：**

**6、componentWillReceivePorps(nextProps)**

> 组件初始化时不调用，组件接受新的props时调用。

**7、shouldComponentUpdate(nextProps, nextState)**

> react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候。不过调用this.forceUpdate会跳过此步骤。

**8、componentWillUpdate(nextProps, nextState)**

> 组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state

**9、render()**

> 不多说

**10、componentDidUpdate()**

> 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。

还有一个卸载钩子函数

**11、componentWillUnmount()**

> 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

以上可以看出来react总共有10个周期函数（render重复一次），这个10个函数可以满足我们所有对组件操作的需求，利用的好可以提高开发效率和组件性能。



#### React-Router路由

还没玩过的可以参考阮一峰老师的日志 <http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu> 

以下是demo中Router的部分,充分利用了按需加载的特性,优化了性能。

```javascript
import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRedirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const Index = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/index').default)
    },'index')
}

const Card = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/card').default)
    },'card')
}

const history = process.env.NODE_ENV !== 'development' ? hashHistory : browserHistory;

const RouteConfig = (
	<Router history={history}>
		<Route path="/" component={Roots}>
			<IndexRoute getComponent={Index}/>
			<IndexRedirect to="/index" />
			<Route path="index" getComponent={Index} />
			<Route path="card" getComponent={Card} />
			<Route path="nocard" getComponent={NoCard} />
			<Route path="release" getComponent={Release} />
			<Route path="mycard" getComponent={MyCard} />
		</Route>
	</Router>
)
```

getComponent 载入组件属于动态加载，默认如果没有这个动态加载的需求可以component。需要在webpack配置chunkFilename。

require.ensure是webpack里面按需加载的一个方法，后面的点default是兼容ES6的导出export导出方式。

#### redux

首先，redux并不是必须的，它的作用相当于在顶层组件之上又加了一个组件，作用是进行逻辑运算、储存数据和实现组件尤其是顶层组件的通信。如果组件之间的交流不多，逻辑不复杂，只是单纯的进行视图的渲染，这时候用回调，context就行，没必要用redux，用了反而影响开发速度。但是如果组件交流特别频繁，逻辑很复杂，那redux的优势就特别明显了。我第一次做react项目的时候并没有用redux，所有的逻辑都是在组件内部实现，当时为了实现一个逻辑比较复杂的购物车，洋洋洒洒居然写了800多行代码，回头一看我自己都不知道写的是啥，画面太感人。

先简单说一下redux和react是怎么配合的。react-redux提供了connect和Provider两个好基友，它们一个将组件与redux关联起来，一个将store传给组件。组件通过dispatch发出action，store根据action的type属性调用对应的reducer并传入state和这个action，reducer对state进行处理并返回一个新的state放入store，connect监听到store发生变化，调用setState更新组件，此时组件的props也就跟着变化。

##### 流程是这个样子的

![WechatIMG2](https://ws4.sinaimg.cn/large/006tNc79gy1fkui132lukj30nl0cidgv.jpg)

值得注意的是connect，Provider，mapStateToProps,mapDispatchToProps是react-redux提供的，redux本身和react没有半毛钱关系，它只是数据处理中心，没有和react产生任何耦合，是react-redux让它们联系在一起。



#### 三部分组成：store，reducer，action。

**store**是一个对象，它有四个主要的方法：

**1、dispatch:**

> 用于action的分发——在createStore中可以用middleware中间件对dispatch进行改造，比如当action传入dispatch会立即触发reducer，有些时候我们不希望它立即触发，而是等待异步操作完成之后再触发，这时候用redux-thunk对dispatch进行改造，以前只能传入一个对象，改造完成后可以传入一个函数，在这个函数里我们手动dispatch一个action对象，这个过程是可控的，就实现了异步。

**2、subscribe：**

> 监听state的变化——这个函数在store调用dispatch时会注册一个listener监听state变化，当我们需要知道state是否变化时可以调用，它返回一个函数，调用这个返回的函数可以注销监听。 let unsubscribe = store.subscribe(() => {console.log('state发生了变化')})

**3、getState：**

> 获取store中的state——当我们用action触发reducer改变了state时，需要再拿到新的state里的数据，毕竟数据才是我们想要的。getState主要在两个地方需要用到，一是在dispatch拿到action后store需要用它来获取state里的数据，并把这个数据传给reducer，这个过程是自动执行的，二是在我们利用subscribe监听到state发生变化后调用它来获取新的state数据，如果做到这一步，说明我们已经成功了。

**4、replaceReducer:**

> 替换reducer，改变state修改的逻辑。

store可以通过createStore()方法创建，接受三个参数，经过combineReducers合并的reducer和state的初始状态以及改变dispatch的中间件，后两个参数并不是必须的。store的主要作用是将action和reducer联系起来并改变state。

**action:**

> action是一个对象，其中type属性是必须的，同时可以传入一些数据。action可以用actionCreactor进行创造。dispatch就是把action对象发送出去。

**reducer:**

> reducer是一个函数，它接受一个state和一个action，根据action的type返回一个新的state。根据业务逻辑可以分为很多个reducer，然后通过combineReducers将它们合并，state树中有很多对象，每个state对象对应一个reducer，state对象的名字可以在合并时定义。

像这个样子：

```
const reducer = combineReducers({
     a: doSomethingWithA,
     b: processB,
     c: c
})
```

**combineReducers:**

> 其实它也是一个reducer，它接受整个state和一个action，然后将整个state拆分发送给对应的reducer进行处理，所有的reducer会收到相同的action，不过它们会根据action的type进行判断，有这个type就进行处理然后返回新的state，没有就返回默认值，然后这些分散的state又会整合在一起返回一个新的state树。

接下来分析一下整体的流程，首先调用store.dispatch将action作为参数传入，同时用getState获取当前的状态树state并注册subscribe的listener监听state变化，再调用combineReducers并将获取的state和action传入。combineReducers会将传入的state和action传给所有reducer，reducer会根据state的key值获取与自己对应的state，并根据action的type返回新的state，触发state树的更新，我们调用subscribe监听到state发生变化后用getState获取新的state数据。

redux的state和react的state两者完全没有关系，除了名字一样。

#### react-redux

如果只使用redux，那么流程是这样的：

> component --> dispatch(action) --> reducer --> subscribe --> getState --> component

用了react-redux之后流程是这样的：

> component --> actionCreator(data) --> reducer --> component

store的三大功能：dispatch，subscribe，getState都不需要手动来写了。react-redux帮我们做了这些，同时它提供了两个好基友Provider和connect。

**Provider**是一个组件，它接受store作为props，然后通过context往下传，这样react中任何组件都可以通过context获取store。也就意味着我们可以在任何一个组件里利用dispatch(action)来触发reducer改变state，并用subscribe监听state的变化，然后用getState获取变化后的值。但是并不推荐这样做，它会让数据流变的混乱，过度的耦合也会影响组件的复用，维护起来也更麻烦。

**connect --connect(mapStateToProps, mapDispatchToProps, mergeProps, options)** 是一个函数，它接受四个参数并且再返回一个函数--wrapWithConnect，wrapWithConnect接受一个组件作为参数wrapWithConnect(component)，它内部定义一个新组件Connect(容器组件)并将传入的组件(ui组件)作为Connect的子组件然后return出去。

所以它的完整写法是这样的：connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(component)

**mapStateToProps(state, [ownProps])：**

> mapStateToProps 接受两个参数，store的state和自定义的props，并返回一个新的对象，这个对象会作为props的一部分传入ui组件。我们可以根据组件所需要的数据自定义返回一个对象。ownProps的变化也会触发mapStateToProps

```
function mapStateToProps(state) {
   return { todos: state.todos };
}
```

**mapDispatchToProps(dispatch, [ownProps])：**

> mapDispatchToProps如果是对象，那么会和store绑定作为props的一部分传入ui组件。如果是个函数，它接受两个参数，bindActionCreators会将action和dispatch绑定并返回一个对象，这个对象会和ownProps一起作为props的一部分传入ui组件。所以不论mapDispatchToProps是对象还是函数，它最终都会返回一个对象，如果是函数，这个对象的key值是可以自定义的

```
function mapDispatchToProps(dispatch) {
   return {
      todoActions: bindActionCreators(todoActionCreators, dispatch),
      counterActions: bindActionCreators(counterActionCreators, dispatch)
   };
}
```

mapDispatchToProps返回的对象其属性其实就是一个个actionCreator，因为已经和dispatch绑定，所以当调用actionCreator时会立即发送action，而不用手动dispatch。ownProps的变化也会触发mapDispatchToProps。

**mergeProps(stateProps, dispatchProps, ownProps)：**

> 将mapStateToProps() 与 mapDispatchToProps()返回的对象和组件自身的props合并成新的props并传入组件。默认返回 Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。

**options：**

> pure = true 表示Connect容器组件将在shouldComponentUpdate中对store的state和ownProps进行浅对比，判断是否发生变化，优化性能。为false则不对比。

其实connect函数并没有做什么，大部分的逻辑都是在它返回的wrapWithConnect函数内实现的，确切的说是在wrapWithConnect内定义的Connect组件里实现的。



<<<<<<< HEAD
=======
#### 最后说一下我玩react的心得

1. 实践，从0开始。
2. 刚开始别玩什么router,redux,热加载之类的(有一句话很经典，如果你不知道是否需要 Redux，那就是不需要它)，不需要的场景用了反而是累赘。
3. react熟了,开始玩router吧，最后是结合redux，基本的全家桶会了。开始使用react延伸产品吧，让我们骑着猪也可以去旅行。
4. 优化webpack配置加载，很重要，减少开发时间。
5. 最后一点，往死里逼自己，写。
6. 交流微信：

![code](https://ws3.sinaimg.cn/large/006tKfTcgy1fkoxwvn61xj30cj0cvdmi.jpg)
>>>>>>> 2f2ba3060350c45f7b7fe3297fbc3b8e86bfb7a9
