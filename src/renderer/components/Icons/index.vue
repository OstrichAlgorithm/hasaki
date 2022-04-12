<template>
  <div class="icon-contain">
    <el-input v-model="iconName" @input.native="filterIcons" suffix-icon="el-icon-search" placeholder="请输入图标名称">
    </el-input>
    <ul>
      <li v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
        <el-button :icon="item" size="mini" circle></el-button>
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  // import fontawesome from '@/common/data.js'
  export default {
    name: 'selectIcons',
    data() {
      return {
        iconName: '',
        iconList: ['cw-icon_shijian','cw-icon_biji','cw-icon_shezhi',
    'cw-icon_bianji','cw-icon_shoucang','cw-icon_wode','cw-icon_paihang','cw-icon_zhishiku',
    'cw-icon_fasong','cw-icon_yincang','cw-icon_sousuo','cw-icon_fenxiang',
    'cw-icon_tupian']
      }
    },
    methods: {
      filterIcons() {
        if (this.iconName) {
          this.iconList = this.iconList.filter(item => item.includes(this.iconName))
        } else {
          // this.iconList = fontawesome.iconList
        }
      },
      selectedIcon(iconName) {
        this.$emit('selected', iconName)
      },
      reset() {
        this.iconName = ''
        // this.iconList = fontawesome.iconList
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon-contain {
    width: 400px;
  }

  li {
    list-style: none;
    width: 50%;
    float: left;
    margin: 2px 0;

    span {
      vertical-align: middle;
      margin-left: 4px;
    }
  }
</style>