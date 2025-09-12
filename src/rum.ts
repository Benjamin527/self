import { datafluxRum } from '@cloudcare/browser-rum';

export function setupRum(): void {
    datafluxRum.init({
        applicationId: 'self',
        site: 'https://cn3-rum-openway.guance.com',
        clientToken: '45ba0497a74c4175aee6ee907af788ac',
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


