angular.module("RootCtrl", [])

.controller("RootCtrl", ["$rootScope", "$scope","$compile",
    function($rootScope, $scope, $compile) {

        var mobileView = $(".mobile-view");
        $rootScope.selectedIndex = 0;
        $rootScope.components = [{
            "label": "+ View",
            "type": "view"
        }, {
            "label": "+ Page",
            "type": "page"
        }, {
            "label": "+ Navbar",
            "type": "navbar"
        }];

        $rootScope.pageTree = [];

        $scope.add = function(type) {
            switch (type) {
                case "view":
                    addView();
                    break;
                case "page":
                    addPage();
                    break;
                case "navbar":
                    addNavbar();
                    break;
                default:
                    break;
            }
        }

        $scope.selectElement = function(index){
        	$rootScope.selectedIndex = index;
        }

        function addView() {
            var template = '<div class="view">\
                            <div class="pages navbar-fixed">\
                              <div data-page="index" class="page">\
                              </div>\
                            </div>\
                          </div>';

            //template = $compile( angular.element(template) )($rootScope);            
            // Template7.compile(template);

            //mobileView.find(".views").append(template);
            //Template7.compile(template);

            $($rootScope.pageTree[$rootScope.selectedIndex]).append(template);

            generatePageTree();

        }

        function addNavbar(){
        	var template = '<div class="navbar">\
              <div class="navbar-inner">\
                <div class="left"><a href="#" class="open-panel link icon-only"><i class="icon icon-f7"></i></a></div>\
                <div class="center">Framework7.angular Creator</div>\
              </div>\
            </div>';

            $($rootScope.pageTree[$rootScope.selectedIndex]).append(template);
            generatePageTree();
        }

        function generatePageTree(){
        	$rootScope.pageTree= [];
        	$(".mobile-view").find("*").each(function(index,value){
        		value.class = "";
        		value.classList.forEach(function(v){
        			value.class += "."+v;
        		});
        		$rootScope.pageTree.push(value);
        	});
        }
        generatePageTree();

    }
]);