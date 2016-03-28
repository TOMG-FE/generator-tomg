### 接口：活动列表查询，查询城活动列表

http://pai.ehouse.qq.com/web/act/act_list

参数:
	- start 拉取数据偏移量
	- size 拉取数据量
返回:
	成功:{
		"ret": 0,
		"msg": "ok",
		"errorcode": 0,
		"data": {
			//活动列表
			"list": [{
				//活动ID
				"act_id": "10000001",
				//楼盘ID
				"house_id": "123",
				//楼盘名称
				"house_name": "康泽园",
				//电话
				"phone": "暂无电话",
				//活动状态 [0(未开始), 1(进行中), 2(拍卖结束)]
				"act_status": 2,
				//倒计时
				"count_time": 478073,
				//城市ID
				"city_id": "1",
				//城市名称
				"city_name": "北京",
				//活动开始时间
				"start_time": "2015-12-10 00:00:00",
				//活动结束时间
				"end_time": "2015-12-31 23:59:00",
				//标题
				"title": "11111",
				//竞拍标的物
				"auction_name": "11111",
				//起拍价
				"start_price": 12,
				//市场价
				"market_price": 13,
				//报名人数
				"apply_count": 0
			}]
		}
	}


### 接口：获取拍卖简单信息

http://pai.ehouse.qq.com/web/act/act_info_base

参数：
	- act_id 活动ID

返回：
	成功: {
		"ret": 0,
		"msg": "ok",
		"errorcode": 0,
		"data": {
			"act_id": "10000016",
			"act_status": 1,
			"enroll_count": "4",
			"start_price": 1090,
			"cur_price": 2740,
			"final_price": 2740,
			"start_time": "2015-12-10 00:00:00",
			"end_time": "2015-12-31 23:59:00",
			"time_stamp": "2015-12-16 15:46:26"
		}
	}

### 接口：获取拍卖详细信息

http://pai.ehouse.qq.com/web/act/act_info

拍卖详情，出价记录需要统一接口：

参数：
	- act_id 活动ID
	- start 拉取出价列表偏移量
	- size 拉取出价列表数据量

返回：
	成功：{
		"ret": 0,
		"msg": "ok",
		"errorcode": 0,
		"data": {
			//活动ID
			"act_id": "10000016",
			//活动状态 act_status  [0(未开始), 1(进行中), 2(拍卖结束)]
			"act_status": 2,
			//出价次数
			"bid_count": 11,
			//出价人数
			"bid_users": "2",
			//我的出价次数
			"my_bid_count": "6",
			//我的最新出价
			"my_price": 2740,
			//报名人数
			"enroll_count": "1",
			//封顶价格
			"ceil_price": 300000,
			//起拍价格
			"start_price": 1090,
			//当前价格
			"cur_price": 2740,
			//成交价格
			"final_price": 2740,
			//活动开始时间
			"start_time": "2015-12-10 00:00:00",
			//活动结束时间
			"end_time": "2015-12-31 23:59:00",
			//出价记录，按出价时间排序
			"bid_list": [{
				//手机号
				"phone" : "123xxxx5678",
				//用户ID
				"user_id" : "274530943",
				//出价价格
				"price" : 2740,
				//出价时间
				"time" : "2015-12-11 11:43:55"
			}]
		}
	}



### 接口：出价

http://pai.ehouse.qq.com/web/act/price

参数：

	- act_id 活动ID
	- price  出价
	- cur_price 用户看到的当前价
	- start 拉取出价列表偏移量
	- size 拉取出价列表数据量

返回：
	成功：{
		"ret": 0,
		"msg": "ok",
		"errorcode": 0,
		"data": {
			//出价是否成功 [0(失败), 1(成功)]
			"result": 1,
			//出价结果提示信息
			"bid_msg": ""
			//活动ID
			"act_id": "10000016",
			//活动状态 act_status  [0(未开始), 1(进行中), 2(拍卖结束)]
			"act_status": 2,
			//出价次数
			"bid_count": 11,
			//出价人数
			"bid_users": "2",
			//我的出价次数
			"my_bid_count": "6",
			//我的最新出价
			"my_price": 2740,
			//报名人数
			"enroll_count": "1",
			//封顶价格
			"ceil_price": 300000,
			//起拍价格
			"start_price": 1090,
			//当前价格
			"cur_price": 2740,
			//成交价格
			"final_price": 2740,
			//活动开始时间
			"start_time": "2015-12-10 00:00:00",
			//活动结束时间
			"end_time": "2015-12-31 23:59:00",
			//出价记录，按出价时间排序
			"bid_list": [{
				//手机号
				"phone" : "123xxxx5678",
				//用户ID
				"user_id" : "274530943",
				//出价价格
				"price" : 2740,
				//出价时间
				"time" : "2015-12-11 11:43:55"
			}]
		}
	}



### 接口：拍卖活动订单提交

http://pai.ehouse.qq.com/web/act/apply

参数：

	- act_id 活动ID
	- name 姓名
	- phone 手机号

返回：

	成功：{
		"ret": 0,
		"msg": "ok",
		"errorcode": 0,
		"data": {
			//提交结果 [0(失败), 1(成功)]
			"result": 1,
			//支付跳转地址
			"pay_url": "个人中心支付页面还没有完成"
		}
	}

### 接口：支付状态轮询

http://house.wii.qq.com/oc/order/get_pay_status

参数：
	- act_id 活动号
返回：
	成功: {
		"ret": 0,
		"msg": "ok",
		"errorcode": 0,
		"data": {
			//活动ID
			"act_id": "10000016",
			//出价记录
			"bid_list": [{
				//手机号
				"phone" : "123xxxx5678",
				//用户ID
				"user_id" : "274530943",
				//出价价格
				"price" : 2740,
				//出价时间
				"time" : "2015-12-11 11:43:55"
			}]
		}
	}

### 接口：报名记录

http://house.wii.qq.com/oc/order/get_apply_status

参数：
	- act_id 活动号
返回：
	成功: {
		"ret": 0,
		"msg": "ok",
		"errorcode": 0,
		"data": {
			//活动ID
			"act_id": "10000016",
			//出价记录
			"apply_list": [{
				//手机号
				"phone" : "123xxxx5678",
				//用户ID
				"user_id" : "274530943",
				//用户名称
				'user_name' : "xxx",
				//报名时间
				"time" : "2015-12-11 11:43:55"
			}]
		}
	}
