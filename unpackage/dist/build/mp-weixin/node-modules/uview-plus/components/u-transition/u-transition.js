"use strict";const e=require("../../../../common/vendor.js"),t={name:"u-transition",data:()=>({inited:!1,viewStyle:{},status:"",transitionEnded:!1,display:!1,classes:""}),emits:["click","beforeEnter","enter","afterEnter","beforeLeave","leave","afterLeave"],computed:{mergeStyle(){const{viewStyle:t,customStyle:i}=this;return{transitionDuration:`${this.duration}ms`,transitionTimingFunction:this.timingFunction,...e.addStyle(i),...t}}},mixins:[e.mpMixin,e.mixin,e.transitionMixin,e.props$13],watch:{show:{handler(e){e?this.vueEnter():this.vueLeave()},immediate:!0}}};const i=e._export_sfc(t,[["render",function(t,i,n,s,r,o){return e.e({a:r.inited},r.inited?{b:e.o(((...e)=>t.clickHandler&&t.clickHandler(...e))),c:e.n(r.classes),d:e.s(o.mergeStyle),e:e.o(((...e)=>t.noop&&t.noop(...e)))}:{})}],["__scopeId","data-v-a23edd7f"]]);wx.createComponent(i);
