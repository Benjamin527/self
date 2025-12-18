import { datafluxRum } from '@cloudcare/browser-rum';
import { RUM_CLIENT_TOKEN, RUM_SITE } from '../RumConfig';
import posthog from 'posthog-js';


//rum init
export function setupRum(): void {
    datafluxRum.init({
        applicationId: 'self',
        site: RUM_SITE,
        clientToken: RUM_CLIENT_TOKEN,
        env: 'production',
        version: '1.0.0',
        service: 'self',
        sessionSampleRate: 100,
        sessionReplaySampleRate: 100,
        compressIntakeRequests: true,
        trackInteractions: true,
        traceType: 'ddtrace',
        remoteConfiguration: true,
        allowedTracingOrigins: ['https://api.example.com', /https:\/\/.*\.my-api-domain\.com/],
    });
    datafluxRum.startSessionReplayRecording();
}

export function initPosthog(): void {
    posthog.init('phc_QyR904n1u8ZZx7kzyAmtKoXIuDAQlehaAdrANyHmKIP', {
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-05-24'
      })
}
  