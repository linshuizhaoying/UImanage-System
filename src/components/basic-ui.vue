<style scoped src="../../static/assets/css/timeline.css"></style>
<template>
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

    <basicviewcode :basicviewcodeshow.sync="basicviewcodeshow" :sign="signnum" :title="title" :desc="desc" :htmlcode="htmlcode" :csscode="csscode" class="animated" transition="bounce"></basicviewcode>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.transition('bounce', {
    enterClass: 'bounceInRight',
    leaveClass: 'bounceOutLeft'
})


import basicviewcode from './basic-viewcode.vue'

module.exports = {
  props: ['sign'],
  created () {
    this.signnum = this.sign
    $.get('/getUi/'+this.sign, (data) => {
        this.title = data.ui.title
        this.desc = data.ui.desc
        this.htmlcode = data.ui.htmlcode
        this.csscode = data.ui.csscode
    })
  },
  ready () {
  },
  methods: {
    render () {
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
        let src = ''
        // HTML
        src = baseTpl.replace('</body>', html + '</body>')
        // 内部CSS
        css = '<style>' + css + '</style>'
        src = src.replace('</head>', css + '</head>')
        return src
      }
      let iframe = document.querySelector('#basicDemo'+this.sign)
      let render = () => {
        let source = sourceCode()
        let iframeDoc = iframe.contentDocument
        iframeDoc.open()
        iframeDoc.write(source)
        iframeDoc.close()

      }
      render()
    },
    toggleviewcode () {
      this.basicviewcodeshow = !this.basicviewcodeshow
      //加载数据
      if(this.oneLoad){
        var basicHtmlCode = CodeMirror.fromTextArea(document.getElementById('basicHtmlCode'+this.sign), {
          mode: 'htmlmixed',
          theme: 'dracula',
          tabSize: 4,
          indentUnit: 4,
          value:"2333",
          lineWrapping: true,
          showCursorWhenSelecting: true,
          scrollbarStyle: null,
          autofocus: true
        })

        var basicCssCode = CodeMirror.fromTextArea(document.getElementById('basicCssCode'+this.sign), {
          mode: 'css',
          theme: 'dracula',
          tabSize: 4,
          indentUnit: 4,
          lineWrapping: true,
          scrollbarStyle: null,
          showCursorWhenSelecting: true,
        });
      }
      //获取数据
      $.get('/getUi/'+this.sign, (data) => {
        this.title = data.ui.title
        this.desc = data.ui.desc
        this.htmlcode = data.ui.htmlcode
        this.csscode = data.ui.csscode
        console.log(data)

        basicCssCode.setValue(this.csscode)
        basicCssCode.focus();
        basicCssCode.refresh();
        emmetCodeMirror(basicCssCode)

        basicHtmlCode.setValue(this.htmlcode)
        basicHtmlCode.focus();
        basicHtmlCode.refresh();
        emmetCodeMirror(basicHtmlCode)
        window.localStorage.debugid = data.ui._id
      });

      this.oneLoad = false;

      //实时刷新demo
      basicHtmlCode.on('change', () => {
        this.htmlcode = basicHtmlCode.getValue()
        console.log("htmlchange")
        this.render()
      })
      basicCssCode.on('change', () => {
        this.csscode = basicCssCode.getValue()
        this.render()
      })
    }
  },
  data () {
    return {
      basicviewcodeshow: false,
      signnum: '',
      title: '',
      desc:'',
      htmlcode:'',
      csscode:'',
      oneLoad:true
    }
  },
  components: {
    basicviewcode
  }
}
</script>