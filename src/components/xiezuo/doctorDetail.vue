<template>

    <div>
        <ul>
            <li v-for="(text,index) in doctorDetailData" :key="index">
                <div>
                    {{imgUrl}}
                    <img :src="imgUrl+text.userId" />
                </div>
                <div class="evaluateCont">
                    <h5>{{text.userName}}</h5>
                    <div>{{text.department}}</div>
                </div>
                <div>
                    文字
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgUrl:"https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download"
        };
    },
    created() {
    },
    props: {
        doctorDetailData: Array
    },
    model: {
        prop: ["doctorDetailData"],
        event: "reBack"
    }
};
</script>
<style>
</style>