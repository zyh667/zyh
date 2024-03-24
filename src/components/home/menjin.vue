<template>
        <div id="page1" class="page open">
			<ul class="access">
			    <li><a @click="recognition" href=""><img src="../../assets/img/face_recognition.png" ></a>人脸识别</li>
                <li><a href="/change_face"><img src="../../assets/img/personal_center.png" ></a>人脸信息</li>
                <li><a href="/record"><img src="../../assets/img/document-lock-outline.svg" ></a>门禁记录</li>
			</ul>
        </div>
</template>
<script>
import axios from 'axios';

export default {
  methods: {
    async recognition() {
      try {
        const response = await axios.post('/index/recognition/');
        console.log(response.data);
        this.$router.push({name:'record'})
      } catch (error) {
        console.error(error);
      }
    },
  },
};
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