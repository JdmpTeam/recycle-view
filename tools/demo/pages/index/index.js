const app = getApp()
let data = require('./data')
let j = 1
let originData = data.response.goods;
const systemInfo = jd.getSystemInfoSync()
console.log(systemInfo)
const createRecycleContext = require('miniprogram-recycle-view')

Page({
  data: { 
    systemInfo,
    viewWidth: Math.min(...[systemInfo.screenWidth, systemInfo.windowWidth])
   },
  onLoad: function () {
    const _this = this
    var ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: _this,
      itemSize: function(item, index) {
        return {
          width: _this.data.viewWidth,
          height: 160
        }
      },
      placeholderClass: ['recycle-image', 'recycle-text'],
    })
    this.ctx = ctx;
  },
  onUnload: function () {
    this.ctx.destroy()
    this.ctx = null
  },
  onReady: function () {
    this.showView(true)
  },
  genData: function() {
    j++;
    let newData = originData.map(item => {
      return {
        ...item,
        sku: item.sku + '_' + j
      }
    })
    return newData;
  },
  showView: function (isInit) {
    const ctx = this.ctx
    let newList = originData
    const st = Date.now()
    ctx.splice(newList, () => {
      console.log('【render】deleteList use time', Date.now() - st)
    })
  },
  onPageScroll: function() {}, // 一定要留一个空的onPageScroll函数
  scrollToLower: function(e) {
    // 延迟1s，模拟网络请求
    setTimeout(() => {
      const newList = this.genData()
      this.ctx.append(newList, () => {
        console.log('到底更新数据了')
      })
    }, 500)
  }
})