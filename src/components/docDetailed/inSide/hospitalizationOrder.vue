<!-- 住院医嘱 -->
<template>
    <div>
        <div class="medicalOrder" v-if="inData.length == 0?false:true">
            <div class="medicalOrder-top">
                <p class="medicalOrder-top-item">医嘱名称</p>
                <p class="medicalOrder-top-item">规格</p>
                <p class="medicalOrder-top-item">途径</p>
                <p class="medicalOrder-top-item">开始时间</p>
                <p class="medicalOrder-top-item">结束时间</p>
                <p class="medicalOrder-top-item">频次</p>
                <p class="medicalOrder-top-item">剂量</p>
                <p class="medicalOrder-top-item">类别</p>
                <p class="medicalOrder-top-item">医嘱科室</p>
                <p class="medicalOrder-top-item">医嘱医生</p>
            </div>
            <div class="medicalOrder-body">
                <div class="medicalOrder-body-list" v-for="(item,index) in inData" :key="index">
                    <div class="medicalOrder-body-list-item">
                        <p class="medicalOrder-body-list-item-item">{{item.name}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.std}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.usage}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.startDtime}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.endDtime}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.freq}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.unit}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.orderType}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.deptName}}</p>
                        <p class="medicalOrder-body-list-item-item medicalOrder-body-list-item-item-status">
                            {{item.docName}}</p>
                    </div>
                </div>
            </div>
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

<style scoped>
    .medicalOrder {
        padding: 25px 40px;
    }

    .medicalOrder-top {
        display: flex;
        background-color: #E9C457;
        height: 0.48rem;
    }

    .medicalOrder-top-item {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.87);
        text-align: left;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .medicalOrder-body-list-item {
        display: flex;
        height: 0.48rem;
    }

    .medicalOrder-body-list-item-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: var(--color20);
    }

    .medicalOrder-body-list:nth-of-type(odd) {
        background-color: #F1F5F8;
    }

    .medicalOrder-body-list-item-item-status {
        color: #108E26;
    }
</style>