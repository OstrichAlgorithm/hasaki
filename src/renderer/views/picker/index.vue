<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
     
      <el-form-item label="英雄列表">
        <el-select v-model="form.champion_id" placeholder="请选择英雄" filterable  :disabled="form.champion_id_disabled">
          <el-option
            v-for="item in options"
            :key="item.id"
            :value="item.id"
            :label="item.label"
            style="height:72px"
          >

            <span style="float: left">


            <el-image
              style="width: 128px; height: 72px"
              :src="'https://127.0.0.1:'+auth.port+item.baseSplashPath"
              :fit="contain"
            ></el-image>
            
            
            </span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >{{ item.name+'-'+ item.title+'-'+item.alias }}</span
            >
         
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="额外选项">
        <el-checkbox-group v-model="form.ext" :disabled="form.ext_disabled" border="true">
          <el-checkbox label="accept">自动接受对局</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button :type="form.submit_running?'danger':'primary'" @click="onSubmit" >  {{form.submit_running?"停止":"运行"}}</el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
// import Tinymce from "@/components/Tinymce";
import { ipcRenderer } from "electron";
import { Lcu } from "@/api/lcu"
export default {
  mounted() {

    var that =this;
    that.getAuth()
    setInterval(function(){
      return  that.getAuth()
    },10000)
  },
  // components: { Tinymce },
  data() {
    return {
      // lcu：'',
      auth:{
        token:'',
        port:'',
        url_with_auth:'',
      },
      form: {
        champion_id: "",
        champion_id_disabled:false,
        ext: [],
        ext_disabled:false,
        submit_running: false,
        submit_text:''
      },
      options :  []
    
    }

  },
  methods: {
    onSubmit() {
      if( this.form.champion_id=="") {
        this.$message({
          message: "请先选择英雄！",
          type: "warning"
        });
        return false
      }

      this.form.submit_running = !this.form.submit_running
      this.form.champion_id_disabled = this.form.submit_running
      this.form.ext_disabled = this.form.submit_running
      this.$message({
           message: this.form.submit_running?'运行中':'已停止',
           type:  this.form.submit_running?'success':'danger',
        });

          var  that  =  this; 
          this.lcu.pickTask(this.form.champion_id,this.form.ext) 
      //  ipcRenderer.invoke("lcu-pick-task",this.form.champion_id).then((res) => {
      //     that.auth = res
      //   });
    },

   
   
      getAuth(){
        var  that  =  this; 
       ipcRenderer.invoke("lcu-auth").then((res) => {
          that.auth = res
          that.lcu = new Lcu(that.auth.token,that.auth.port)
          that.lcu.ownedChampions().then((res)=>{
            console.log(res)
            that.options =  res
          })
        });
      },
      
     

   
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

