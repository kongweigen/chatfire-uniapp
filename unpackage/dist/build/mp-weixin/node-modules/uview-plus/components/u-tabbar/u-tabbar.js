"use strict";const e=require("../../../../common/vendor.js"),t={name:"u-tabbar",mixins:[e.mpMixin,e.mixin,e.props$4],data:()=>({placeholderHeight:0}),computed:{tabbarStyle(){const t={zIndex:this.zIndex};return e.deepMerge(t,e.addStyle(this.customStyle))},updateChild(){return[this.value,this.activeColor,this.inactiveColor]},updatePlaceholder(){return[this.fixed,this.placeholder]}},watch:{updateChild(){this.updateChildren()},updatePlaceholder(){this.setPlaceholderHeight()}},created(){this.children=[]},mounted(){this.setPlaceholderHeight()},methods:{updateChildren(){this.children.length&&this.children.map((e=>e.updateFromParent()))},async setPlaceholderHeight(){this.fixed&&this.placeholder&&(await e.sleep(20),this.$uGetRect(".u-tabbar__content").then((({height:e=50})=>{this.placeholderHeight=e})))}}};if(!Array){e.resolveComponent("u-safe-bottom")()}Math;const a=e._export_sfc(t,[["render",function(t,a,r,o,h,i){return e.e({a:t.safeAreaInsetBottom},(t.safeAreaInsetBottom,{}),{b:e.o(((...e)=>t.noop&&t.noop(...e))),c:e.n(t.border&&"u-border-top"),d:e.n(t.fixed&&"u-tabbar--fixed"),e:e.s(i.tabbarStyle),f:t.placeholder},t.placeholder?{g:h.placeholderHeight+"px"}:{})}],["__scopeId","data-v-f6651a04"]]);wx.createComponent(a);