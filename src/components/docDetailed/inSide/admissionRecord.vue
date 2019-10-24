<!-- 入院记录 -->
<template>
	<div class="you_jiu_zhen_ji_lu">
		<div v-for="(item,index) in inData" :key="index" class="content">
			<ul class="ul1">
				<li v-for="(o,i) in item.contents" :key="i">
					{{o.title}}
					<p>{{o.content}}</p>
				</li>
			</ul>

			<ul class="ul2">
				<li>记录医生: {{item.recordName}}</li>
				<li>诊断时间: {{item.recordDtime}}</li>
				<li>门诊流水:{{item.inSno}}</li>
			</ul>
		</div>
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

		.content {

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