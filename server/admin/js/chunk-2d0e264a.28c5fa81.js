(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e264a"],{"7f05":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"about"},[r("h1",[e._v("文章列表")]),r("el-table",{attrs:{data:e.items}},[r("el-table-column",{attrs:{prop:"id",label:"ID",width:"220"}}),r("el-table-column",{attrs:{prop:"title",label:"标题"}}),r("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.$router.push("/articles/edit/"+t.row.id)}}},[e._v("编辑 ")]),r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.remove(t.row)}}},[e._v("删除 ")])]}}])})],1)],1)},a=[],s=(r("96cf"),r("1da1")),c={name:"CategoryList",data:function(){return{items:[]}},methods:{fetch:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("rest/articles");case 2:r=t.sent,200==r.data.code?e.items=r.data.result:e.$message({type:"error",message:r.data.message});case 4:case"end":return t.stop()}}),t)})))()},remove:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$confirm('确定删除文章"'.concat(e.title,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.delete("rest/articles/".concat(e.id));case 2:n=r.sent,200==n.data.code&&(t.$message({type:"success",message:n.data.message}),t.fetch());case 4:case"end":return r.stop()}}),r)}))));case 1:case"end":return r.stop()}}),r)})))()}},created:function(){this.fetch()}},i=c,o=r("2877"),u=Object(o["a"])(i,n,a,!1,null,"42eae6f8",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0e264a.28c5fa81.js.map