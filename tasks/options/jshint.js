module.exports = {
	options: {
		curly: true,
		eqeqeq: true,
		eqnull: true,
		browser: true,
		globals: {
			$: true,
			module: true,
			jQuery: true,
			require:true
		},
	},
	beforeconcat: ['src/*.js']
}



// {
// 	"esnext":true,
// 	"node":true,
// 	"debug":true,
// 	"undef": true,
// 	"jquery": true,
// 	"browser": true
// }