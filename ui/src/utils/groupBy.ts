export function groupBy<T>(array: T[], key: keyof T, valueResolver?: (value: string) => string) {
    return array.reduce<Record<string, T[]>>((acc, item) => {
        let groupingValue = item[key] as string;
        if (valueResolver) {
            groupingValue = valueResolver(groupingValue);
        }
        acc[groupingValue] = [...(acc[groupingValue] || []), item];
        return acc;
    }, {});
}
