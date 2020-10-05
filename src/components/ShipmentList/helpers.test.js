import * as helpers from './helpers';

describe('helpers', () => {
  test('createShipmentTitle', () => {
    expect(helpers.createShipmentTitle('ABCD', 'ABCU1234567')).toBe('ABCD / ABCU-123456-7');
  });

  test('validateContainerId', () => {
    expect(helpers.validateContainerId('ABCU1234567')).toBe(true);
    expect(helpers.validateContainerId('ABCU-123456-7')).toBe(true);
    expect(helpers.validateContainerId('ABCD-123456-7')).toBe(false);
    expect(helpers.validateContainerId('ABCD-12345-7')).toBe(false);
    expect(helpers.validateContainerId('ABU-123456-7')).toBe(false);
    expect(helpers.validateContainerId('ABCU-123^56-7')).toBe(false);
  });

  test('cleanContainerId', () => {
    expect(helpers.cleanContainerId('ABCU1234567')).toBe('ABCU1234567');
    expect(helpers.cleanContainerId('ABCU-123456-7')).toBe('ABCU1234567');
    expect(helpers.cleanContainerId('AB--CU-1--2---345-6--7')).toBe('ABCU1234567');
  });

  test('validateScac', () => {
    expect(helpers.validateScac('A')).toBe(false);
    expect(helpers.validateScac('AA')).toBe(true);
    expect(helpers.validateScac('AAA')).toBe(true);
    expect(helpers.validateScac('AAAA')).toBe(true);
    expect(helpers.validateScac('AAAAA')).toBe(false);
    expect(helpers.validateScac('AA9A')).toBe(false);
    expect(helpers.validateScac('AA%A')).toBe(false);
  });

  test('formatContainerId', () => {
    expect(helpers.formatContainerId('ABCU1234567')).toBe('ABCU-123456-7');
  });
});
