import { datafluxLogs } from "@cloudcare/browser-logs"
import { RUM_CLIENT_TOKEN, RUM_SITE } from './rumConfig';

export function setupLogs():void {
    datafluxLogs.init({
        //datakitOrigin: "<DataKit的域名或IP>", // DK方式接入时需要配置
        clientToken: RUM_CLIENT_TOKEN, // 公网 OpenWay 接入时,需要填写
        site: RUM_SITE, // 公网 OpenWay 接入时,需要填写
        service: 'browser',
        //forwardErrorsToLogs:true
      })      
}


//自定义上报日志
export function customDebugLogs(
  message: string,
  messageBody: object,
  status: Parameters<typeof datafluxLogs.logger.log>[2]
): void {
  datafluxLogs.logger.log(message,messageBody,status);
}
