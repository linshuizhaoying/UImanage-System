<style scoped src="../../static/assets/css/timeline.css"></style>

<template>
  <advancedviewcode :advancedviewcodeshow.sync="advancedviewcodeshow" :sign="signnum" :title="title" :desc="desc" :htmlcode="htmlcode" :csscode="csscode" :jscode="jscode" :link="link" class="animated" ></advancedviewcode>
  <div class="default">
    <h2 class="ui dividing header">{{title}}</h2>
    <div class="timeline-wrapper">
      <div class="tip data-tip-top" data-tip="View Code" v-on:click="toggleviewcode()">
        <a class="code clear hvr-float-shadow" >
          <i class="fa fa-arrow-left"></i>
          <i class="fa fa-arrow-right"></i>
        </a>
      </div>
      
      <div class="timeline-item">
        <div class="animated-background facebook">
          <div class="background-masker header-top"></div>
          <div class="background-masker header-left"></div>
          <div class="background-masker header-right"></div>
          <div class="background-masker header-bottom"></div>
          <div class="background-masker subheader-left"></div>
          <div class="background-masker subheader-right"></div>
          <div class="background-masker subheader-bottom"></div>
          <div class="background-masker content-top"></div>
          <div class="background-masker content-first-end"></div>
          <div class="background-masker content-second-line"></div>
          <div class="background-masker content-second-end"></div>
          <div class="background-masker content-third-line"></div>
          <div class="background-masker content-third-end"></div>
        </div>
      </div>

      <div class="uiDesc">
        {{desc}}
      </div>
    </div>
  </div>
</template>

<script>



import advancedviewcode from './advanced-viewcode.vue'

module.exports = {
  props: ['sign'],
  created () { 
    this.signnum = this.sign
    $.get('/getUi/'+this.sign, (data) => {
        this.title = data.ui.title
        this.desc = data.ui.desc
        this.htmlcode = data.ui.htmlcode
        this.csscode = data.ui.csscode
        this.jscode = data.ui.jscode
        this.link = data.ui.link
    })
  }, 
  methods: {
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
      let sourceCode =  () => {
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
          let jsarrayList = $('#out-js'+this.sign).val(); 
          console.log(jsarrayList)
          let outjs ='';
          outjs += '<script src="' + jsarrayList +'"><\/script>'; 
          src = src.replace('</body>', outjs + js + '</body>'); 
        }
        return src
      }
      let iframe = document.querySelector('#advancedDemo'+this.sign)
      let render =  () => {
        let source = sourceCode()
        let iframeDoc = iframe.contentDocument
        iframeDoc.open()
        iframeDoc.write(source)
        iframeDoc.close()
      }
      render()
    },
    toggleviewcode () {
      this.advancedviewcodeshow = !this.advancedviewcodeshow
      let editorHTML = document.editor = CodeMirror.fromTextArea(document.getElementById('htmlcode'+this.sign), {
              mode: 'text/html',
              profile: 'html',
              keyMap: 'sublime',
              lineNumbers: true,
              lineWrapping: false,
              theme: 'dracula',
              tabSize: 4,
              indentUnit: 4,
              autoCloseBrackets: true,
          });
          this.editorHTML = editorHTML;
          let defaultHtml = this.htmlcode
          editorHTML.setValue(defaultHtml)
          emmetCodeMirror(editorHTML)

          let editorCss = document.editor = CodeMirror.fromTextArea(document.getElementById('csscode'+this.sign), {
              mode: 'css',
              keyMap: 'sublime',
              lineNumbers: true,
              lineWrapping: false,
              theme: 'dracula',
              tabSize: 4,
              indentUnit: 4,
              autoCloseBrackets: true,
          });
          this.editorCss = editorCss;
         let defaultCSS = this.csscode;
             

          editorCss.setValue(defaultCSS)
          emmetCodeMirror(editorCss)

        let editorJs = document.editor = CodeMirror.fromTextArea(document.getElementById('jscode'+this.sign), {
              mode: 'javascript',
              keyMap: 'sublime',
              lineNumbers: true,
              lineWrapping: false,
              theme: 'dracula',
              tabSize: 4,
              indentUnit: 4,
              autoCloseBrackets: true,
          });
          this.editorJs = editorJs;
          editorJs.setValue(this.jscode)
          emmetCodeMirror(editorJs)

      //下面处理是为了让编辑器能够一打开就显示默认内容，这里是修复点击后才会显示内容的Bug
          let htmlsh = setInterval( () => {
           editorHTML.refresh();
          }, 150); 
          editorHTML.refresh();

          let jssh = setInterval( () => {
           editorJs.refresh();
          }, 150); 
          editorJs.refresh();

          let csssh = setInterval( () => {
           editorCss.refresh();
           this.htmlcode = editorHTML.getValue()
           this.csscode = editorCss.getValue()
           this.jscode = editorJs.getValue()

           this.render();
          }, 150); 
          editorCss.refresh();

          setTimeout(function(){
            clearInterval(htmlsh); 
            clearInterval(csssh);
            clearInterval(jssh);
          },4500)

          editorHTML.on('change',  () => {
            this.htmlcode = editorHTML.getValue()
            this.render()
          })
          editorCss.on('change',  () => {
            this.csscode = editorCss.getValue()
            this.render()
          })
          editorJs.on('change',  () => {
            this.jscode = editorJs.getValue()
            this.render()
          })
    }
  },
  data: function () {
    return {
      advancedviewcodeshow: false,
      signnum: '',
      title: '',
      desc:'',
      htmlcode:'',
      csscode:'',
      jscode:'',
      link:''
    }
  },
  components: {
    advancedviewcode
  }
}
</script>