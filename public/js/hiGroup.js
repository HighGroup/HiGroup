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
            if(oActivityName.val()!=null){
                newActivity.activityName=oActivityName.val();
            }
            if(oActivityPlace.val()!=null){
                newActivity.activityLocation=oActivityPlace.val();
            }
            if(oActivityTime.val()!=null){
                newActivity.activityDate=oActivityTime.val();
            }
            if(oActivityDescription.val()!=null){
                newActivity.activityContent=oActivityDescription.val();
            }
            var iPayWay = $("input[name='PayWay']:checked").val();
            if(iPayWay==1){
                newActivity.activityPaystyle="AA";
            }
            else{
                if(oWhoPay.val()!=null){
                    newActivity.activityPaystyle=oWhoPay.val();
                }
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
            


              $(oActivityWhoPay).html(sPay);

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
              },{
                success:function(model){
                    var oParticipatedUserOfActivity=new ParticipatedUserOfActivity();
                    oParticipatedUserOfActivity.save({
                        activity:   model,
                        user:       AV.User.current(),
                        ACL:        new AV.ACL(AV.User.current())
                    },{
                        success:function(oParticipatedUserOfActivity)
                        {
//                            alert(JSON.stringify(oParticipatedUserOfActivity));
                        },
                        error:function(oParticipatedUserOfActivity,err)
                        {
                            alert(error.message);
                        }
                    });
                    alert("发布成功");
                    var self = this;
                    new UserZoomView();//进入个人中心
                    self.undelegateEvents();
                    delete self;
                },
                error:function(error){
                    alert(error.message);
                }
            });
            
//            var relation=AV.User.current().relation("participate");
//            relation.add(listActivity.get(listActivity.at(0).id));
        }

	});
	//活动报名页

	var ActivityApplyView = AV.View.extend({

		el: "#content",
		template: _.template($("#template-page_apply_activity").html()),
		initialize: function() {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            this.render();
            var aSpans = $("dl.activity_list span");
            var sPay="";
            if(newActivity.activityPaystyle=="AA"){
                sPay="[AA制]";
            }
            else{
                sPay="["+newActivity.activityPaystyle+"]"+"请客";
            }
            $(aSpans[4]).html(sPay);
            
            var list_participate=$("dl.activity_list ul");
            
            var oPUOA=new ParticipatedUserOfActivity();
            
            oPUOA.query=new AV.Query(ParticipatedUserOfActivity);
            
            oPUOA.query.equalTo("activity",this.model);
            oPUOA.query.find({
                success:function(results){
                    //alert(JSON.stringify(results));
                    for(var i=0;i<results.length;i++){
                        var oUserInfo=new UserInfo();
                        oUserInfo.query=new AV.Query(UserInfo);
                        oUserInfo.query.equalTo("user",results[i].get("user"));
                        alert(results[i].getCreatedAt().toDateString());
                        this.datestring=results[i].getCreatedAt().toDateString();
                        oUserInfo.query.first({
                            success:function(oUserInfo){
                                $(list_participate).append("<li><span>"+i+"."+oUserInfo.get("nickName")+"</span><span>"+this.datestring+"</span></li>");
                            },
                            error:function(error){
                                alert(error.message);
                            }
                        });
                        
                    }
                },
                error:function(results,error){
                    alert(error.message);
                }
            });
            
            //$(list_participate).html("");
            //$(list_participate).append("<li><span>1.周宇世强</span><span>昨天</span></li>");
            
		},

		events: {
			"click div.user.right i.user":"goUserZoomView",
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
            var oPUOA=new ParticipatedUserOfActivity();
            
            oPUOA.query=new AV.Query(ParticipatedUserOfActivity);
            
            oPUOA.query.equalTo("activity",this.model);
            oPUOA.query.equalTo("user",AV.User.current());
            
            oPUOA.query.first({
                success:function(oPUOA){
                    alert(JSON.stringify(oPUOA));
                    if(oPUOA==null){
                        oPUOA=new ParticipatedUserOfActivity();
                        oPUOA.save({
                            activity:   this.model,
                            user:       AV.User.current(),
                            ACL:        new AV.ACL(AV.User.current())
                        },{
                            success:function(oPUOA)
                            {
//                              alert(JSON.stringify(oParticipatedUserOfActivity));
                            },
                            error:function(oParticipatedUserOfActivity,err)
                            {
                                alert(error.message);
                            }
                        });
                        alert("报名成功");
                    }
                    else{
                        alert("你已经报名过了");
                    }
                },
                error:function(error){
                    alert(error.message);
                }
            });
            
            
			//alert("报名成功！");
		},
		

		render: function() {
			//this.$el.html(this.template); //加载活动发布界面
            this.$el.html(this.template(this.model.toJSON()));
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
        if (!this.get("activityDate")) {
            this.set({"activityDate": this.defaults.activityDate});
        }
        if (!this.get("activityName")) {
            this.set({"activityName": this.defaults.activityName});
        }
        if (!this.get("activityLocation")) {
            this.set({"activityLocation": this.defaults.activityLocation});
        }
        if (!this.get("activityContent")) {
            this.set({"activityContent": this.defaults.activityContent});
        }
        if (!this.get("activityState")) {
            this.set({"activityState": this.defaults.activityState});
        }
        if (!this.get("activityPaystyle")) {
            this.set({"activityPaystyle": this.defaults.activityPaystyle});
        }
        
        
      //this.save();
    }
  });
    
    
    // UserInfo 模型
    var UserInfo=AV.Object.extend("UserInfo",{
        // Default attributes for the UserInfo.
        defaults: {
            nickName:""
        },

        // 确保每个UserInfo都有 属性`
        initialize: function() {
          
        }
    
    });
    // ParticipatedUserOfActivity 模型
    var ParticipatedUserOfActivity=AV.Object.extend("ParticipatedUserOfActivity",{
        // Default attributes for the ParticipatedUserOfActivity.
        defaults: {
        },

        // 确保每个ParticipatedUserOfActivity都有 属性`
        initialize: function() {
        }
    });
   
  // Activity Collection
  // ---------------

  var ActivityList = AV.Collection.extend({

    //引用 这个集合的model
    model: Activity

  }); 
   
    
    // Activity Collection
  // ---------------

  var PUOAList = AV.Collection.extend({

    //引用 这个集合的model
    model: ParticipatedUserOfActivity

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
    	new ActivityApplyView({model: this.model});
    	self.undelegateEvents();
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

            oUserInfo.query=new AV.Query(UserInfo);
            oUserInfo.query.equalTo("user", AV.User.current());
            oUserInfo.bind("changed",this.updateNickname);
            oUserInfo.query.first({
                success:function(oUserInfo){
                    if(oUserInfo!=null){
                        $(".userName").html(oUserInfo.get("nickName"));
                    }
                    else{
                        oUserInfo=new UserInfo();
                        oUserInfo.set("nickName",AV.User.current().get("username"));
                        oUserInfo.save({    
                        user:    AV.User.current(),
                        ACL:     new AV.ACL(AV.User.current())
                        }, {
                        success: function(oUserInfo) {
                        // The object was saved successfully.
                        },
                        error: function(oUserInfo, error) {
                        // The save failed.
                        // error is a AV.Error with an error code and description.
                            alert(error.message);
                        }}
                        );
                    }
                 
                },
                error:function(oUserInfo,error){
                    alert(error.message);
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
	//		delete self;
        },
        
        updateNickname:function(userinfo){
            $(".userName").html(userinfo.get("nickName"));
        },

 

		render: function() {
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
            _.bindAll(this,"okChangeNickname");

			this.render();
		},

		events: {
        "click div.accountInfoTitle i.back":"goUserZoom",
        "click #btn_exitAccount":"exit_account",
        "click #btn_okAccountInfo":"okChangeNickname",
		},

		render: function() {
			this.$el.html(this.template); //加载界面
            //alert(JSON.stringify(oUserInfo));
            oUserInfo.query=new AV.Query(UserInfo);
            oUserInfo.query.equalTo("user", AV.User.current());
            
            oUserInfo.query.first({
                success:function(oUserInfo){
                    if(oUserInfo!=null){
                        $("div.accountInfo .input_nickName").val(oUserInfo.get("nickName"));
                    }                 
                },
                error:function(oUserInfo,error){
                    alert(error.message);
                }
            });
            
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

            
            
            oUserInfo.query=new AV.Query(UserInfo);
            oUserInfo.query.equalTo("user", AV.User.current());
            
            oUserInfo.query.first({
                success:function(oUserInfo){
                    if(oUserInfo!=null){
                        oUserInfo.set("nickName",_nickName);
                        oUserInfo.save(null, {
                        success: function(oUserInfo) {
                        // The object was saved successfully.
                        },
                        error: function(oUserInfo, error) {
                        // The save failed.
                        // error is a AV.Error with an error code and description.
                            alert(error.message);
                        }}
                        );
                    }
                    else{
                        oUserInfo=new UserInfo();
                        oUserInfo.set("nickName",AV.User.current().get("username"));
                        oUserInfo.save({    
                        user:    AV.User.current(),
                        ACL:     new AV.ACL(AV.User.current())
                        }, {
                        success: function(oUserInfo) {
                        // The object was saved successfully.
                        },
                        error: function(oUserInfo, error) {
                        // The save failed.
                        // error is a AV.Error with an error code and description.
                            alert(error.message);
                        }}
                        );
                    }
                 
                },
                error:function(oUserInfo,error){
                    alert(error.message);
                }
            });
            
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
    var oUserInfo=new UserInfo();
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