(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c9118"],{5821:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"about"},[a("h1",[e._v(e._s(e.id?"编辑":"新建")+"分类")]),a("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(t){return t.preventDefault(),e.save(t)}}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{model:{value:e.model.name,callback:function(t){e.$set(e.model,"name",t)},expression:"model.name"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("保存")])],1)],1)],1)},s=[],n=(a("96cf"),a("1da1")),c={name:"CategoryEdit",props:{id:{}},data:function(){return{model:{}}},methods:{save:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=6;break}return t.next=3,e.$http.put("rest/categories/".concat(e.id),e.model);case 3:a=t.sent,t.next=9;break;case 6:return t.next=8,e.$http.post("rest/categories",e.model);case 8:a=t.sent;case 9:200==a.data.code?(e.$router.push("/categories/list"),e.$message({type:"success",message:a.data.message})):e.$message({type:"error",message:a.data.message});case 10:case"end":return t.stop()}}),t)})))()},fetch:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("rest/categories/".concat(e.id));case 2:a=t.sent,200==a.data.code?e.model=a.data.result[0]:e.$message({type:"error",message:a.data.message});case 4:case"end":return t.stop()}}),t)})))()}},created:function(){this.id&&this.fetch()}},i=c,o=a("2877"),u=Object(o["a"])(i,r,s,!1,null,"68b37fd4",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0c9118.576e43ea.js.map