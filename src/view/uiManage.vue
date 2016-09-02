<style>
.btn{
    float: right;
    display: inline-block;
    margin: 0 5%;
    width: 200px;
    padding: 1rem 0;
    background-color: #1784c7;
    border-radius: .25rem;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    text-align: center;
    color: #ffffff;
    font-weight: bold;
    top: 50px;
    right: 0px;
    cursor: pointer;
    position: relative;
}
.count{
	margin-left: 5px;
}
</style>
<template>
<header class="cd-main-header">
		<a href="#0" class="cd-logo"><img src="../../static/assets/img/logo.png" alt="Logo"></a>
		
		<div class="cd-search is-hidden">
			<form action="#0">
				<input type="search" placeholder="Search...">
			</form>
		</div> <!-- cd-search -->

		<a href="#0" class="cd-nav-trigger">Menu<span></span></a>

		<nav class="cd-nav">
			<ul class="cd-top-nav">

				<li class="has-children account" v-on:click="navToggle()"  v-bind:class="{ 'selected': userProfile}">
					<a href="#0">
						<img src="../../static/assets/img/cd-avatar.png" alt="avatar">
						{{current_user}}
					</a>
					<ul>
						<li><a href="#0">我的账户</a></li>
						<li><a href="#0" @click="logout">退出</a></li>
					</ul>
				</li>
			</ul>
		</nav>
	</header> <!-- .cd-main-header -->

	<main class="cd-main-content">
		<nav class="cd-side-nav">
			<ul>
				<li class="cd-label">基础UI</li>
				<li class="">
					<a href="#0" class="hvr-icon-pop hvr-wobble-bottom" @click="showbtn">按钮<span class="count">{{btnArr.length}}</span></a>
				</li>
				<li class="">
					<a href="#0" class="hvr-icon-pop hvr-wobble-bottom" @click="showpanel">面板<span class="count">{{panelArr.length}}</span></a>
				</li>
				<li class="">
					<a href="#0" class="hvr-icon-pop hvr-wobble-bottom" @click="showform">表单<span class="count">{{formArr.length}}</span></a>
				</li>
        <li class="">
          <a href="#0" class="hvr-icon-pop hvr-wobble-bottom" @click="shownav">导航<span class="count">{{navArr.length}}</span></a>
        </li>
        <li class="">
          <a href="#0" class="hvr-icon-pop hvr-wobble-bottom" @click="showlist">列表<span class="count">{{listArr.length}}</span></a>
        </li>
        <li class="">
          <a href="#0" class="hvr-icon-pop hvr-wobble-bottom" @click="showother">其它<span class="count">{{otherArr.length}}</span></a>
        </li>
			</ul>

			<ul>
				<li class="cd-label">扩展UI</li>
				<li class="has-children bookmarks">
					<a href="#0" class="hvr-icon-pop hvr-wobble-bottom" @click="showcomponent">组件化<span class="count">{{componentArr.length}}</span></a>
				</li>
        <li class="has-children bookmarks">
          <a href="#0" class="hvr-icon-pop hvr-wobble-bottom" @click="showplugin">插件化<span class="count">{{pluginArr.length}}</span></a>
        </li>
			</ul>

			<ul>
				<li class="cd-label">功能</li>
				<li class="action-btn"><a class="hvr-float-shadow">特效收集</a></li>
				<li class="action-btn"><a class="btn-danger hvr-float-shadow"  target="_blank" href="/debug" @click="canceldebug">动态调试</a></li>
			</ul>
		</nav>

		<div class="content-wrapper">
			<h1 v-if="showComponent == 'default'">欢迎使用UI管理系统</h1>
      
      <basiccreate :basiccreate.sync="basiccreate" :type="type"  class="animated" transition="bounce" ></basiccreate>
			<advancedcreate :advancedcreate.sync="advancedcreate" :type="type"  class="animated" transition="bounce" ></advancedcreate>
			<div class="btn hvr-float-shadow" @click="showCreate"  v-if="showComponent != 'default'">添加</div>

			<div v-if="showComponent == 'basic-btn'">
				<h1>按钮</h1>
			  <div v-for="item in btnArr">
			    <basicui :sign ="item._id"></basicui>
			  </div>
			</div>
			<div v-if="showComponent == 'basic-panel'">
				<h1>面板</h1>

			  <div v-for="item in panelArr">
			    <basicui :sign ="item._id"></basicui>
			  </div>
			</div>
			<div v-if="showComponent == 'basic-form'">
				<h1>表单</h1>

			  <div v-for="item in formArr">
			    <basicui :sign ="item._id"></basicui>
			  </div>
			</div>
			<div v-if="showComponent == 'basic-nav'">
				<h1>导航</h1>
				
			  <div v-for="item in navArr">
			    <basicui :sign ="item._id"></basicui>
			  </div>
			</div>
			<div v-if="showComponent == 'basic-list'">
				<h1>列表</h1>
				
			  <div v-for="item in listArr">
			    <basicui :sign ="item._id"></basicui>
			  </div>
			</div>
			<div v-if="showComponent == 'basic-other'">
				<h1>其它</h1>
				
			  <div v-for="item in otherArr">
			    <basicui :sign ="item._id"></basicui>
			  </div>
			</div>
			<div v-if="showComponent == 'advance-component'">
				<h1>组件化</h1> 
			  <div v-for="item in componentArr">
			    <advanceui :sign ="item._id"></advanceui>
			  </div>
				
			</div>
			<div v-if="showComponent == 'advance-plugin'">
				<h1>插件化</h1>
			  <div v-for="item in pluginArr">
			    <advanceui :sign ="item._id"></advanceui>
			  </div>
			</div>
		</div> <!-- .content-wrapper -->
	</main> <!-- .cd-main-content -->


</template>

<script>

import basicui from '../components/basic-ui.vue'
import advanceui from '../components/advanced-ui.vue'
import basiccreate from '../components/basic-create.vue'
import advancedcreate from '../components/advanced-create.vue'
export default {
  ready () {
  	this.current_user = window.localStorage.current_user
    console.log(window.localStorage.current_projectid)
    $.get('/getUis/'+window.localStorage.current_projectid, (data) => {
      this.uis = data.Uis
      for (var i = this.uis.length - 1; i >= 0; i--) {
				//btn panel form nav list other component plugin
      	if(this.uis[i].type == "list"){
      		this.listArr.push(this.uis[i])
      	}
      	if(this.uis[i].type == "btn"){
      		this.btnArr.push(this.uis[i])
      	}
      	if(this.uis[i].type == "panel"){
      		this.panelArr.push(this.uis[i])
      	}
      	if(this.uis[i].type == "form"){
      		this.formArr.push(this.uis[i])
      	}
      	if(this.uis[i].type == "nav"){
      		this.navArr.push(this.uis[i])
      	}
      	if(this.uis[i].type == "other"){
      		this.otherArr.push(this.uis[i])
      	}
      	if(this.uis[i].type == "component"){
      		this.componentArr.push(this.uis[i])
      	}
      	if(this.uis[i].type == "plugin"){
      		this.pluginArr.push(this.uis[i])
      	}	
      }
    });

  },
  data () {
    return {
    	current_user:'',
      userProfile: false,
      type:'',
      showComponent: 'default',
      basiccreate: false,
      advancedcreate: false,
      uis:'',
      listArr:[],
      btnArr:[],
      panelArr:[],
      formArr:[],
      navArr:[],
      otherArr:[],
      componentArr:[],
      pluginArr:[]
    }
  },
  methods: {
    navToggle () {
      this.userProfile = !this.userProfile
    },
    showbtn (){
    	this.showComponent = 'basic-btn'
    	this.type = 'btn'
    },
    showpanel (){
    	this.showComponent = 'basic-panel'
    	this.type = 'panel'
    },
    showform (){
    	this.showComponent = 'basic-form'
    	this.type = 'form'
    },
    shownav (){
    	this.showComponent = 'basic-nav'
    	this.type = 'nav'
    },
    showlist (){
    	this.showComponent = 'basic-list'
    	this.type = 'list'
    },
    showother (){
    	this.showComponent = 'basic-other'
    	this.type = 'other'
    },
    showcomponent (){
    	this.showComponent = 'advance-component'
    	this.type = 'component'
    },
    showplugin (){
    	this.showComponent = 'advance-plugin'
    	this.type = 'plugin'
    },
    showCreate (){
    	if(this.type != 'plugin' && this.type != 'component'){
    		this.basiccreate = !this.basiccreate
    	}else{
    		this.advancedcreate = !this.advancedcreate
    	}
    },
    logout (){
      $.get('/logout', (result) => {
          if(result.status == "ok"){
            alert(result.message)
            window.location.href="/login";
          }
      });
    },
    canceldebug (){
      window.localStorage.debug = false
    }
  },
  components: {
    basicui,
    advanceui,
    basiccreate,
    advancedcreate,
  }
}
</script>
