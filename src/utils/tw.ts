/**
 * 合并className
 * @param classNames
 * @returns
 */
export const twClass = (...classNames: string[]): string =>
  classNames.reduce((total, cur) => {
    total += `${cur.replaceAll(/(\n|\s+)/g, " ")} `;
    return total;
  }, "");
