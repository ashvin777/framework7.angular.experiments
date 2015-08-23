angular.module('starter', ["framework7.angular","RootCtrl"])

.run(["$AppBootloader",function($AppBootloader){
    $AppBootloader.registerAngularCompiler();
    
}])

.config(["$rootScopeProvider",function($rootScopeProvider){
	$rootScopeProvider.digestTtl(1000);
}]);
