<template>
        <div id="page1" class="page close">
			<ul class="access">
                <li><a href="/water_rate"><img src="../../assets/img/water-outline.svg" ></a>水费查看</li>
			    <li><a href="/electric_rate"><img src="../../assets/img/bulb-outline.svg" ></a>电费查看</li>
			    <li><a href="/water_electric_fees"><img src="../../assets/img/water_electric.svg" ></a>水电缴费</li>
			    <li><a href="/tuition"><img src="../../assets/img/tuition.svg" ></a>学杂缴费</li>
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