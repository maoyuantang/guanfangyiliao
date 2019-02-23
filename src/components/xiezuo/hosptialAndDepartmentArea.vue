<template>

    <div>
        <ul>
            <li v-for="(text,index) in doctorDetailData" :key="index" class="everyOne">
                <div>
                    <img src="" />
                </div>
                <div class="everyOne_right">
                    <p1>{{text.hosptial}}</p1>
                    <p2>{{text.department}}</p2>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
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
    .everyOne {
        /* background: #FFFFFF; */
        background: #F8FAFB;
        display: flex;
        margin: 0 0 0.07rem 0;
        padding: 0.25rem 0.1rem;
    }

    .everyOne img {
        background: rgba(66, 133, 244, 0.20);
        border: 1px solid #4285F4;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin: 0 0.2rem;
    }

    .everyOne_right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .everyOne_right p1 {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        /* color: #909191; */
        line-height: 20px;
    }

    .everyOne_right p2 {
        opacity: 0.8;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        /* color: #909191; */
        line-height: 20px;
    }
</style>