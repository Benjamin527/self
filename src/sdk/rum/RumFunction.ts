import { datafluxRum } from '@cloudcare/browser-rum';
import type { customerDataType } from '../RumConfig';
import type { User } from '@cloudcare/browser-core';


/**
 * 自定义添加action数据
 * @param actionName 
 * @param tags value 可以是string也可以是obj
 */
export function customDefineActions(actionName: string, tags: customerDataType): void {
    datafluxRum.addAction(actionName, tags);  
}


/**
 * 自定义添加tag
 * @param tagKey tag key
 * @param TagValue value 可以是string也可以是obj
 */
export function customDefineTags(tagKey: string, TagValue: customerDataType): void {
    datafluxRum.setGlobalContextProperty(tagKey, TagValue);  
}   


/**
 * 自定义添加action数据
 * @param actionName 
 * @param tags value 可以是string也可以是obj
 */
export function customDefineErrors(actionName: string, tags: customerDataType): void {
    datafluxRum.addError(actionName, tags);  
}

/**
 * 自定义设置用户信息
 * @param user 用户信息对象
 */
export function customDefineUserInfo(user: User): void {
   datafluxRum.setUser(user);  
}