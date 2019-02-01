<template>
	<div class="public-info-module" >
		<div class="public-info-module-layout">
            <i class="iconfont public-info-module-icon">&#xe612;</i>
            <div class="public-info-module-layout-top">
                <div class="public-info-module-logo"><span class="public-info-module-logo-content">家医</span></div>
                <div class="public-info-module-Introduction">
                    <h2 class="public-info-module-name">业务名称占位符</h2>
                    <div class="public-info-module-Introduction-bottom">
                        <span>业务类型占位符</span>
                        <span>GF1254126(业务编号)</span>
                    </div>
                </div>
            </div>
            <div class="public-info-module-layout-bottom">
                <table>
                    <thead class="public-info-module-thead">
                        <tr>
                            <th>价格</th>
                            <th>服务人员</th>
                            <th>业务人次</th>
                            <th>总收入</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="public-info-module-tbody">
                        <tr>
                            <th class="public-info-item-price">¥ 288/月</th>
                            <th class="public-info-item-num">11</th>
                            <th class="public-info-item-count"> 总 13 | <span class="public-info-item-count-spe">今 0</span></th>
                            <th class="public-info-item-total">28,256</th>
                            <th class="public-info-item-disable">禁用</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
		components:{
			
		},
		computed:{
			
		},
		data () {
			return {
			}
		},
		methods:{
			
		},
		async created(){
		}
	}
</script>

<style scoped>
	.public-info-module{
        padding: 15px;
    }
    .public-info-module-layout{
        height: 1.69rem;
        position: relative;
        padding: 0.1rem;
        border: 1px solid #E1E8EE;
        border-radius: 4px;
    }
    .public-info-module-icon{
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .public-info-module-layout-top{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #E4E8EE;
        padding-top: 14px;
        padding-bottom: 16px;
    }
    .public-info-module-logo{
        padding-right: 10px;
    }
    .public-info-module-logo-content{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0.53rem;
        height: 0.53rem;
        box-sizing: border-box;
        border-radius: 50%;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        border: 1px solid #4285F4;
        color: #4285F4;
        background: rgba(66,133,244,0.20);
    }
    .public-info-module-name{
        font-family: PingFangSC-Semibold;
        font-size: 15px;
        color: #002257;
        letter-spacing: 0.1px;
        font-weight: bold;
    }
    .public-info-module-Introduction-bottom{
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
    }
    .public-info-module-Introduction{
        flex: 1;
    }
    .public-info-module-layout-bottom{
        padding-top: 10px;
    }
    .public-info-module-layout-bottom>table{
        width: 100%;
    }
    .public-info-module-thead{
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #97A3B4;
    }
    .public-info-item-price{
        font-family: OpenSans-Semibold;
        font-size: 13px;
        color: #002257;
        line-height: 22px;
    }
    .public-info-item-num{
        font-family: OpenSans-Semibold;
        font-size: 13px;
        color: #4D7CFE;
        line-height: 22px;
    }
    .public-info-item-count{
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #002257;
        line-height: 22px;
    }
    .public-info-item-count-spe{
        color: #FE4D97;
    }
    .public-info-item-total{
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #4D7CFE;
        line-height: 22px;
    }
    .public-info-item-disable{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FE4D97;
        text-align: center;
    }
</style>