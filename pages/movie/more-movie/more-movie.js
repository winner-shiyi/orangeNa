// pages/movie/more-movie/more-movie.js

import { convertToStarsArray, http } from '../../../util/util.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    movieLoading: false, // 上拉加载的变量，默认false，隐藏
    moiveLoadingComplete: false //“没有数据”的变量，默认false，隐藏 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category; // 设置导航标题文字
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl; // 设置请求接口url
    http(dataUrl, this.processDoubanData);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    });
    wx.showNavigationBarLoading();
  },
  processDoubanData: function (moviesDouban) {
    var movies = [];
    if (moviesDouban.subjects.length) {
      moviesDouban.subjects.forEach(function (item, index) {
        var title = item.title;
        if (title.length >= 6) {
          title = title.substring(0, 6) + "...";
        }
        var temp = {
          stars: convertToStarsArray(item.rating.stars),
          title: title,
          average: item.rating.average,
          coverageUrl: item.images.large,
          movieId: item.id
        };
        movies.push(temp);
      });
      var totalMovies = [];
      totalMovies = this.data.movies.concat(movies);
      this.setData({
        movies: totalMovies,
        movieLoading: true
      });
    } else {
      console.log(111);
      this.setData({
        movieLoading: false, //把"上拉加载"的变量设为false，隐藏
        moiveLoadingComplete: true, //把“已加载全部”设为true，显示 
      });
    }

    
    wx.stopPullDownRefresh();
    //隐藏loading状态
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";

    //刷新页面后将页面所有初始化参数恢复到初始值
    this.data.movies = [];
    http(refreshUrl, this.processDoubanData);
    //显示loading状态
    wx.showNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var totalCount = this.data.movies.length;
    //拼接下一组数据的URL
    var nextUrl = this.data.requestUrl +
      "?start=" + totalCount + "&count=20";

    http(nextUrl, this.processDoubanData);
    //显示loading状态
    wx.showNavigationBarLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})