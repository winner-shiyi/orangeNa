// pages/post/post.js
import postList from '../../data/data.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载,一个页面只会调用一次
   */
  onLoad: function (options) {
    this.setData({
      postList: postList
    })
  },
  /**
   * 生命周期函数--监听页面显示,每次打开页面都会调用
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成,一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('hide--post')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('unload--post')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    
  }
})
