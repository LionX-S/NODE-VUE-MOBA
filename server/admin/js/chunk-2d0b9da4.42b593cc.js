(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9da4"],{"355a":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("h1",[e._v("管理员列表")]),n("el-table",{attrs:{data:e.items}},[n("el-table-column",{attrs:{prop:"id",label:"ID",width:"220"}}),n("el-table-column",{attrs:{prop:"username",label:"用户名"}}),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return e.$router.push("/admin_users/edit/"+t.row.id)}}},[e._v("编辑 ")]),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return e.remove(t.row)}}},[e._v("删除 ")])]}}])})],1)],1)},a=[],s=(n("96cf"),n("1da1")),c={name:"ItemList",data:function(){return{items:[]}},methods:{fetch:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("rest/admin_users");case 2:n=t.sent,200==n.data.code?e.items=n.data.result:e.$message({type:"error",message:n.data.message});case 4:case"end":return t.stop()}}),t)})))()},remove:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.$confirm('确定删除用户"'.concat(e.username,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$http.delete("rest/admin_users/".concat(e.id));case 2:r=n.sent,200==r.data.code&&(t.$message({type:"success",message:r.data.message}),t.fetch());case 4:case"end":return n.stop()}}),n)}))));case 1:case"end":return n.stop()}}),n)})))()}},created:function(){this.fetch()}},u=c,i=n("2877"),o=Object(i["a"])(u,r,a,!1,null,"2f109959",null);t["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d0b9da4.42b593cc.js.map