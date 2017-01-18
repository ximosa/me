anandmoghan.constants = {
	tabs:[{
		id: 0,
		name:'Home',
		icon: 'home',
		state: 'home'
	},{
		id: 1,
		name:'Blog',
		icon: 'book',
		state: 'blog.home',
	},{
		id: 2,
		name:'Contact Me',
		icon: 'contacts',
		state: 'contact'
	}],
	albert: {
		teach: {
			types: [{
				key: 'CONVO',
				name: 'Conversations'
			},{
				key: 'QN',
				name: 'Questions'
			},{
				key: 'CMD',
				name: 'Commands'
			}],
			actions: [{
				key: 'NONE',
				name: 'None',
				param_1: 'User\'s Query',
				param_2: 'Albert\'s Response'
			},{
				key: 'LINK',
				name: 'Link Responses',
				param_1: 'Parent Response',
				param_2: 'New Response'
			},{
				key: 'RM',
				name: 'Delete',
				param_1: 'Query',
				param_2: false
			},{
				key: 'CUSTOM',
				name: 'Custom Action',
				param_1: 'Param 1',
				param_2: 'Param 2'
			}]
		}
	}
}