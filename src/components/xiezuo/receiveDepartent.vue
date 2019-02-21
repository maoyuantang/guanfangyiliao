<template>
    <div>
        <ul>
            <li v-for="(text,index) in receptionDepartment" :key="index">
                <div>
                    <img src="" />
                </div>
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
     props: {
        receptionDepartment: Array,
    },
    model: {
        prop: ["receptionDepartment"],
        event: "reBack"
    },
};
</script>
<style>
</style>
