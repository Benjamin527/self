import { datafluxRum } from '@cloudcare/browser-rum';
import { RUM_CLIENT_TOKEN, RUM_SITE } from './rumConfig';

//rum init
export function setupRum(): void {
    datafluxRum.init({
        applicationId: 'self',
        site: RUM_SITE,
        clientToken: RUM_CLIENT_TOKEN,
        env: 'dev',
        version: '1.0',
        service: 'self',
        sessionSampleRate: 100,
        sessionReplaySampleRate: 100,
        compressIntakeRequests: true,
        trackInteractions: true,
        traceType: 'ddtrace',
        allowedTracingOrigins: ['https://api.example.com', /https:\/\/.*\.my-api-domain\.com/],
    });
    datafluxRum.startSessionReplayRecording();
}

//添加tag
export function customDefineActions(actionName: string, tags: any): void {
    datafluxRum && datafluxRum.addAction(actionName, tags);  
}



