<template>

    <div>
        <ul>
            <li v-for="(text,index) in doctorDetailData" :key="index">

                <div class="headImg">
                    <img v-if="text.userHeadId" :src="imgUrl+text.userHeadId" />
                    <img v-else  src="../../assets/img/publicHeadImg.png" />
                    
                </div>
                <div class="evaluateCont">
                    <h5>{{text.userName}}</h5>
                    <div>{{text.hospital}} {{text.department}} </div>
                </div>
                <!-- <div>
                    文字
                </div> -->
            </li>
        </ul>
        <noData v-show="nodataVisable"></noData>
    </div>
</template>
<script>
import noData from "../../public/publicComponents/noData.vue";
export default {
    components: {
        noData
    },
    data() {
        return {
            imgUrl:
                "https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/",
            nodataVisable: false
        };
    },
    created() {
        if (this.doctorDetailData.length > 0) {
            this.nodataVisable = false;
        } else {
            this.nodataVisable = true;
        }
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
.headImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.headImg > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>