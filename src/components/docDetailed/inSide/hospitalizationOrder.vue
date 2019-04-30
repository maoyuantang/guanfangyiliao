<!-- 住院医嘱 -->
<template>
    <div>
        <div class="medicalOrder">
            <div class="medicalOrder-top">
                <p class="medicalOrder-top-item">医嘱名称</p>
                <p class="medicalOrder-top-item">用法</p>
                <p class="medicalOrder-top-item">开始时间</p>
                <p class="medicalOrder-top-item">结束时间</p>
                <p class="medicalOrder-top-item">频次</p>
                <p class="medicalOrder-top-item">数量</p>
                <p class="medicalOrder-top-item">执行情况</p>
            </div>
            <div class="medicalOrder-body">
                <div class="medicalOrder-body-list" v-for="(item,index) in 5" :key="index">
                    <div class="medicalOrder-body-list-item">
                        <p class="medicalOrder-body-list-item-item">头孢硫脒[乙]</p>
                        <p class="medicalOrder-body-list-item-item">静脉滴入</p>
                        <p class="medicalOrder-body-list-item-item">2018-05-22 08:22:21</p>
                        <p class="medicalOrder-body-list-item-item">2018-05-22 08:22:21</p>
                        <p class="medicalOrder-body-list-item-item">每天一次</p>
                        <p class="medicalOrder-body-list-item-item">0.2g</p>
                        <p class="medicalOrder-body-list-item-item medicalOrder-body-list-item-item-status">执行中</p>
                    </div>
                    <div class="medicalOrder-body-list-item">
                        <p class="medicalOrder-body-list-item-item">头孢硫脒[乙]</p>
                        <p class="medicalOrder-body-list-item-item">静脉滴入</p>
                        <p class="medicalOrder-body-list-item-item">2018-05-22 08:22:21</p>
                        <p class="medicalOrder-body-list-item-item">2018-05-22 08:22:21</p>
                        <p class="medicalOrder-body-list-item-item">每天一次</p>
                        <p class="medicalOrder-body-list-item-item">0.2g</p>
                        <p class="medicalOrder-body-list-item-item medicalOrder-body-list-item-item-status">执行中</p>
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
    .medicalOrder-top {
        display: flex;
        background-color: #E9C457;
        height: 0.48rem;
    }

    .medicalOrder-top-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: MicrosoftYaHei;
        font-size: var(--fontSize4);
        color: rgba(0, 0, 0, 0.87);
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
        font-size: var(--fontSize4);
        color: var(--color20);
    }

    .medicalOrder-body-list:nth-of-type(odd) {
        background-color: #F1F5F8;
    }

    .medicalOrder-body-list-item-item-status {
        color: #108E26;
    }
</style>