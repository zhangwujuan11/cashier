import request from '@/utils/request.js'

// 操作员管理列表
export function sysUsers(data){
	return request({
		url:'/mer/sysUsers/listByCondition',
		method:'get',
		params:data
	})
}

// 停用用户
export function addsysuser(data){
	return request({
		url:'/mer/sysUsers/' + data.ap,
		method:'put',
		data:{state:data.state}
	})
}

// 角色列表
export function sysRoles(data){
	return request({
		url:'/mer/Roles',
		method:'get',
		params:data
	})
}

// 选择权限
export function showTree(){
	return request({
		url:'/mer/sysEnts/showTree',
		method:'get'
	})
}
// 新增角色权限
export function plussysRoles(data){
	return request({
		url:'/mer/Roles',
		method:'post',
		data
	})
}
// 角色详情
export function showsysRoles(data){
	return request({
		url:'/mer/Roles/' + data,
		method:'get'
	})
}
// 获取角色已有权限
export function hasroles(data){
	return request({
		url:'/mer/sysRoleEntRelas',
		method:"get",
		params:data
	})
}

// 修改角色
export function changeroles(data){
	return request({
		url:'/mer/Roles/' + data.roleId,
		method:"PUT",
		data:data
	})
}
// 删除角色
export function delrolse(data){
	return request({
		url:'/mer/Roles/' + data,
		method:'DELETE'
	})
}


// 获取角色已有角色
export function hasrrols(data){
	return request({
		url:'/mer/UserRoleRelas',
		method:"get",
		params:data
	})
}

// 新增操作员
export function apiysUsers(data){
	return request({
		url:'/mer/sysUsers',
		method:'post',
		data
	})
}
// 变更角色
export function relaschan(data){
	return request({
		url:'/mer/UserRoleRelas/relas/' + data.userId,
		method:"POST",
		data:{roleIdListStr:data.roleIdListStr}
	})
}

// 操作员详情
export function sysUsersdata(data){
	return request({
		url:'/mer/sysUsers/' + data,
		method:'get'
	})
}