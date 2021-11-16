import formatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(40)).toEqual('$0.40');
    expect(formatMoney(140)).toEqual('$1.40');
  });

  it("leaves off cents", () => {
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(50000000)).toEqual('$500,000');
  });

  it("works with whole and fractional dollars", () => {
    expect(formatMoney(140)).toEqual('$1.40');
  });
});
