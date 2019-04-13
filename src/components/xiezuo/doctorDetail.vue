<template>

    <div style="   ">
        <ul class='doctorDetailBox'>
            <li v-for="(text,index) in doctorDetailData" :key="index">

                <div class="headImg">
                    <img v-if="text.userHeadId" :src="userSocketInfo.imgUrl+text.userHeadId" />
                    <img v-else src="../../assets/img/publicHeadImg.png" />

                </div>
                <div class="evaluateCont">
                    <h5>{{text.userName}}</h5>
                    <div>{{text.hospital}} {{text.department}} </div>
                </div>
            </li>
        </ul>
        <noData v-if="nodataVisable"></noData>
    </div>
</template>
<script>
import noData from "../../public/publicComponents/noData.vue";
import { mapState } from "vuex";
export default {
    components: {
        noData
    },
    watch:{
       doctorDetailData(n){console.log(n)} 
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            userSocketInfo: state => state.socket
        })
    },
    data() {
        return {
            imgUrl:
                "https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/",
            nodataVisable: false
        };
    },
    created() {
        this.nodataIf();
    },
    methods: {
        nodataIf() {
            console.log(this.doctorDetailData)
            if (this.doctorDetailData.length > 0) {

                this.nodataVisable = false;
            } else {
                this.nodataVisable = true;
            }
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

</style>