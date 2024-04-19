
const store = new Vuex.Store({
	state: {
		// 初始状态
		isAuthenticated: false
	},
	mutations: {
		// 修改状态的方法
		setAuthenticated(state, newAuthenticated) {
			state.isAuthenticated = newAuthenticated
		},
	},
	actions: {
		// 触发 mutations 的方法
	},
	getters: {
		// 计算状态的方法
	}
});

