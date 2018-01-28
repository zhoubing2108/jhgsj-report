'use strict';

Page({
    data: {
        message: '请拍摄并上传经营许可证正面',
        files: []
    },
    chooseImage: function chooseImage(e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function success(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        });
    },
    previewImage: function previewImage(e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        });
    },
    bindViewTap: function bindViewTap() {
        wx.navigateTo({
            url: '../photo2/photo2'
        });
    }
});