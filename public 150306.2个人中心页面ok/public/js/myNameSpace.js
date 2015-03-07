//	/***********************我的namespace*************************/
//document.write("<script language='javascript' src='hiGroup.js'></script>");
//	var mv = {}; //命名空间
//
//	mv.tools = { //工具
//	};
//
//	mv.content = {};
//
//	mv.method = {
//
//	};
//
//	mv.control = {};
//
//	mv.object = { //对象
//	};
//
//	mv.object.user = { //用户信息
//		default: {
//			username: "zhouyu",
//			password: "123456"
//		},
//
//		PayWay: {
//			aa: true,
//			whoPay: ""
//		}
//	}
//
//
//	mv.page = {
//		login: {
//			template: _.template($("#template-LogIn").html()),
//			init: function() {},
//			update: update_logPage,
//
//		},
//
//
//		signUp: {
//			template: _.template($("#template-SignUp").html()),
//			init: function() {},
//			update: update_signPage,
//
//		},
//
//		submitActivity: {
//			template: _.template($("#template-page_submit_activity").html()),
//			init: init_SubmitActivity,
//			update: update_SubmitActivity,
//		},
//
//		previewActivity: {
//			template: _.template($("#template-page_preview_activity").html()),
//			init: function() {},
//			update: update_previewActivity,
//		},
//
//	};
//
//
//	//活动属性
//	mv.content.activity = {
//		activityName: "聚会",
//		activityPlace: "北京",
//		activityTime: "2015-3-1",
//		activityDescription: "同学聚会",
//		PayWay: {
//			aa: false,
//			whoPay: "zhouyu"
//		}
//	}
//
//	mv.control.runPage = function(oPage) {
//		//加载页面
//		$("#content").html(oPage.template);
//		oPage.init();
//		//更新页面
//		oPage.update();
//
//	}
//
//	function update_logPage() { //更新登陆页面
//		//获取对象
//		var oBtn = $("#btn_log"); //点击登陆按钮
//		var oASign = $(".goSignUp"); //进入注册界面按钮
//		var oUserName = $("#login .input_user");
//		var oUserPassword = $("#login .input_password");
//		oASign.click(function() { //点击进入注册界面按钮
//
//			mv.control.runPage(mv.page.signUp);
//
//		});
//		oBtn.click(function() { //点击登陆按钮后
//
//			if (oUserName.val() && oUserPassword.val()) {
//				mv.object.user.name = oUserName.val();
//				mv.control.runPage(mv.page.submitActivity);
//			} else {
//				alert("用户名或密码空！");
//			}
//
//
//
//		});
//	}
//
//	function update_signPage() { //更新注册页面
//
//		//获取对象
//		var oBtn = $("#btn_signUp");
//		var oALog = $(".goLogIn");
//		var oUserName = $("#signUp .input_user");
//		var oUserPassword = $("#signUp .input_password");
//		oALog.click(function() { //点击登陆按钮
//
//
//			mv.control.runPage(mv.page.login);
//
//		});
//		oBtn.click(function() { //点击注册按钮后
//
//			if (oUserName.val() && oUserPassword.val()) {
//				mv.object.user.name = oUserName.val();
//				mv.control.runPage(mv.page.submitActivity);
//			} else {
//				alert("用户名或密码空！");
//			}
//
//
//		});
//
//
//	}
//
//	function update_SubmitActivity() { //更新发布活动页面
//
//
//		//获取对象
//		var oActivityName = $("#activityName");
//		var oActivityPlace = $("#activityPlace");
//		var oActivityTime = $("#activityTime");
//		var oActivityDescription = $("#activityDescription");
//		var oAAPay = $("#payAA");
//		var oWhoPay = $("#whoPay");
//		var oUserName = $("#ul_user");
//
//		var self = $(document);
//
//
//
//		if (mv.object.user.name)
//			oUserName.html(mv.object.user.name);
//
//
//
//
//		//点击日历
//		var oCalendar = $("#i_calendar");
//		oCalendar.mousedown(function() {
//			oCalendar.addClass("pressDown");
//		});
//		oCalendar.mouseup(function() {
//			oCalendar.removeClass("pressDown");
//		});
//
//
//
//
//		oCalendar.click(function() {
//			alert("你点击了时间选择！");
//		});
//
//		$("#ul_user").click(function() {
//			alert("你点击了用户");
//			var user = AV.User.current();
//			var username_temp = user.get("username");
//		});
//
//		$(".log-out").click(function() {
//			AV.User.logOut();
//			new LogInView();
//			this.undelegateEvents();
//			delete this;
//			alert("您已退出");
//		});
//
//		//属性改变后更新
//		$(document).change(function() {
//			mv.object.user.activityName = oActivityName.val();
//			mv.object.user.activityPlace = oActivityPlace.val();
//			mv.object.user.activityTime = oActivityTime.val();
//			mv.object.user.activityDescription = oActivityDescription.val();
//
//
//
//			var iPayWay = $("input[name='PayWay']:checked").val();
//			if (iPayWay == 1) {
//				mv.object.user.PayWay = {
//					aa: true,
//					whoPay: ""
//				};
//			} else {
//
//				mv.object.user.PayWay = {
//					aa: false,
//					whoPay: oWhoPay.val()
//				};
//
//			}
//			//alert("abc");
//
//			//alert("1:"+JSON.stringify(mv.object.user.PayWay));
//
//		});
//
//
//
//		//点击返回菜单界面
//		$(".onbackToMenu").click(function() {
//
//			mv.control.runPage(mv.page.login);
//
//		});
//
//		//点击 确认 按钮，提交数据
//		$("#btn_previewActivity").click(function() {
//
//
//			//alert(JSON.stringify(mv.content.activity));
//			//alert("提交成功！");
//			//alert(JSON.stringify(mv.object.user.PayWay));
//			mv.control.runPage(mv.page.previewActivity);
//
//		});
//
//	}
//
//
//	function init_SubmitActivity() { //初始化发布活动页面
//
//
//		//获取对象
//		var oActivityName = $("#activityName");
//		var oActivityPlace = $("#activityPlace");
//		var oActivityTime = $("#activityTime");
//		var oActivityDescription = $("#activityDescription");
//		var oPayWay = $("input[name='PayWay']");
//		var oWhoPay = $("#whoPay");
//		var oUserName = $("#ul_user");
//
//		var self = $(document);
//
//		if (mv.object.user.name)
//			oUserName.html(mv.object.user.name);
//
//		//初始化值
//
//		oActivityName.val(mv.object.user.activityName);
//		oActivityPlace.val(mv.object.user.activityPlace);
//		oActivityTime.val(mv.object.user.activityTime);
//		oActivityDescription.val(mv.object.user.activityDescription);
//
//
//		//alert("2:"+JSON.stringify(mv.object.user.PayWay));
//
//		if (mv.object.user.PayWay.aa == true) {
//
//			oPayWay.eq(0).attr("checked", "checked");
//			oPayWay.eq(1).removeAttr("checked");
//			oWhoPay.val("");
//		} else {
//
//			oPayWay.eq(1).attr("checked", "checked");
//			oPayWay.eq(0).removeAttr("checked");
//			oWhoPay.val(mv.object.user.PayWay.whoPay);
//		}
//
//		oUserName.val(AV.User.current().escape("username"));
//		//alert("he");
//
//	}
//
//
//
//	/*更新活动发布预览页面*/
//
//	function update_previewActivity() {
//
//		var aSpans = $("#div_preview_activity .div_activity_content span");
//		var oActivityName = aSpans[0];
//		var oActivityUserName = aSpans[1];
//		var oActivityTime = aSpans[2];
//		var oActivityPlace = aSpans[3];
//		var oActivityWhoPay = aSpans[4];
//		var oActivityDescription = $("#div_preview_activity .div_activity_content div")[0];
//
//		$(oActivityName).html(mv.object.user.activityName);
//		$(oActivityTime).html(mv.object.user.activityTime);
//		$(oActivityUserName).html(mv.object.user.name);
//		$(oActivityPlace).html(mv.object.user.activityPlace);
//
//		//alert(JSON.stringify(mv.object.user.PayWay));
//
//		var sPay = "";
//		if (mv.object.user.PayWay.aa) {
//			sPay = "[AA制]";
//		} else {
//			sPay = "[" + mv.object.user.PayWay.whoPay + "]" + "请客";
//		}
//
//
//		$(oActivityWhoPay).html(sPay);
//
//		$(oActivityDescription).html(mv.object.user.activityDescription);
//
//
//
//		$("#btn_cancelActivity").click(function() { //点击取消发布
//
//			mv.control.runPage(mv.page.submitActivity);
//
//		});
//
//
//		$("#btn_okActivity").click(function() { //点击确认发布
//
//			alert("发布成功！");
//
//		});
//
//	}
