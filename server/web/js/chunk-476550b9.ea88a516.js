(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-476550b9"],{1399:function(t,e,a){"use strict";var n=a("ef4a"),s=a.n(n);s.a},"3ad6":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.article?a("div",{staticClass:"page-article"},[a("div",{staticClass:"d-flex mt-3 pb-3 border-bottom"},[a("div",{staticClass:"iconfont icon-fanhui",on:{click:t.back}}),a("strong",{staticClass:"flex-1 pl-2"},[t._v(t._s(t.article.title))]),a("div",{staticClass:"text-grey fs-sm"},[t._v(t._s(t._f("date")(t.article.date)))])]),a("div",{staticClass:"px-3 body",domProps:{innerHTML:t._s(t.article.body)}}),t._m(0)]):t._e()},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"px-3 py-3 border-top"},[a("div",{staticClass:"d-flex ai-center"},[a("i",{staticClass:"iconfont icon-Menu"}),a("strong",{staticClass:"pl-2"},[t._v("相关资讯")])])])}],c=(a("96cf"),a("1da1")),i=a("5a0c"),r=a.n(i),o={name:"Article",props:{id:{required:!0}},data:function(){return{article:null}},methods:{fetch:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/articles/".concat(t.id));case 2:a=e.sent,200==a.data.code&&(t.article=a.data.result[0],console.log(t.article));case 4:case"end":return e.stop()}}),e)})))()},back:function(){this.$router.back()}},created:function(){this.fetch()},filters:{date:function(t){return r()(t).format("YYYY-MM-DD HH:mm:ss")}}},l=o,u=(a("1399"),a("2877")),d=Object(u["a"])(l,n,s,!1,null,null,null);e["default"]=d.exports},ef4a:function(t,e,a){}}]);
//# sourceMappingURL=chunk-476550b9.ea88a516.js.map