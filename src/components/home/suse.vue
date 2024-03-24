<template>
        <div id="page1" class="page close">
			<ul class="access">
			    <li><a href="/dormitory_information"><img src="../../assets/img/dormitory_management.png" ></a>宿舍信息</li>
			    <li><a href="/repair"><img src="../../assets/img/repair_report.png" ></a>报修管理</li>
			</ul>
        </div>
</template>
<script setup>

</script>
<style scoped>
* {
	margin: 0;
	padding: 0;
}

.access {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	text-align: center;
	border-radius: 10px;
	box-shadow: 0px 0px 13px #858282;
	width: 100%;
	height: 100%;
	transition: none;
}

.access li {
	float: left;
	width: 28%;
	padding: 15px 28px;
	list-style: none;
}

li img {
	left: 50%;
	box-shadow: 0px 0px 13px #f8c0c0;
	border-radius: 20px;
	width: 100%;
}
</style>