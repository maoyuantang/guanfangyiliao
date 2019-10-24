<template>
<div class="info-list">
	<ul class="info-list-ul">
        <li class="info-list-item" v-for="(item,index) in inData" :key="index">
            <div class="info-list-imgdiv">
                <!-- <img :src="item.img" alt="" srcset=""> -->
                <img src="../../assets/logo.png" alt="" srcset=""> 
            </div>
            <div class="info-list-name">
                <p class="info-name">{{item.name}}</p>
                <p class="info-introduction">{{item.introduction}}</p>
            </div>
            <span class="info-time">{{item.time}}</span>
            <span class="info-status">{{item.status.text}}</span>
        </li>
    </ul>
</div>
</template>

<script>
	export default {
        name : 'infoList',
        props:[
            'inData'
        ],
		data(){
			return {
				list:[
                   
                ]
			}
		}
	}
</script>

<style scoped>
	.info-list{
		
    }
    .info-list-ul{
        margin-top: 0.45rem;
    }
    .info-list-item{
        display: flex;
        align-items: center;
        overflow: hidden;
        margin-bottom: 0.17rem;
    }
    .info-list-imgdiv{
        width: 0.42rem;
        height: 0.42rem;
        margin-right: 1%;
    }
    .info-list-imgdiv>img{
        display: block;
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 50%;
    }
    .info-list-name{
        width: 2rem;
        margin-right: 1.6%;
        overflow: hidden;
        font-weight: bold;
    }
    .info-time{
        display: block;
        width: 1.11rem;
        margin-right: 1.3%;
        overflow: hidden;
        font-weight: bold;
    }
    .info-introduction{
        overflow: hidden;
        font-family: var(--fontFamily3);
        color: var(--color11);
        line-height: 0.21rem;
    }
    .info-status{
        flex: 1;
        font-family: var(--fontFamily3);
        text-align: center;
    }
    .info-name{
        font-family: var(--fontFamily2);
        color: var(--color12);
    }
    .info-time{
        font-family: var(--fontFamily2);
        color: var(--color12);
    }
</style>