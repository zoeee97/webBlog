import{_ as t,X as o,Y as l,$ as s,a0 as n,a1 as e,Z as p,C as c}from"./framework-1e167b4e.js";const i={},r=p(`<h1 id="vue-node项目打包优化并部署上线-nginx配置" tabindex="-1"><a class="header-anchor" href="#vue-node项目打包优化并部署上线-nginx配置" aria-hidden="true">#</a> vue+node项目打包优化并部署上线+nginx配置</h1><h2 id="一、配置config-js进行vue打包优化配置" tabindex="-1"><a class="header-anchor" href="#一、配置config-js进行vue打包优化配置" aria-hidden="true">#</a> 一、配置config.js进行vue打包优化配置</h2><p>用到的优化手段有：cdn加速、公共代码抽离、代码压缩、图片文件压缩。 因此需要先下载的依赖有：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//代码压缩
<span class="token function">npm</span> <span class="token function">install</span> uglifyjs-webpack-plugin --save-dev
//图片压缩
<span class="token function">npm</span> <span class="token function">install</span> image-webpack-loader --save-dev 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总的config.js配置文件如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> UglifyJsPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;uglifyjs-webpack-plugin&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 是否为生产环境</span>
<span class="token keyword">const</span> isProduction <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 本地环境是否需要使用cdn</span>
<span class="token keyword">const</span> devNeedCdn <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token comment">// cdn链接</span>
<span class="token keyword">const</span> cdn <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// cdn：资源名:外部引入名（外部引入名由模块自身决定，不可更改）</span>
    <span class="token literal-property property">externals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;vue&#39;</span><span class="token operator">:</span> <span class="token string">&#39;Vue&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;vue-router&#39;</span><span class="token operator">:</span> <span class="token string">&#39;VueRouter&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;axios&#39;</span><span class="token operator">:</span> <span class="token string">&#39;axios&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;lodash&#39;</span><span class="token operator">:</span> <span class="token string">&#39;_&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// cdn的css链接</span>
    <span class="token literal-property property">css</span><span class="token operator">:</span> <span class="token punctuation">[</span>

    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// cdn的js链接</span>
    <span class="token literal-property property">js</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&#39;https://cdn.bootcss.com/vue/2.6.11/vue.min.js&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;https://cdn.bootcss.com/vue-router/3.2.0/vue-router.min.js&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;https://cdn.bootcss.com/axios/1.3.4/axios.min.js&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js&#39;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">assetsDir</span><span class="token operator">:</span> <span class="token string">&#39;static&#39;</span><span class="token punctuation">,</span>     <span class="token comment">//  outputDir的静态资源目录</span>
  <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;./&#39;</span><span class="token punctuation">,</span>   <span class="token comment">// 静态资源路径（默认/</span>
  <span class="token literal-property property">productionSourceMap</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">//不输出map文件</span>
  <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token parameter">config</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 发布模式</span>
    config<span class="token punctuation">.</span><span class="token function">plugin</span><span class="token punctuation">(</span><span class="token string">&#39;html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token parameter">args</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 生产环境或本地需要cdn时，才注入cdn</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isProduction <span class="token operator">||</span> devNeedCdn<span class="token punctuation">)</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>cdn <span class="token operator">=</span> cdn
        <span class="token keyword">return</span> args
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 图片压缩</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&#39;prefetch&#39;</span><span class="token punctuation">)</span>
    config<span class="token punctuation">.</span>module<span class="token punctuation">.</span><span class="token function">rule</span><span class="token punctuation">(</span><span class="token string">&#39;images&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpe?g|gif|svg)(\\?.*)?$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">&#39;image-webpack-loader&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span><span class="token string">&#39;image-webpack-loader&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">bypassOnDebug</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token function-variable function">configureWebpack</span><span class="token operator">:</span> <span class="token parameter">config</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isProduction <span class="token operator">||</span> devNeedCdn<span class="token punctuation">)</span> config<span class="token punctuation">.</span>externals <span class="token operator">=</span> cdn<span class="token punctuation">.</span>externals
    <span class="token comment">// 代码压缩</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>
        <span class="token keyword">new</span> <span class="token class-name">UglifyJsPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">uglifyOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token comment">//生产环境自动删除console</span>
                <span class="token literal-property property">compress</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">drop_debugger</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">drop_console</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">pure_funcs</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;console.log&#39;</span><span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">sourceMap</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token literal-property property">parallel</span><span class="token operator">:</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>

    <span class="token comment">// 公共代码抽离</span>
    config<span class="token punctuation">.</span>optimization <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">splitChunks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">cacheGroups</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">vendor</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token string">&#39;all&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;vendor&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">minChunks</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">maxInitialRequests</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">minSize</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token number">100</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">common</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token string">&#39;all&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\\\/]src[\\\\/]js[\\\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;common&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">minChunks</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">maxInitialRequests</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">minSize</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token number">60</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">styles</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;styles&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(sa|sc|c)ss$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                    <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token string">&#39;all&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">enforce</span><span class="token operator">:</span> <span class="token boolean">true</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">runtimeChunk</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;manifest&#39;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 前端页面端口号配置</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">4000</span><span class="token punctuation">,</span>
    <span class="token comment">// 自动打开浏览器</span>
    <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 注意：打包后webpack在本地配置的代理服务器会失效！！</span>
    <span class="token literal-property property">proxy</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;你的后端接口地址&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">secure</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> 
        <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token string-property property">&#39;^/api&#39;</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cdn加速配置" tabindex="-1"><a class="header-anchor" href="#cdn加速配置" aria-hidden="true">#</a> CDN加速配置</h3><p><strong>首先要在index.html引入相应的cdn插件路径，对应config.js所配置的cdn链接</strong>，相应的模块名+链接都要配置。</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>index.html
<span class="token comment">&lt;!-- CDN JS --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.bootcdn.net/ajax/libs/axios/1.3.4/axios.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>config<span class="token punctuation">.</span>js
<span class="token keyword">const</span> cdn <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// cdn：资源名:外部引入名（外部引入名由模块自身决定，不可更改）</span>
    <span class="token literal-property property">externals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// cdn的css链接</span>
    <span class="token literal-property property">css</span><span class="token operator">:</span> <span class="token punctuation">[</span>

    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// cdn的js链接</span>
    <span class="token literal-property property">js</span><span class="token operator">:</span> <span class="token punctuation">[</span>
       
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),u={href:"https://www.bootcdn.cn/",target:"_blank",rel:"noopener noreferrer"},d=s("strong",null,"之后注释掉项目中相应资源的引入",-1),k=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// import Vue from &#39;vue&#39;;</span>
<span class="token comment">// import axios from &#39;axios&#39;;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码抽离" tabindex="-1"><a class="header-anchor" href="#代码抽离" aria-hidden="true">#</a> 代码抽离</h3><p>将代码分离到不同的bundle中，之后可以按需加载或并行加载这些文件。 默认情况所有js代码在首页都会全部加载，就会影响首屏加载速度；代码抽离就可以分出更小粒度的bundle，控制资源加载的优先级。 因为webpack默认已经安装和集成了splitChunksPlugin，所以直接配置即可，详情看之前的config.js中的配置。</p><h3 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h3><p>最后npm run build打包得到dist文件夹，再在本地浏览器中打开index.html，如果页面正常显示则说明成功了。</p><h2 id="二、项目上传到服务器" tabindex="-1"><a class="header-anchor" href="#二、项目上传到服务器" aria-hidden="true">#</a> 二、项目上传到服务器</h2><p>后端node项目直接上传整个文件夹到服务器，前端项目则只上传dist文件夹。 之后服务器和宝塔面板安全组都要开放对应的前端页面端口和后端端口。</p><p>在宝塔面板-网站处添加Node项目。</p><h2 id="三、nginx配置代理" tabindex="-1"><a class="header-anchor" href="#三、nginx配置代理" aria-hidden="true">#</a> 三、nginx配置代理</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server
    <span class="token punctuation">{</span>
        <span class="token comment"># 用于监听的端口,配置为原vue项目启动端口</span>
        listen <span class="token number">8021</span><span class="token punctuation">;</span>
        server_name localhost<span class="token punctuation">;</span>
        <span class="token comment"># 项目首页</span>
        index index.html index.htm index.php<span class="token punctuation">;</span>
        root /www/server/tomcat/webapps<span class="token punctuation">;</span>
        <span class="token comment">#root  /www/server/phpmyadmin;</span>
            location ~ /tmp/ <span class="token punctuation">{</span>
                <span class="token builtin class-name">return</span> <span class="token number">403</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token comment">#error_page   404   /404.html;</span>
        include enable-php.conf<span class="token punctuation">;</span>
        
        <span class="token comment">#监听路由名</span>
        location /chart-demo
        <span class="token punctuation">{</span>
          <span class="token comment">#vue包所在目录</span>
          <span class="token builtin class-name">alias</span> /www/server/tomcat/webapps/chart-demo/dist<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment"># 代理名称</span>
        location /api
        <span class="token punctuation">{</span>
          <span class="token comment"># 目标URL</span>
          proxy_pass  http://127.0.0.1:8082/api<span class="token punctuation">;</span>
          <span class="token comment"># 发送域名</span>
          <span class="token comment">#proxy_set_header Host www.xxx.com;</span>
        	<span class="token comment"># 内容替换</span>
        	<span class="token comment">#sub_filter &quot;/api&quot; &quot;&quot;;</span>
        <span class="token punctuation">}</span>

        access_log  /www/wwwlogs/access.log<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token comment"># nginx配置文件所在路径</span>
include /www/server/panel/vhost/nginx/*.conf<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),v={href:"http://xn--ip-fr5c86lx7z:8021/chart-demo/",target:"_blank",rel:"noopener noreferrer"};function m(b,g){const a=c("ExternalLinkIcon");return o(),l("div",null,[r,s("p",null,[n("相应插件的路径可以去"),s("a",u,[n("CDN官网"),e(a)]),n("查找。 "),d]),k,s("p",null,[n("用Nginx配置代理如上文，像我这里的配置，我直接访问"),s("a",v,[n("http://服务器ip:8021/chart-demo/"),e(a)]),n(" 就可以访问到我们前端项目。proxy_pass配置和vue项目中的proxy里的target地址一样即可。")])])}const h=t(i,[["render",m],["__file","项目打包优化并部署上线.html.vue"]]);export{h as default};
