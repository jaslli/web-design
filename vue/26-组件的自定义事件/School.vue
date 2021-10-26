
<template>
    <div>
        <h2>学校名称： {{schoolName}}</h2>
        <h2>学校地址： {{address}}</h2>
        <button @click="sendSchoolName">把学校名给APP</button>
    </div>
</template>


<script>
export default {
    naem: 'School',
    data() {
        return {
            schoolName: '学校',
            address: '中国'
        }
    },
    props:['getSchoolName'],
    methods: {
        sendSchoolName() {
            this.getSchoolName(this.schoolName)
        }
    }
}
</script>


<style>

</style>