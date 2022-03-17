/* eslint-disable */
import { handler } from '../../app';
import { TestHelper } from './test-helper';
import { ValidationException } from '../../Exceptions/validation-exception';
import { AuditEvent } from '../../protobuf/audit-event';
import { AuditEvent as UnknownAuditEvent } from '../../tests/test-protobuf/unknown-audit-event';

describe('Unit test for app handler', function () {
    let consoleWarningMock: jest.SpyInstance;

    beforeEach(() => {
        consoleWarningMock = jest.spyOn(global.console, 'warn');
    });

    afterEach(() => {
       consoleWarningMock.mockRestore();
    });

    it('successfully stringifies an SQS event', async () => {
        const expectedResult =
            '[{"event_id":"66258f3e-82fc-4f61-9ba0-62424e1f06b4","request_id":"43143-233Ds-2823-283-dj299j1","session_id":"c222c1ec","client_id":"some-client","timestamp":"2021-01-01T01:01:01.000Z","timestamp_formatted":"2021-01-23T15:43:21.842","event_name":"AUTHENTICATION_ATTEMPT","user":{"id":"a52f6f87","email":"foo@bar.com","phone":"07711223344","ip_address":"100.100.100.100"},"platform":{"keyValuePair":[{"key":"xray_trace_id","value":"24727sda4192"}]},"restricted":{"keyValuePair":[{"key":"experian_ref","value":"DSJJSEE29392"}]},"extensions":{"keyValuePair":[{"key":"response","value":"Authentication successful"}]},"persistent_session_id":"some session id"}]';

        const exampleMessage: AuditEvent = {
            event_id: '66258f3e-82fc-4f61-9ba0-62424e1f06b4',
            request_id: '43143-233Ds-2823-283-dj299j1',
            session_id: 'c222c1ec',
            client_id: 'some-client',
            timestamp: new Date('2021-01-01T01:01:01.000Z'),
            timestamp_formatted: '2021-01-23T15:43:21.842',
            event_name: 'AUTHENTICATION_ATTEMPT',
            user: {
                id: 'a52f6f87',
                email: 'foo@bar.com',
                phone: '07711223344',
                ip_address: '100.100.100.100',
            },
            platform: {
                keyValuePair: [
                    {
                        key: 'xray_trace_id',
                        value: '24727sda4192',
                    },
                ],
            },
            restricted: {
                keyValuePair: [
                    {
                        key: 'experian_ref',
                        value: 'DSJJSEE29392',
                    },
                ],
            },
            extensions: {
                keyValuePair: [
                    {
                        key: 'response',
                        value: 'Authentication successful',
                    },
                ],
            },
            persistent_session_id: 'some session id',
        };

        const sqsEvent = TestHelper.createSQSEventWithEncodedMessage(TestHelper.encodeAuditEvent(exampleMessage));

        const result = await handler(sqsEvent);

        expect(result).toEqual(expectedResult);
    });

    it('successfully stringifies an SNS event', async () => {
        const expectedResult =
            '[{"event_id":"66258f3e-82fc-4f61-9ba0-62424e1f06b4","request_id":"43143-233Ds-2823-283-dj299j1","session_id":"c222c1ec","client_id":"some-client","timestamp":"2021-01-01T01:01:01.000Z","timestamp_formatted":"2021-01-23T15:43:21.842","event_name":"AUTHENTICATION_ATTEMPT","user":{"id":"a52f6f87","email":"foo@bar.com","phone":"07711223344","ip_address":"100.100.100.100"},"platform":{"keyValuePair":[{"key":"xray_trace_id","value":"24727sda4192"}]},"restricted":{"keyValuePair":[{"key":"experian_ref","value":"DSJJSEE29392"}]},"extensions":{"keyValuePair":[{"key":"response","value":"Authentication successful"}]},"persistent_session_id":"some session id"}]';

        const exampleMessage: AuditEvent = {
            event_id: '66258f3e-82fc-4f61-9ba0-62424e1f06b4',
            request_id: '43143-233Ds-2823-283-dj299j1',
            session_id: 'c222c1ec',
            client_id: 'some-client',
            timestamp: new Date('2021-01-01T01:01:01.000Z'),
            timestamp_formatted: '2021-01-23T15:43:21.842',
            event_name: 'AUTHENTICATION_ATTEMPT',
            user: {
                id: 'a52f6f87',
                email: 'foo@bar.com',
                phone: '07711223344',
                ip_address: '100.100.100.100',
            },
            platform: {
                keyValuePair: [
                    {
                        key: 'xray_trace_id',
                        value: '24727sda4192',
                    },
                ],
            },
            restricted: {
                keyValuePair: [
                    {
                        key: 'experian_ref',
                        value: 'DSJJSEE29392',
                    },
                ],
            },
            extensions: {
                keyValuePair: [
                    {
                        key: 'response',
                        value: 'Authentication successful',
                    },
                ],
            },
            persistent_session_id: 'some session id',
        };

        const snsEvent = TestHelper.createSNSEventWithEncodedMessage(TestHelper.encodeAuditEvent(exampleMessage));

        const result = await handler(snsEvent);

        expect(result).toEqual(expectedResult);
    });

    it('successfully stringifies multiple events', async () => {
        const expectedResult =
            '[{"event_id":"66258f3e-82fc-4f61-9ba0-62424e1f06b4","request_id":"43143-233Ds-2823-283-dj299j1","session_id":"c222c1ec","client_id":"some-client","timestamp":"2021-01-01T01:01:01.000Z","timestamp_formatted":"2021-01-23T15:43:21.842","event_name":"AUTHENTICATION_ATTEMPT","user":{"id":"a52f6f87","email":"foo@bar.com","phone":"07711223344","ip_address":"100.100.100.100"},"platform":{"keyValuePair":[{"key":"xray_trace_id","value":"24727sda4192"}]},"restricted":{"keyValuePair":[{"key":"experian_ref","value":"DSJJSEE29392"}]},"extensions":{"keyValuePair":[{"key":"response","value":"Authentication successful"}]},"persistent_session_id":"some session id"},' +
            '{"event_id":"66258f3e-82fc-4f61-9ba0-62424e1f06b4","request_id":"43143-233Ds-2823-283-dj299j1","session_id":"c222c1ec","client_id":"some-client","timestamp":"2021-01-01T01:01:01.000Z","timestamp_formatted":"2021-01-23T15:43:21.842","event_name":"AUTHENTICATION_ATTEMPT","user":{"id":"a52f6f87","email":"foo@bar.com","phone":"07711223344","ip_address":"100.100.100.100"},"platform":{"keyValuePair":[{"key":"xray_trace_id","value":"24727sda4192"}]},"restricted":{"keyValuePair":[{"key":"experian_ref","value":"DSJJSEE29392"}]},"extensions":{"keyValuePair":[{"key":"response","value":"Authentication successful"}]},"persistent_session_id":"some session id"}]';

        const exampleMessage: AuditEvent = {
            event_id: '66258f3e-82fc-4f61-9ba0-62424e1f06b4',
            request_id: '43143-233Ds-2823-283-dj299j1',
            session_id: 'c222c1ec',
            client_id: 'some-client',
            timestamp: new Date('2021-01-01T01:01:01.000Z'),
            timestamp_formatted: '2021-01-23T15:43:21.842',
            event_name: 'AUTHENTICATION_ATTEMPT',
            user: {
                id: 'a52f6f87',
                email: 'foo@bar.com',
                phone: '07711223344',
                ip_address: '100.100.100.100',
            },
            platform: {
                keyValuePair: [
                    {
                        key: 'xray_trace_id',
                        value: '24727sda4192',
                    },
                ],
            },
            restricted: {
                keyValuePair: [
                    {
                        key: 'experian_ref',
                        value: 'DSJJSEE29392',
                    },
                ],
            },
            extensions: {
                keyValuePair: [
                    {
                        key: 'response',
                        value: 'Authentication successful',
                    },
                ],
            },
            persistent_session_id: 'some session id',
        };

        const snsEvent = TestHelper.createSNSEventWithEncodedMessage(TestHelper.encodeAuditEvent(exampleMessage), 2);

        const result = await handler(snsEvent);

        expect(result).toEqual(expectedResult);
    });

    it('successfully removes unrecognised elements and logs to cloudwatch', async () => {
        const expectedResult =
            '[{"event_id":"66258f3e-82fc-4f61-9ba0-62424e1f06b4","request_id":"43143-233Ds-2823-283-dj299j1","session_id":"c222c1ec","client_id":"some-client","timestamp":"2021-01-01T01:01:01.000Z","timestamp_formatted":"2021-01-23T15:43:21.842","event_name":"AUTHENTICATION_ATTEMPT","user":{"id":"a52f6f87","email":"foo@bar.com","phone":"07711223344","ip_address":"100.100.100.100"},"platform":{"keyValuePair":[{"key":"xray_trace_id","value":"24727sda4192"}]},"restricted":{"keyValuePair":[{"key":"experian_ref","value":"DSJJSEE29392"}]},"extensions":{"keyValuePair":[{"key":"response","value":"Authentication successful"}]},"persistent_session_id":"some session id"}]';

        const exampleMessage: UnknownAuditEvent = {
            event_id: '66258f3e-82fc-4f61-9ba0-62424e1f06b4',
            request_id: '43143-233Ds-2823-283-dj299j1',
            session_id: 'c222c1ec',
            client_id: 'some-client',
            timestamp: new Date('2021-01-01T01:01:01.000Z'),
            timestamp_formatted: '2021-01-23T15:43:21.842',
            event_name: 'AUTHENTICATION_ATTEMPT',
            user: {
                id: 'a52f6f87',
                email: 'foo@bar.com',
                phone: '07711223344',
                ip_address: '100.100.100.100',
            },
            platform: {
                keyValuePair: [
                    {
                        key: 'xray_trace_id',
                        value: '24727sda4192',
                    },
                ],
            },
            restricted: {
                keyValuePair: [
                    {
                        key: 'experian_ref',
                        value: 'DSJJSEE29392',
                    },
                ],
            },
            extensions: {
                keyValuePair: [
                    {
                        key: 'response',
                        value: 'Authentication successful',
                    },
                ],
            },
            persistent_session_id: 'some session id',
            new_unknown_field: "an unknown field"
        };

        const sqsEvent = TestHelper.createSQSEventWithEncodedMessage(TestHelper.encodeAuditEventWithUnknownField(exampleMessage));

        const result = await handler(sqsEvent);

        expect(result).toEqual(expectedResult);
        expect(consoleWarningMock).toHaveBeenCalledTimes(1);
        expect(consoleWarningMock).toHaveBeenCalledWith('[WARN] UNKNOWN FIELDS\n{"sourceName":"arn:aws:sqs:us-west-2:123456789012:SQSQueue","sourceType":1,"eventId":"66258f3e-82fc-4f61-9ba0-62424e1f06b4","eventName":"AUTHENTICATION_ATTEMPT","timeStamp":"2021-01-01T01:01:01.000Z","unknownFields":[{"key":"106","value":"an unknown field"}]}')
    });

    it('throws error when validation fails', async () => {
        await expect(handler(TestHelper.createSNSEventWithEncodedMessage(TestHelper.encodeAuditEvent({
            client_id: "",
            event_id: "",
            event_name: "",
            extensions: undefined,
            persistent_session_id: "",
            platform: undefined,
            request_id: "",
            restricted: undefined,
            session_id: "",
            timestamp: undefined,
            timestamp_formatted: "",
            user: undefined
        })))).rejects.toThrowError(
            ValidationException,
        );
    });
});
