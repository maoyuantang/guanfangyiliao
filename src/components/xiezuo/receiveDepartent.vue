<template>
    <div >
        <ul class="departmentDetail doctorDetailBox">
            <li v-for="(text,index) in receptionDepartment" :key="index">
                <!-- <div>
                    <img :src="imgUrl+text.hospitalId" />
                </div> -->
                <div class="evaluateCont">
                    <h5>{{text.hospital}}</h5>
                    <div>{{text.department}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            imgUrl:
                "https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/"
        };
    },
            computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            userSocketInfo: state => state.socket

        })
    },
    created() {},
    props: {
        receptionDepartment: Array
    },
    model: {
        prop: ["receptionDepartment"],
        event: "reBack"
    }
};
</script>
<style>
/* .departmentDetail {
}
.departmentDetail > li {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 10px;
} */
</style>
