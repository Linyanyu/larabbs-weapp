import wepy from 'wepy'
import api from '@/utils/api'

export default class unreadCount extends wepy.mixin {
  data = {
    interval: null,
    unreadCount: 0
  }

  onShow() {
    this.updateUnReadCount()
    this.interval = setInterval(() => {
      this.updateUnReadCount()
    }, 30000)
  }
  onHide() {
    clearInterval(this.interval)
  }
  updateUnReadCount() {
    this.unreadCount = this.$parent.globalData.unreadCount
    this.$apply()

    if (this.unreadCount) {
      wepy.setTabBarBadge({
        index: 1,
        text: this.unreadCount.toString()
      })
    } else {
      wepy.removeTabBarBadge({
        index: 1
      })
    }
  }
}
