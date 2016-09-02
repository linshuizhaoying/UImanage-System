<style scoped src="../../static/assets/css/codemirror.css"></style>
<template>
<div id="codeModal" v-show="advancedviewcodeshow">
<div id="wrapper">
    <section id="utils">
        <input class="query" type="text" placeholder="UI名称" v-model="title">
        <input class="query" type="text" placeholder="UI描述" v-model="desc">
        <div class="code-swap">
            <span class="code-swap-html" href="#" v-bind:class="{ 'active': swapfunc == 'html',}" @click="showhtml">HTML</span>
            <span class="code-swap-css" href="#" v-bind:class="{ 'active': swapfunc == 'css',}" @click="showcss">CSS</span>
            <span class="code-swap-js" href="#" v-bind:class="{ 'active': swapfunc == 'js',}"  @click="showjs">JS</span>
        </div>
        <div class="code-tools">
            <span class="reset-editor" @click="reset">重置 &orarr;</span>
            <span class="clear-editor" @click="clear">清空 &osol;</span>
            <span class="run-script" @click="runjs">运行Js&raquo;</span>
            <span class="run-script" @click="updatecode">更新</span>
            <span class="run-script" @click="deletecode">删除</span>
        </div>
        <div class="cdnjs-search">
            <input v-model="link" id="out-js{{sign}}" class="query" type="text" placeholder="cdnjs..." value="http://libs.baidu.com/jquery/2.0.0/jquery.min.js">
            <span class="close" @click="close">X</span>
        </div>

    </section>
    <section id="editor" class="advancededitor">
        <div class="code-pane">
            <div class="code-pane-html" v-show="swapfunc == 'html'">
                <textarea v-model="htmlcode" id="htmlcode{{sign}}"></textarea>
            </div>
            <div class="code-pane-css" v-show="swapfunc == 'css'">
                <textarea v-model="csscode" id="csscode{{sign}}"></textarea>
            </div>
            <div class="code-pane-js" v-show="swapfunc == 'js'">
                <textarea v-model="jscode" id="jscode{{sign}}"></textarea>
            </div>
        </div>
        <div class="preview-pane">
            <iframe id="advancedDemo{{sign}}" name="preview"></iframe>
        </div>
    </section>
</div>

</div>

</template>

<script>
module.exports = {
  props: ['advancedviewcodeshow','sign','title','desc','htmlcode','csscode','jscode','link'],
  ready: function () {
   

  },
  methods: {
    closeBasieModal () {
      this.advancedviewcodeshow = !this.advancedviewcodeshow
      // 清空内容
      // window.advancedHtmlCode.setValue('')
    },
    render (loadjs) {
      // Base template
      let baseTpl =
          '<!doctype html>\n' +
          '<html>\n\t' +
          '<head>\n\t\t' +
          '<meta charset=\'utf-8\'>\n\t\t' +
          '<title>Test</title>\n\n\t\t\n\t' +
          '</head>\n\t' +
          '<body>\n\t\n\t' +
          '</body>\n' +
          '</html>'
      let sourceCode = () => {
        let html = this.htmlcode
        let css = this.csscode
        let js = this.jscode
        let src = ''
        // HTML
        src = baseTpl.replace('</body>', html + '</body>')
        // 内部CSS
        css = '<style>' + css + '</style>'
        src = src.replace('</head>', css + '</head>')
        // 内部Javascript
        if(loadjs == true){
          js = '<script>' + js + '<\/script>';
          let jsarrayList = $('#out-js').val(); 
          console.log(jsarrayList)
          let outjs ='';
          outjs += '<script src="' + jsarrayList +'"><\/script>'; 
          src = src.replace('</body>', outjs + js + '</body>'); 
        }
        return src
      }
        let iframe = document.querySelector('#advancedDemo'+this.sign)
      let render = () => {
        let source = sourceCode()
        let iframeDoc = iframe.contentDocument
        iframeDoc.open()
        iframeDoc.write(source)
        iframeDoc.close()
      }
      render()
    },
    updatecode () {
      $.post("/updateUi",{  
                         Uiid: this.sign,
                         title:this.title,
                         desc:this.desc,
                         htmlcode:this.htmlcode,
                         csscode:this.csscode,
                         jscode:this.jscode,
                         link:this.link,
                        },
      (result) => {
        if(result.status === "ok"){
          alert("更新成功!");
          this.advancedviewcodeshow = !this.advancedviewcodeshow
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
    deletecode (){
      if (window.confirm("确定要删除该Ui吗(删除Ui后将无法恢复)?")) { 
        $.get('/deleteUi/'+this.sign, (result) => {
          if(result.status == "ok"){
            alert("删除Ui成功!")
            this.advancedviewcodeshow = !this.advancedviewcodeshow
            window.location.reload();
          }else{
            alert("删除Ui失败!")
          }
        });
      }
    },
    showhtml () {
      this.swapfunc = 'html'
    },
    showcss () {
      this.swapfunc = 'css'
    },
    showjs () {
      this.swapfunc = 'js'
    },
    reset () {
      let defaultCSS = '@import url(\"https:\/\/fonts.googleapis.com\/css?family=Droid+Sans:400,700\");\n\nhtml,body {\n    background-color: #282a36;\n    color: #fff;\n    font-family: \"Droid Sans\", sans-serif;\n    overflow: hidden;\n    text-align: center;\n}\n\nmain {\n    left: 50%;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%,-50%);\n}\n\nh1 {\n    font-size: 2rem;\n    font-weight: 400;\n    margin: 0;\n}\n\np {\n    font-size: 1rem;\n    margin: 1rem 0;\n}';
      this.editorHTML.setValue('<main>\n\n  <h1>LinshuiZhaoying</h1>\n\n  <p>Demo</p>\n\n</main>')
      this.editorCss.setValue(defaultCSS)
      this.editorJs.setValue('alert("hello!LinshuiZhaoying")')
    },
    clear () {
      this.editorHTML.setValue('')
      this.editorCss.setValue('')
      this.editorJs.setValue('')
    },
    runjs (){
      this.render(true);
    },
    close (){
      this.advancedviewcodeshow = !this.advancedviewcodeshow
    }
  },
  data () {
    return {

      swapfunc:'html'
    }
  }
}
</script>