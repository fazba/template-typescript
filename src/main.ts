import _code from './main.ts?raw'
import hljs from "highlight.js";
import GUI from 'lil-gui'
import typescript from 'highlight.js/lib/languages/typescript';
import '@/assets/css/index.less'
import 'highlight.js/styles/github-dark.css';
import { mock, Random } from 'mockjs'
hljs.registerLanguage('typescript', typescript);
const code = hljs.highlight('typescript', _code.split('/**********测试代码************/')[2].trim()).value
const doc = document.getElementById('doc') as HTMLDivElement
doc.children[0].innerHTML = code
const gui = new GUI({
  title: '控制面板'
})
gui.add({
  案例代码: true
}, '案例代码').onChange((val: boolean) => {
  doc.style.display = val ? '' : 'none'
})

/**********测试代码************/

import { CSVDownload } from './core'

const csv = new CSVDownload({
  columes: [{
    label: '列名1',
    key: 'a',
  }, {
    label: '列名2',
    key: 'b',
  }, {
    label: '列名3',
    key: 'c',
  }]
})

gui.add({
  '下载CSV文件'() {
    csv.download(mock({
      'data|10-20': [{
        "a|6": '',
        "b|6": '',
        "c|6": ''
      }]
    }).data, Random.string())
  }
}, '下载CSV文件')
