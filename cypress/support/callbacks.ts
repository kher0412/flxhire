export const classNameIncludes = (searchTerm: string) => (element: any) => {
  // eslint-disable-next-line no-unused-expressions
  expect(element[0].className.includes(searchTerm)).to.be.true
}
