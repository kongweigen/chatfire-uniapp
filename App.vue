<script>
export default {
	onLaunch: function () {
		console.log('App Launch');
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	},
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-plus/index.scss';
@import 'styles/index.scss';

// Grace6
/* 加载框架核心样式 */
@import './Grace6/css/grace.scss';
/* 加载深色模式适配样式 */
@import './Grace6/css/graceDark.scss';
/* 加载自定义样式 */
@import './custom/custom.scss';
page {
	background: #f8f8f8;
}
</style>
