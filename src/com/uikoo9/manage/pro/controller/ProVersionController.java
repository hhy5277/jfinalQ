package com.uikoo9.manage.pro.controller;

import com.jfinal.aop.Before;
import com.uikoo9.manage.pro.model.ProVersionModel;
import com.uikoo9.util.jfinal.QController;
import com.uikoo9.util.jfinal.QControllerUrl;
import com.uikoo9.z.interceptor.ProDetailsInterceptor;

/**
 * 项目明细controller
 * @author uikoo9
 */
@QControllerUrl("/pro/version")
public class ProVersionController extends QController{
	
	/**
	 * 跳转到首页 
	 */
	public void index(){
		setAttr("qpage", listBySql(getParaMap(), " (select pv.*,pd.pro_name pname from t_pro_version pv, t_pro_detail pd where pv.pro_detail_id=pd.id ) as pdv ", "pdv"));
		render("/WEB-INF/view/manage/pro/pro-version-index.ftl");
	}
	
	/**
	 * 跳转到保存修改页 
	 */
	@Before(ProDetailsInterceptor.class)
	public void savep(){
		setAttr("row", getRow(ProVersionModel.class));
		render("/WEB-INF/view/manage/pro/pro-version-input.ftl");
	}
	
	/**
	 * 保存或修改
	 */
	public void save(){
		renderJson(save(ProVersionModel.class));
	}
	
	/**
	 * 删除一条或多条
	 */
	public void del(){
		renderJson(del(ProVersionModel.class));
	}
	
}