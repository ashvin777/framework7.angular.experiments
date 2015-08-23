angular.module("RootCtrl", [])

.controller("RootCtrl", ["$rootScope", "$scope","$compile",
    function($rootScope, $scope, $compile) {

        $scope.nodes = $(".mobile-view");
        var classNameCount = 0;
        $scope.nodes.find("*").each(function(index,el) {
            $(el).attr("data-id",classNameCount);
            el["generator"] = classNameCount++;
        });
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

        $scope.showNode = function(e){
            var el = $(e.currentTarget);

            //console.log( $(el) );
            $(el).next().toggle(100);

            console.log( el );
            $(el).toggleClass("close");
        }

        $scope.mergeClass = function(classes){
            var merged = "";
            if(classes){
                classes = classes.split(" ");
                if( classes.length > 0){
                    //console.log(classes);
                    classes.forEach(function(v){
                        merged += "."+v;
                    });
                    return merged;
                } else {
                    return;
                }
            }
        }

        $scope.onNodeHover = function(event){
            var el = event.currentTarget;
            var id = $(el).data("id");
            // console.log(event);
            if( id != "" ){
                $(".mobile-view").find("._hover").removeClass("_hover");
                $(".mobile-view").find("[data-id="+id+"]").addClass("_hover");

                //console.log( $(".mobile-view").find("[data-id="+id+"]") );
            }
            $(".center-view").find("._hover").removeClass("_hover");
        }

        $scope.getLabel = function(id){
            try{
                if( id != "" ){
                    var txt = $(".mobile-view").find("[data-id="+id+"]")[0].childNodes[0].data;
                    //console.log(txt);
                    return txt;
                }
            } catch(e){
                return "";
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
        	// $rootScope.pageTree= [];
        	// $(".mobile-view").find("*").each(function(index,value){
        	// 	value.class = "";
        	// 	value.classList.forEach(function(v){
        	// 		value.class += "."+v;
        	// 	});
        	// 	$rootScope.pageTree.push(value);
        	// });

            console.log($rootScope.nodes);
        }
        generatePageTree();

    }
]);