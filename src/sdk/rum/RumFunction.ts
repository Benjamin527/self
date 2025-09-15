import { datafluxRum } from '@cloudcare/browser-rum';
import {  type customerDataType } from '../RumConfig';


/**
 * 自定义添加action数据
 * @param actionName 
 * @param tags value 可以是string也可以是obj
 */
export function customDefineActions(actionName: string, tags: customerDataType): void {
    datafluxRum && datafluxRum.addAction(actionName, tags);  
}


/**
 * 自定义添加tag
 * @param tagKey tag key
 * @param TagValue value 可以是string也可以是obj
 */
export function customDefineTags(tagKey: string, TagValue: customerDataType): void {
    datafluxRum && datafluxRum.setGlobalContextProperty(tagKey, TagValue);  
}


/**
 * 自定义添加action数据
 * @param actionName 
 * @param tags value 可以是string也可以是obj
 */
export function customDefineErrors(actionName: string, tags: customerDataType): void {
    datafluxRum && datafluxRum.addError(actionName, tags);  
}