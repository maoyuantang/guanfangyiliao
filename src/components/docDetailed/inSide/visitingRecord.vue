<!-- 就诊记录 -->
<template>
	<div class="you_jiu_zhen_ji_lu">
		<!-- <ul class="ul1">
			<li>
				主诉
				<p>无咳嗽 咳血 无咳血 胸痛 呼吸困难 食欲不振 反酸 嗳气</p>
			</li>
			<li>
				现病史
				<p>暂无</p>
			</li>
			<li>
				既往史
				<p>暂无</p>
			</li>
			<li>
				家族史
				<p>暂无</p>
			</li>
			<li>
				病程
				<p>暂无</p>
			</li>
			<li>
				初步诊断
				<p>暂无</p>
			</li>
		</ul>

		<ul class="ul2">
			<li>记录医生: 李医生</li>
			<li>诊断时间: 2018-02-15</li>
			<li>门诊流水:000000000000000</li>
		</ul> -->
	</div>
</template>

<script>
	export default {
		props: [
			"inData"
		],
		components: {

		},
		watch: {

		},
		computed: {

		},

		data() {
			return {
			}
		},

		methods: {


		},
		async created() {

		}
	}
</script>

<style lang="scss" scoped>
	.you_jiu_zhen_ji_lu {
		padding: 30px;
		.ul1 {
			margin-bottom: 50px;
			li {
				color: #1474A9;
				font-family: PingFangSC-Light;
				font-size: 13px;
				letter-spacing: -0.13px;
				line-height: 33px;

				p {
					color: #282828;
				}
			}
		}

		.ul2 {
			li {
				font-family: PingFangSC-Light;
				font-size: 13px;
				color: #282828;
				letter-spacing: -0.13px;
				line-height: 33px;
			}
		}
	}
</style>