<template>
<header>
			<div class="top">
				<div @click="back" class="back">
						<img src="@/assets/img/chevron-back-outline.svg">
				</div>
				报修管理
			</div>
		</header>
        <div class="content3">
            <h3>新建报修单</h3>
        </div>
		<div class="content">
            <div class="content1">
				<h1>标题：</h1>
				<input type="text" v-model="title" id="title" placeholder="报修物品" style="width: 65%;height:70%;" @blur="title1"/>
			</div>
            <div class="ID_num"><span id="titleSpan"></span></div>
			<div class="content2">
				<h2>内容：</h2>
				<textarea v-model="repair_content" id="repair_content" cols="5" rows="20" style="width: 65%;height:90%;" placeholder="报修内容"@blur="content" ></textarea>
			</div>
            <div class="ID_num"><span id="repair_contentSpan"></span></div>
            <div class="content1">
                <h4>宿舍区域：</h4>
                <input type="text" v-model="area" id="area" style="width: 12%;" @blur="area1"/>
                <div class="ID_num"><span id="areaSpan"></span></div>
            </div>
            <div class="content1">
                <h4>宿舍楼号：</h4>
                <input type="text" v-model="build" id="build" style="width: 12%;" @blur="build1"/>
                <h4>号楼</h4>
                <div class="ID_num"><span id="buildSpan"></span></div>
            </div>
            <div class="content1">
                <h4>宿舍楼层：</h4>
                <input type="text" v-model="floor" id="floor" style="width: 12%;" @blur="floor1"/>
                <h4>楼</h4>
                <div class="ID_num"><span id="floorSpan"></span></div>
            </div>
            <div class="content1">
                <h4>宿舍门牌：</h4>
                <input type="text" v-model="number" id="number" style="width: 12%;" @blur="number1"/>
                <h4>号</h4>
                <div class="ID_num"><span id="numberSpan"></span></div>
            </div>
		</div>
        <div class="content4">
            <div><input class="tijiao" type="submit" @click="repair2" value="提交"></div>
        </div>
        <div class="sidebar">
                    <button class="one">
                        <h2>报修单</h2>
                    </button>
                    <ul class="two" v-for="r in rel2" :key="r.area">
                            <ul class="three">
                            <button class="li">
                              {{r.title}}
                            </button>
                                <textarea cols="5" rows="20" style="height:80px; width: 70%;" disabled="disabled" >{{r.content}}</textarea>
                            <h2>维修状态：{{r.repair_status}}</h2>
                            </ul>
                    </ul>
                </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: null,
      message:'',
      studentID: '',
      title:'',
      area:'',
      build:'',
      floor:'',
      number:'',
      repair_content:'',
      rel:[],
      rel2:[],
      rel3:[],
      rel4:[],
    };
  },created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },
  mounted:function(){
      this.repair();//需要触发的函数
    },
  methods: {
    back(){
    window.history.back();
  },
    async repair() {
      try {
        const response = await axios.post('/index/repair/',{
          studentID:this.rel,
        });
        this.rel2=response.data
      } catch (error) {
        console.error(error);
      }
    },
    async repair2() {
      try {
        const response = await axios.post('/index/repair2/',{
          studentID:this.rel,
          title:this.title,
          area:this.area,
          build:this.build,
          floor:this.floor,
          number:this.number,
          repair_content:this.repair_content,
        });
        alert(response.data.message)
      } catch (error) {
        console.error(error);
      }
    },
    title1() {
                let error=false;
				//获取用户获得用户名信息
				var title = document.getElementById("title").value;
				//获取span对象
				var titleSpan = document.getElementById("titleSpan");
				//开始交验
				if (title == "" || title == null) {
					//输入校验结果
					titleSpan.innerHTML = "*标题不能为空";
					titleSpan.style.color = "red";
					error=true;
				}
                return error;
			},
    content() {
                let error=false;
				//获取用户获得用户名信息
				var repair_content = document.getElementById("repair_content").value;
				//获取span对象
				var repair_contentSpan = document.getElementById("repair_contentSpan");
				//开始交验
				if (repair_content == "" || repair_content == null) {
					//输入校验结果
					repair_contentSpan.innerHTML = "*内容不能为空";
					repair_contentSpan.style.color = "red";
					error=true;
				}
                return error;
			},
    area1() {
                let error=false;
				//获取用户获得用户名信息
				var area = document.getElementById("area").value;
				//获取span对象
				var areaSpan = document.getElementById("areaSpan");
				//开始交验
				if (area == "" || area == null) {
					//输入校验结果
					areaSpan.innerHTML = "*区域不能为空";
					areaSpan.style.color = "red";
					error=true;
				}
                return error;
			},
    build1() {
                let error=false;
				//获取用户获得用户名信息
				var build = document.getElementById("build").value;
				//获取span对象
				var buildSpan = document.getElementById("buildSpan");
				//开始交验
				if (build == "" || build == null) {
					//输入校验结果
					buildSpan.innerHTML = "*楼号不能为空";
					buildSpan.style.color = "red";
					error=true;
				}
                return error;
			},
    floor1() {
                let error=false;
				//获取用户获得用户名信息
				var floor = document.getElementById("floor").value;
				//获取span对象
				var floorSpan = document.getElementById("floorSpan");
				//开始交验
				if (floor == "" || floor == null) {
					//输入校验结果
					floorSpan.innerHTML = "*楼层不能为空";
					floorSpan.style.color = "red";
					error=true;
				}
                return error;
			},
    number1() {
                let error=false;
				//获取用户获得用户名信息
				var number = document.getElementById("number").value;
				//获取span对象
				var numberSpan = document.getElementById("numberSpan");
				//开始交验
				if (number == "" || number == null) {
					//输入校验结果
					numberSpan.innerHTML = "*门牌不能为空";
					numberSpan.style.color = "red";
					error=true;
				}
                return error;
			}
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
			width: 90%;
            position: relative;
            left: 5%;
		}
		.content1{
			background-color: white;
			margin: 0.1rem 0px;
			height: 50px;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
		}
		.content2{
			background-color: white;
			height: 100px;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
		}
        .content3{
            background-color: white;
			margin: 0.1rem 0px;
            width: 90%;
			height: 50px;
            position: relative;
            left: 5%;
            display: flex;
            justify-content: center;
			align-items: center;
        }
        .content4{
            background-color: white;
			height: 35px;
            width: 90%;
			position: relative;
            left: 5%;
            display: flex;
            justify-content: right;
        }
        .content4 .tijiao{
            right: 20%;
            position: relative;
            width: 40px;
            height: 25px;
        }
		h1{
			font-family:"楷体";
			font-weight: 600;
			font-size: 21px;
			margin-left: 15px;
			flex-wrap: wrap;
			display: flex;
			align-content: center;
		}
		h2{
			font-family:"楷体";
			font-weight: 600;
			font-size: 21px;
			margin-left: 15px;
		}
        h3{
            font-family:"华文行楷";
            font-weight: 500;
            font-size: 28px;
        }
        h4{
            font-family:"华文行楷";
            font-weight: 500;
            font-size: 20px;
        }
        .sidebar{
            text-align: center;
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
        .li{
            margin: 5px;
            width: 70%;
            font-size: 20px;
            font-family:"楷体";
			font-weight: 600;
        }
</style>