<template>
	<div class="security">
		<div class="securityCon">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="原密码" prop="age">
				<el-input :type="firpass" ref='fir' v-model="ruleForm.age" placeholder="请输入原密码"></el-input>
				<div @click="fi">
					<img v-if="firs" class="closeeyes" src="@/assets/images/closeeyes.png">
					<i v-if="!firs"  class="el-icon-view closeeyes"></i>
				</div>
			  </el-form-item>
			  <el-form-item label="新密码" prop="pass">
				<el-input :type="secpass" v-model="ruleForm.pass" placeholder="请输入新密码"></el-input>
				<div @click="se">
					<img v-if="secend" class="closeeyes" src="@/assets/images/closeeyes.png">
					<i v-if="!secend" class="el-icon-view closeeyes"></i>
				</div>
				
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
				<el-input :type="thrpass" v-model="ruleForm.checkPass" placeholder="请确认密码"></el-input>
				<div @click='th'>
					<img v-if="three" class="closeeyes" src="@/assets/images/closeeyes.png">
					<i v-if="!three"  class="el-icon-view closeeyes"></i>
				</div>
			  </el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>  
			</el-form>
		</div>
		
		
	</div>
</template>

<script>
	  export default {
	    data() {
	      var checkAge = (rule, value, callback) => {
	        if (!value) {
	          return callback(new Error('原密码不正确'));
				}
			}
	      var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入新密码'));
	        } else {
	          if (this.ruleForm.checkPass !== '') {
	            this.$refs.ruleForm.validateField('checkPass');
	          }
	          callback();
	        }
	      }
	      var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.ruleForm.pass) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	      };
	      return {
	        ruleForm: {
	          pass: '',
	          checkPass: '',
	          age: ''
	        },
	        rules: {
	          pass: [
	            { validator: validatePass,required: true, trigger: 'blur' }
	          ],
	          checkPass: [
	            { validator: validatePass2,required: true, trigger: 'blur' }
	          ],
	          age: [
	            { validator: checkAge,required: true, trigger: 'blur' }
	          ]
	        },
			firs:true,
			firpass:'password',
			secend:true,
			secpass:'password',
			three:true,
			thrpass:'password'
	      }
	  },
	  methods: {
	        submitForm(formName) {
	          this.$refs[formName].validate((valid) => {
	            if (valid) {
	              alert('submit!');
	            } else {
					this.$message({
					          message: '请正确填写信息',
					          type: 'error',
							  offset:100
					        });
	              return false;
	            }
	          });
	        },
			fi(){
				if(this.firpass=='password'){
					this.firpass='text'
				}else{
					this.firpass='password'
				}
				this.firs=!this.firs
			},
			se(){
				if(this.secpass=='password'){
					this.secpass='text'
				}else{
					this.secpass='password'
				}
				this.secend=!this.secend
			},
			th(){
				if(this.thrpass=='password'){
					this.thrpass='text'
				}else{
					this.thrpass='password'
				}
				this.three=!this.three
			},
			
	      }
}
</script>

<style scoped>
	.security{
		width:100%;
		margin-top: 0.8rem;
		display: flex;
		justify-content: center;
	}
	.securityCon{
		width: 8.8rem;
	}
	:deep(.el-input__inner){
		border: 1px solid #C4C4C4B2;
		border-radius: 0.133333rem;
		
	}
	.closeeyes{
		width: 0.346667rem;
		height: 0.16rem;
		position: absolute;
		right: calc(0.346667rem + 9.5px);
		top: calc(50% - 0.08rem);
		color: #51515180;
	}
	:deep(.el-input__suffix){
		display: none;
	}
	.el-button--primary{
		width: 8.8rem;
		border-radius: 0.666667rem;
	}
	
</style>