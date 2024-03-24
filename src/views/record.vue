<template>
<div class="content">
    <header>
        <div class="top">
            <div @click="back" class="back">
                    <img src="@/assets/img/chevron-back-outline.svg">
            </div>
            门禁记录
        </div>
    </header>
        <div class="sidebar">
            <button class="one">
                <h2>门禁记录</h2>
            </button>
            <ul class="two">
                    <ul class="three" v-for="r in rel2" :key="r.studentID">
                    <h3>时间：{{ r.time }}</h3>
                    <h3><img class="face" :src="'http://127.0.0.1:8000'+r.record" alt=""></h3>
                    </ul>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
data() {
    return {
      user: null,
      imageUrl:'',
      rel:[],
      rel2:[],
      rel3:[],
    };
  },created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },mounted:function(){
      this.record();//需要触发的函数
    },
  methods: {
    back(){
    window.history.back();
  },
    async record() {
      try {
        const response = await axios.post('/index/record/',{
          studentID:this.rel
        });
        this.rel2=response.data
        this.imageUrl='http://127.0.0.1:8000'+this.rel3['record']
        console.log(this.imageUrl)
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>
<style scoped>
body{
			background-color: whitesmoke;
		}
		* {
			margin: 0;
			padding: 0;
		}
		.top {
            box-shadow:0px 1px #afacac;
			font-weight: bolder;
			font-size: 26px;
			text-align: center;
			background-color: white;
			width: 100%;
			height: 40px;
            padding-top: 40px;
		}
		.back{
			width: 10%;
			height: 37px;
			position: fixed;
			top: 39px;
		}
		.back img{
			width: 40px;
			height: 40px;
		}
		.content {
			background-color: white;
			position : absolute;
	        width : 100%;
	        height : 100%;
		}
        h2{
            font-family:"楷体";
			font-weight: 400;
            padding: 5px 0px;
            text-align: center;
            background: #e3e2e2;
        }
        h3{
            padding: 5px 0px;
            font-family:"楷体";
			font-weight: 400;
        }
        .sidebar{
            text-align: center;
            margin-top: 15px;
        }
        .sidebar .one{
            width: 70%;
            height: 40px;
        }
        .sidebar .three{
            background: white;
            width: 70%;
            left: 15%;
            position: relative;
            margin: 0px 0px 5px 0px;
            box-shadow: 0px 0px 0px 1px #5d5c5c;
        }
        .sidebar .face{
            width: 200px;
        }
</style>