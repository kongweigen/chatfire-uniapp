"use strict";const t=require("../../../../common/vendor.js"),i={name:"u-swiper-indicator",mixins:[t.mpMixin,t.mixin,t.props$8],data:()=>({lineWidth:22}),computed:{lineStyle(){let i={};return i.width=t.addUnit(this.lineWidth),i.transform=`translateX(${t.addUnit(this.current*this.lineWidth)})`,i.backgroundColor=this.indicatorActiveColor,i},dotStyle(){return t=>{let i={};return i.backgroundColor=t===this.current?this.indicatorActiveColor:this.indicatorInactiveColor,i}}},methods:{addUnit:t.addUnit}};const e=t._export_sfc(i,[["render",function(i,e,n,r,o,d){return t.e({a:"line"===i.indicatorMode},"line"===i.indicatorMode?{b:t.s(d.lineStyle),c:t.n(`u-swiper-indicator__wrapper--${i.indicatorMode}`),d:d.addUnit(o.lineWidth*i.length),e:i.indicatorInactiveColor}:{},{f:"dot"===i.indicatorMode},"dot"===i.indicatorMode?{g:t.f(i.length,((e,n,r)=>({a:n,b:t.n(n===i.current&&"u-swiper-indicator__wrapper__dot--active"),c:t.s(d.dotStyle(n))})))}:{})}],["__scopeId","data-v-ccbdac29"]]);wx.createComponent(e);
