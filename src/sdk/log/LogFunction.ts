import { datafluxLogs } from "@cloudcare/browser-logs"

//自定义上报日志
export function customDebugLogs(
  message: string,
  messageBody: object,
  status: Parameters<typeof datafluxLogs.logger.log>[2]
): void {
  datafluxLogs.logger.log(message,messageBody,status);
}
