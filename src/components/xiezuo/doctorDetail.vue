<template>

    <div>
        <ul>
            <li v-for="(text,index) in doctorDetailData" :key="index">
                <div>
                    <img src="" />
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
         props: {
        doctorDetailData: Array,
    },
    model: {
        prop: ["doctorDetailData"],
        event: "reBack"
    },
};
</script>
<style>
</style>

