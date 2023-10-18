const e=JSON.parse('{"key":"v-def9c346","path":"/posts/node/Koa%E5%92%8CExpress%E6%9C%89%E5%85%B3%E6%B4%8B%E8%91%B1%E6%A8%A1%E5%9E%8B%E5%AF%B9%E6%AF%94%E5%8F%8A%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.html","title":"Koa和Express有关洋葱模型对比及源码解析","lang":"zh-CN","frontmatter":{"date":"2023-04-26T00:00:00.000Z","category":["node"],"tag":["node"]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"洋葱模型","slug":"洋葱模型","link":"#洋葱模型","children":[{"level":3,"title":"同步代码","slug":"同步代码","link":"#同步代码","children":[]},{"level":3,"title":"小结","slug":"小结","link":"#小结","children":[]},{"level":3,"title":"异步代码","slug":"异步代码","link":"#异步代码","children":[]},{"level":3,"title":"小结","slug":"小结-1","link":"#小结-1","children":[]}]},{"level":2,"title":"洋葱模型源码解析","slug":"洋葱模型源码解析","link":"#洋葱模型源码解析","children":[{"level":3,"title":"express的next方法实现：","slug":"express的next方法实现","link":"#express的next方法实现","children":[]},{"level":3,"title":"Koa2：","slug":"koa2","link":"#koa2","children":[]}]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":5.65,"words":1695},"filePathRelative":"posts/node/Koa和Express有关洋葱模型对比及源码解析.md","localizedDate":"2023年4月26日","excerpt":"<h1> Koa和Express有关洋葱模型对比及源码解析</h1>\\n<h2> 前言</h2>\\n<p>express和koa都是基于nodejs的比较主流的两种web框架，express内置了很多中间件，而相对来说koa则更加轻量。</p>\\n<p>但对于异步处理，express用的是回调函数，koa1采用generator+yield，koa2采用异步终极解决方案async/await；通常我们说的koa就是指Koa2。</p>\\n<h2> 洋葱模型</h2>\\n<p>\\n洋葱模型的意思就是：每一层洋葱皮都相当于一个中间件，进入时穿过多少层，出来时就还得原路返回穿过这些层，koa中间件的执行顺序就符合这个洋葱模型。</p>"}');export{e as data};
