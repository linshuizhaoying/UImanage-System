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
            <li><a href="#0" @click="logout()">退出</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </header> <!-- .cd-main-header -->

  <main class="cd-main-content">
    <nav class="cd-side-nav">
      <ul>
        <li class="cd-label">后台管理</li>
        <li class="">
          <a href="#0" class="hvr-icon-pop hvr-wobble-bottom" @click="showuser">用户管理</a>
        </li>
        <li class="">
          <a href="#0" class="hvr-icon-pop hvr-wobble-bottom">项目管理</a>
        </li>
        <li class="">
          <a href="#0" class="hvr-icon-pop hvr-wobble-bottom">邀请码管理</a>
        </li>
      </ul>


    </nav>

    <div class="content-wrapper">
      <h1 v-if="showComponent == 'default'">欢迎使用UI管理系统 {{current_user}}</h1>
      <div v-if="showComponent == 'adminusermanage' ">
        <adminusermanage></adminusermanage>
      </div>
    </div> <!-- .content-wrapper -->
  </main> <!-- .cd-main-content -->


</template>

<script>
import adminusermanage from '../components/adminusermanage.vue'

export default {
  ready () {
    $.get('/getCurrentUser', (result) => {
      if(result.status == "ok"){
        this.current_user = result.message
      }
    });
  },
  data () {
    return {
      userProfile: false,
      showComponent:'default',
      current_user:''
    }
  },
  methods: {
    navToggle () {
      this.userProfile = !this.userProfile
    },
    showuser (){
      this.showComponent = 'adminusermanage'
    },
    logout (){
      $.get('/logout', (result) => {
          if(result.status == "ok"){
            alert(result.message)
            window.location.href="/login";
          }
      });
    }
  },
  components: {
    adminusermanage
  }
}
</script>
