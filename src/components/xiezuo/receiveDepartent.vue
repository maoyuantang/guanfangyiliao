<template>
    <div>
        <ul class="departmentDetail">
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
export default {
    data() {
        return {
            imgUrl: "https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/"
        };
    },
    created() {
    },
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
.departmentDetail>li{
    display: flex
}
</style>
