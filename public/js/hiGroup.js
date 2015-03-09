// JavaScript Document



$(function() {

	//LeanCloud初始化
	AV.$ = jQuery;
	AV.initialize(appId, appKey);


	//登陆视图
	var LogInView = AV.View.extend({
		events: {
			"submit form.login-form": "logIn",
			//"submit form.signup-form": "signUp"
			"click .goSignUp": "goSignup"
		},

		el: "#content",

		initialize: function() {

			_.bindAll(this, "logIn", "goSignup");
			this.render();

		},

		logIn: function(e) {
			var self = this;
			var username = this.$("#login-username").val();
			var password = this.$("#login-password").val();
	
			// 登录
			AV.User.logIn(username, password, {
				success: function(user) {
			
					new UserZoomView();
					self.undelegateEvents();
					delete self;



				},

				error: function(user, error) {
					self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
					self.$(".login-form button").removeAttr("disabled");
					alert("username or password error");
				}
			});

			this.$(".login-form button").attr("disabled", "disabled");
			return false;
		},

		goSignup: function(e) {
			var self = this;
			new SignUpView();
			self.undelegateEvents();
			delete self;
			return false;
		},

		render: function() {

			this.$el.html(_.template($("#template-LogIn").html())); //加载页面
			this.delegateEvents();

		}
	});

	//注册视图
	var SignUpView = AV.View.extend({
		events: {
			"submit form.signup-form": "signUp",
			"click .goLogIn": "goLogIn"
		},

		el: "#content",

		initialize: function() {
			_.bindAll(this, "signUp", "goLogIn");
			this.render();
		},

		signUp: function() {
			var self = this;
			var username = this.$("#signup-username").val();
			var password = this.$("#signup-password").val();

			// 注册
			AV.User.signUp(username, password, {
				ACL: new AV.ACL()
			}, {
				success: function(user) {
					//mv.control.runPage(mv.page.submitActivity);
					new UserZoomView();
					self.undelegateEvents();
					delete self;
				},

				error: function(user, error) {
					//self.$(".signup-form .error").html(error.message).show();
					
					alert(error.message);
					self.$(".signup-form button").removeAttr("disabled");
				}
			});

			this.$(".signup-form button").attr("disabled", "disabled");

			return false;
		},

		goLogIn: function(e) {
			var self = this;
			new LogInView();
			self.undelegateEvents();
			delete self;
			return false;
		},

		render: function() {
			this.$el.html(_.template($("#template-SignUp").html()));
			this.delegateEvents();
		}
	});

	//活动发布视图

	var ActivitySubmitView = AV.View.extend({

		el: "#content",
		template: _.template($("#template-page_submit_activity").html()),
		initialize: function() {
            
            //获取对象
            
            var oActivityPlace = $("#activityPlace");
            var oActivityTime = $("#activityTime");
            var oActivityDescription = $("#activityDescription");
            var oAAPay=$("#payAA");
            var oWhoPay=$("#whoPay");
            //var oUserName = $("#ul_user");
            
            
			this.render();
			//init_SubmitActivity();
		},

		events: {
			"click #i_calendar": "select_date",
			"click #ul_user": "enter_user",
			"click #btn_previewActivity": "preview"
		},

		render: function() {
			this.$el.html(this.template); //加载活动发布界面
			this.delegateEvents();
		},

		select_date: function() {
			alert("你点击了时间选择！");
		},

		enter_user: function() {
			var self = this;
			new UserZoomView();//进入个人中心
			self.undelegateEvents();
			delete self;
			
			
		},
        
		

		//点击 确认 按钮，提交数据
		preview: function() {

			var self = this;
            
            //获取对象
            var oActivityName = $("#activityName");
            var oActivityPlace = $("#activityPlace");
            var oActivityTime = $("#activityTime");
            var oActivityDescription = $("#activityDescription");
            var oPayWay = $("input[name='PayWay']");
            var oWhoPay=$("#whoPay");
            //var oUserName = $("#ul_user");	
            
            newActivity.activityName=oActivityName.val();
            newActivity.activityLocation=oActivityPlace.val();
            newActivity.activityDate=oActivityTime.val();
            newActivity.activityContent=oActivityDescription.val();
            var iPayWay = $("input[name='PayWay']:checked").val();
            if(iPayWay==1){
                newActivity.activityPaystyle="AA";
            }
            else{
                newActivity.activityPaystyle=oWhoPay.val();
            }
            
            
			new ActivityPreviewView();
			self.undelegateEvents();
			delete self;

		},

	});
	//活动发布预览

	var ActivityPreviewView = AV.View.extend({

		el: "#content",
		template: _.template($("#template-page_preview_activity").html()),
		initialize: function() {

			this.render();
            var aSpans = $("#div_preview_activity .div_activity_content span");
              var oActivityName=aSpans[0];
              var oActivityUserName=aSpans[1];
              var oActivityTime=aSpans[2];
              var oActivityPlace=aSpans[3];
              var oActivityWhoPay=aSpans[4];
              var oActivityDescription = $("#div_preview_activity .div_activity_content div")[0];

              $(oActivityName).html(newActivity.activityName);
              $(oActivityTime).html(newActivity.activityDate);
              $(oActivityUserName).html(AV.User.current().get("username"));
              $(oActivityPlace).html(newActivity.activityLocation);

              //alert(JSON.stringify(mv.object.user.PayWay));

              var sPay="";
              if(newActivity.activityPaystyle=="AA"){
                  sPay="[AA制]";
              }
              else{
                  sPay="["+newActivity.activityPaystyle+"]"+"请客";
              }


              $(oActivityWhoPay).html();

              $(oActivityDescription).html(newActivity.activityContent);
		},

		events: {
            "click #btn_cancelActivity": "cancelactivity",
            "click #btn_okActivity": "okactivity"

		},

		render: function() {
			this.$el.html(this.template); //加载活动发布界面
			this.delegateEvents();
		},
        
        cancelactivity:function(){
            var self = this;
			new ActivitySubmitView();
			self.undelegateEvents();
			delete self;
        },
        
        okactivity:function(){
            
            listActivity.create({
                activityName: newActivity.activityName,
                activityContent:   newActivity.activityContent,
                activityPaystyle:    newActivity.activityPaystyle,
                activityDate:    newActivity.activityDate,
                activityLocation:    newActivity.activityLocation,                
                user:    AV.User.current(),
                ACL:     new AV.ACL(AV.User.current())
              });
        }

	});
	//活动报名页

	var ActivityApplyView = AV.View.extend({

		el: "#content",
		template: _.template($("#template-page_apply_activity").html()),
		initialize: function() {

			this.render();
		},

		events: {
			
			"click div.activityInfo_opt i.back":"goUserZoomView",
			"click div.activityInfo_opt .btn_toSubmit":"goActivitySubmitView",
			"click div.activityInfo_opt .btn_apply":"doApply",

		},

		goUserZoomView:function(){
			var self = this;
			new UserZoomView();
			self.undelegateEvents();
			delete self;
		},
		
		goActivitySubmitView:function(){
			var self = this;
			new ActivitySubmitView();
			self.undelegateEvents();
			delete self;
		},
		
		doApply:function(){
			alert("报名成功！");
		},
		

		render: function() {
			this.$el.html(this.template); //加载活动发布界面
			this.delegateEvents();
		},


	});
	
	/****************个人中心页*************************************/
	
  // activity 模型
  var Activity = AV.Object.extend("Activity", {
    // Default attributes for the activity.
    defaults: {
    	activityDate:"empty date",
    	activityName:"empty activity name",
        activityLocation: "empty location",
        activityContent: "empty content",
        activityState: true,
        activityPaystyle: "AA"
    },

    // 确保每个activity都有 属性`
    initialize: function() {
      if (!this.get("date")) {
        this.set({"date": this.defaults.date});
      }
      if (!this.get("activityName")) {
        this.set({"activityName": this.defaults.activityName});
      }
      if (!this.get("location")) {
        this.set({"location": this.defaults.location});
      }
      //this.save();
    }

    
  });
    
    
    var UserInfo=AV.Object.extend("UserInfo",{
        // Default attributes for the activity.
        defaults: {
            nickName:""
        },

        // 确保每个activity都有 属性`
        initialize: function() {
          
        }
    
    });

   
  // Activity Collection
  // ---------------

  var ActivityList = AV.Collection.extend({

    //引用 这个集合的model
    model: Activity,

  }); 
   
   
	//个人中心页-我的活动子页面
	 // 一个MyActivityEle的 DOM 元素节点
  var MyActivityEleView = AV.View.extend({

    //是一个list 的tag
    tagName:  "li",

    //加载index.html的节点 #item-template ，作为模板，为后续填充数据作准备
    template: _.template($('#template-activityItem').html()),

    // 一个列表项特定的 DOM 事件
    events: {
     "click i.go":"goActivityPage",
    },

     initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.render();
      
    },

    goActivityPage: function(){
    	
    	var self = this;
    	new ActivityApplyView();
    	self.undeleteEvents();
    	delete self;
    	
    },

    // 渲染一个 item 项
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
   


  });
	
	//个人中心主页
	var UserZoomView = AV.View.extend({

		el: "#content",
		template: _.template($("#template-page_userZoom").html()),
		initialize: function() {
 
 			this.$el.html(this.template); //加载界面
            _.bindAll(this,"addOne","addAll","updateNickname");
            
 			this.activities = new ActivityList; //活动集合
            
            this.activities.query=new AV.Query(Activity);
            this.activities.query.equalTo("user", AV.User.current());

            this.activities.bind('reset',   this.addAll);
            this.activities.fetch();

            ouserInfo.query=new AV.Query(UserInfo);
            ouserInfo.query.equalTo("user", AV.User.current());
            ouserInfo.bind('set',this.updateNickname);
            ouserInfo.query.find({
              success: function(results) {
                  if(results.length==0)
                  {
                    ouserInfo.set("nickName",AV.User.current().get("username"));
                    ouserInfo.save({    
                    user:    AV.User.current(),
                    ACL:     new AV.ACL(AV.User.current())
                    }, {
                    success: function(ouserInfo) {
                    // The object was saved successfully.
                    },
                    error: function(ouserInfo, error) {
                    // The save failed.
                    // error is a AV.Error with an error code and description.
                    }}
                    );
                      
                  }
                  else{
                    var object = results[0];
                    ouserInfo.set("nickName",object.get('nickName'));
                    
                  }
              },
              error: function(error){
//                    ouserInfo.set("nickName",AV.User.current().get("username"));
//                    ouserInfo.save({    
//                    user:    AV.User.current(),
//                    ACL:     new AV.ACL(AV.User.current())
//                    }, {
//                    success: function(ouserInfo) {
//                    // The object was saved successfully.
//                    },
//                    error: function(ouserInfo, error) {
//                    // The save failed.
//                    // error is a AV.Error with an error code and description.
//                    }}
//                );
              }
              
            });
            
            
 			
			this.render();
		},

		events: {
		"click div.user_info i.go":"goAccountInfo",	
		"click #btn_postActivity":"goSubmitActivity",	
		},

          //前往发布活动
        goSubmitActivity:function(){
        	var self = this;
        	new ActivitySubmitView();
        	self.undelegateEvents();
			delete self;
        },
        
        goAccountInfo:function(){
        	var self = this;
        	new AccountInfoView();
        	self.undelegateEvents();
			delete self;
        },
        
        updateNickname:function(userinfo){
            $(".userName").html(userinfo.get("nickName"));
        },


         

		render: function() {
	
	
      
//      var tempItem = new Activity({date:"2015-3-7",
//    	activityName:"挖掘机小伙伴聚餐",
//        location: "五道口日昌餐厅",});
//	
//	      var tempItem2 = new Activity({date:"2015-3-8",
//    	activityName:"挖掘机小伙伴聚餐",
//        location: "五道口日昌餐厅",});
//	         this.activities.add(tempItem);
//	         this.activities.add(tempItem2);
//	         this.activities.add(tempItem);
//	         this.activities.add(tempItem);
//	        this.updateNickname();
			this.addAll(this.activities);
			this.delegateEvents();
		},

         // 加载一个 item项到列表中，把它加到 ul 元素里面
	    addOne: function(activity) {

	      var view = new MyActivityEleView({model: activity});
	     
	      $("#content div.myActivity ul.myActivityList").append(view.render().el);
	     
	    },
	
	    // 加载 collection中的的 items 项
	    addAll: function(collection) {


          var self = this;
		  $("#content div.myActivity ul.myActivityList").html("");

            
	      collection.each(function(o){
	      	self.addOne(o);
	      	});

     
	    },


	});
	
	
				//账号信息页面

	var AccountInfoView = AV.View.extend({

		el: "#content",
		template: _.template($("#template-page_accountInfo").html()),
		initialize: function() {

			this.render();
		},

		events: {
        "click div.accountInfoTitle i.back":"goUserZoom",
        "click #btn_exitAccount":"exit_account",
        "click #btn_okAccountInfo":"okChangeNickname",
		},

		render: function() {
			this.$el.html(this.template); //加载界面
			this.delegateEvents();
		},

        //返回个人中心
        goUserZoom:function(){
        	var self = this;
        	new UserZoomView();
        	self.undelegateEvents();
			delete self;
        },
        
        //退出账号
        exit_account:function(){
        	
        	var self = this;
			AV.User.logOut();
			new LogInView();
			self.undelegateEvents();
			delete self;
        	
        },
        
        //修改昵称
        okChangeNickname:function(){
        	var _nickName = $("#input_nickName").val();
        	var oUser = AV.User.current();
        	//alert(oUser.escape("username"));
        	
        	oUser.set("nickName",_nickName);
            
            var ouserInfo=new UserInfo();
            ouserInfo.query=new AV.Query(UserInfo);
            ouserInfo.query.equalTo("user", AV.User.current());
            ouserInfo.query.find({
              success: function(results) {
                //alert("Successfully retrieved " + results.length + " scores.");
                // Do something with the returned AV.Object values
                //for (var i = 0; i < results.length; i++) {
                  if(results.length<1)
                  {
                      ouserInfo.set("nickName",_nickName);
                    ouserInfo.save({    
                    user:    AV.User.current(),
                    ACL:     new AV.ACL(AV.User.current())
                    }, {
                    success: function(ouserInfo) {
                    // The object was saved successfully.
                    },
                    error: function(ouserInfo, error) {
                    // The save failed.
                    // error is a AV.Error with an error code and description.
                    }}
                    );
                      
                  }
                  else{
                    ouserInfo.set("nickName",_nickName);
                      ouserInfo.save({    
                    user:    AV.User.current(),
                    ACL:     new AV.ACL(AV.User.current())
                    }, {
                    success: function(ouserInfo) {
                    // The object was saved successfully.
                    },
                    error: function(ouserInfo, error) {
                    // The save failed.
                    // error is a AV.Error with an error code and description.
                    }}
                    );
                  }
              },
              error: function(error){
                    ouserInfo.set("nickName",AV.User.current().get("username"));
                    ouserInfo.save({    
                    user:    AV.User.current(),
                    ACL:     new AV.ACL(AV.User.current())
                    }, {
                    success: function(ouserInfo) {
                    // The object was saved successfully.
                    },
                    error: function(ouserInfo, error) {
                    // The save failed.
                    // error is a AV.Error with an error code and description.
                    }}
                );
              }
              
            });
            
            
//            var user = AV.User.logIn("3", "3", {
//              success: function(user) {
//                user.set("username", "my_new_username");  // attempt to change username
//                user.save(null, {
//                  success: function(user) {
//                    // This succeeds, since the user was authenticated on the device
//
//                    // Get the user from a non-authenticated method
//                    var query = new AV.Query(AV.User);
//                    query.get(user.objectId, {
//                      success: function(userAgain) {
//                        userAgain.set("username", "another_username");
//                        userAgain.save(null, {
//                          error: function(userAgain, error) {
//                            // This will error, since the AV.User is not authenticated
//                          }
//                        });
//                      }
//                    });
//                  }
//                });
//              }
//            });

        	
  
        	
        }

	});
	
	// 程序的主体视图，控制 个人中心的视图和 登录视图
	var AppView = AV.View.extend({

		//  跟已经在html里的节点绑定起来，而不是再生成一个元素节点
		el: $("#content"),

		initialize: function() {
			this.render();
		},

		render: function() {
			if (AV.User.current()) {
				//new ActivitySubmitView();
				new UserZoomView();
			} else {
				new LogInView();
			}
		}
	});



		/*************************主程序运行*************************************/

    var newActivity=new Activity;
    var listActivity= new ActivityList;
    var ouserInfo=new UserInfo();
	//加载首页页面

	//加载执行登陆页面
	new AppView;
	//new LogInView();
	//new SignUpView();
	//new ActivitySubmitView();
	//new ActivityApplyView();
	//new UserZoomView();
    //new AccountInfoView();



});