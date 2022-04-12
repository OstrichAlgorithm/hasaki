<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" style="width:400px;">
      <el-form-item label="图标：" prop="iconName">
        <el-popover placement="bottom-start" trigger="click" @show="$refs.icons.reset()" popper-class="popper-class">
          <ui-icons ref="icons" @selected="selectedIcon" />
          <el-input slot="reference" placeholder="手动输入element图标或者点击此处选择图标" v-model="form.iconName"
            style="cursor: pointer;">
            <template slot="prepend">
              <i :class="[form.iconName]"></i>
            </template>
          </el-input>
        </el-popover>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uiIcons from "@/components/Icons";
  export default {
    components: {
      uiIcons
    },
    data() {
      return {
        form: {
          iconName: ''
        }
      }
    },
    methods: {
      selectedIcon(name) {
        this.form.iconName = name
        document.body.click()
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.popper-class {
    max-height: 300px;
    overflow-y: scroll;
  }
</style>
