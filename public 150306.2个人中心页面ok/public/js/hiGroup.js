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
					//mv.control.runPage(mv.page.submitActivity);
					new ActivitySubmitView();
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

		signUp: function(e) {
			var self = this;
			var username = this.$("#signup-username").val();
			var password = this.$("#signup-password").val();

			// 注册
			AV.User.signUp(username, password, {
				ACL: new AV.ACL()
			}, {
				success: function(user) {
					//mv.control.runPage(mv.page.submitActivity);
					new ActivitySubmitView();
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

			this.render();
			//init_SubmitActivity();
		},

		events: {
			"click #i_calendar": "select_date",
			"click #ul_user": "enter_user",
			"click .log-out": "logout",

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
			alert("你点击了用户");
			var user = AV.User.current();
			var username_temp = user.get("username");
		},
		logout: function() {
			var self = this;
			AV.User.logOut();
			new LogInView();
			self.undelegateEvents();
			delete self;
			alert("您已退出");
		},



		//点击 确认 按钮，提交数据
		preview: function() {

			var self = this;
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
		},

		events: {

		},

		render: function() {
			this.$el.html(this.template); //加载活动发布界面
			this.delegateEvents();
		},


	});
	//活动报名页

	var ActivityApplyView = AV.View.extend({

		el: "#content",
		template: _.template($("#template-page_apply_activity").html()),
		initialize: function() {

			this.render();
		},

		events: {

		},

		render: function() {
			this.$el.html(this.template); //加载活动发布界面
			this.delegateEvents();
		},


	});
	
		//个人中心页

	var UserZoomView = AV.View.extend({

		el: "#content",
		template: _.template($("#template-page_userZoom").html()),
		initialize: function() {

			this.render();
		},

		events: {

		},

		render: function() {
			this.$el.html(this.template); //加载界面
			this.delegateEvents();
		},


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
				new ActivitySubmitView();
			} else {
				new LogInView();
			}
		}
	});


	/*底部按钮*/
	$(".onbackToMenu").click(function() {

			AV.User.logOut();
			new LogInView();

	});
		/*************************主程序运行*************************************/


	//加载首页页面

	//加载执行登陆页面
	//new AppView;
	//new LogInView();
	//new SignUpView();
	//new ActivitySubmitView();
	//new ActivityApplyView();
	//new UserZoomView();




});