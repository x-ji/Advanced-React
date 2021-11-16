function add(a, b) {
  const aNum = parseInt(a);
  const bNum = parseInt(b);
  return aNum + bNum;
}

// We don't need to import the functions, since they will be available when we run the tests via the test runners.
describe('Sample test 101', () => {
  it('works as expected', () => {
    // we run the expect methods to see if the test will pass.
    // Similar to what we had in rspec and stuff, of course.
    // So the expect methods are just part of Jest, not tied to any particular framework.
    expect(1).toEqual(1);
  });

  it('runs a function properly', () => {
    expect(add('1', '2')).toBe(3);
  })
});
