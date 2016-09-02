<style scoped src="../../static/assets/css/codemirrorBasic.css"></style>
<style type="text/css">
  .basicDemo{
  display: inline-block;
  height: 200px;
  width: 206px;
  border: 1px solid white;
}
</style>
<template>
<div id="codeModal" v-show="basicviewcodeshow">
    <div class="uiName">
      <input v-model="title" placeholder="UI名称" type="text" required="">
    </div>
    <div class="uiDesc">
      <input v-model="desc" placeholder="UI简介" type="text" required="">
    </div>
    <nav class="code-nav">
        <ul class="clear">
            <li class="active-code-nav"><a href="#" data-trigger="javascript">Html</a></li>
            <li><a href="#" data-trigger="jquery">Css</a></li>
             <li><a href="#" data-trigger="jquery">Demo</a></li>
        </ul>
    </nav>
    <div class="ModalGroup">
      <div class="Modal">
          <textarea  v-model="htmlcode" id="basicHtmlCode{{sign}}" >{{htmlcode}}</textarea>
      </div>
      <div class="Modal">
          <textarea v-model="csscode" id="basicCssCode{{sign}}">{{csscode}}</textarea>
      </div>
      <div class="Modal">
          <iframe class="basicDemo" id="basicDemo{{sign}}"></iframe>
      </div>
    </div>
    <div class="modal-controls">
        <ul>
            <li>
                <a href="#" data-clipboard-target="javascriptCode" id="copyButton"></a>
            </li>
             <li><a target="_blank" href="/debug" class="effect-5" v-on:click="debug"><span>完全调试</span></a></li>
            <li><a href="#" class="effect-5" v-on:click="updatecode"><span>更新</span></a></li>
            <li><a href="#" class="effect-5" v-on:click="deletecode"><span>删除</span></a></li>
            <li><a href="#" class="effect-5" v-on:click="closeBasieModal"><span>关闭</span></a></li>
        </ul>
    </div>
</div>

</template>

<script>
module.exports = {
  props: ['basicviewcodeshow','sign','title','desc','htmlcode','csscode'],
  ready () {

  },
  methods: {
    closeBasieModal () {
      this.basicviewcodeshow = !this.basicviewcodeshow
      // 清空内容
      // window.basicHtmlCode.setValue('')
    },
    updatecode () {
     
      $.post("/updateUi",{  
                         Uiid: this.sign,
                         title:this.title,
                         desc:this.desc,
                         htmlcode:this.htmlcode,
                         csscode:this.csscode,
                        },
      (result) => {
        if(result.status === "ok"){
          alert("更新成功!");
          this.basicviewcodeshow = !this.basicviewcodeshow
          window.location.reload();
          // $.get('/getUi/'+this.sign, function(data) {
          //   this.title = data.ui.title
          //   this.desc = data.ui.desc
          //   this.htmlcode = data.ui.htmlcode
          //   this.csscode = data.ui.csscode

          // });
        }
        else{
          alert("更新失败!"+result.message);
        }
      });
    },
    deletecode () {
      if (window.confirm("确定要删除该Ui吗(删除Ui后将无法恢复)?")) { 
        $.get('/deleteUi/'+this.sign, (result) => {
          if(result.status == "ok"){
            alert("删除Ui成功!")
            this.basicviewcodeshow = !this.basicviewcodeshow
            window.location.reload();
          }else{
            alert("删除Ui失败!")
          }
        });
      }
    },
    debug () {
      window.localStorage.debug = true;

    }
  },
  data: function () {
    return {

    }
  }
}
</script>