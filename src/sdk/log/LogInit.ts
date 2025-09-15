import { datafluxLogs } from "@cloudcare/browser-logs"
import { RUM_CLIENT_TOKEN, RUM_SITE } from '../RumConfig';

export function setupLogs():void {
    datafluxLogs.init({
        //datakitOrigin: "<DataKit的域名或IP>", // DK方式接入时需要配置
        clientToken: RUM_CLIENT_TOKEN, // 公网 OpenWay 接入时,需要填写
        site: RUM_SITE, // 公网 OpenWay 接入时,需要填写
        service: 'browser',
        //forwardErrorsToLogs:true
      })      
}

