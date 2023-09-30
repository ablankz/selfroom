type ReturnValue = {
  value: number;
  dx: number;
};

export function findClosestNumber(
  arr: Array<number>,
  target: number
): ReturnValue | null {
  if (arr.length === 0) {
    return null; // 配列が空の場合、nullを返すかエラーハンドリングを行ってください。
  }

  let left = 0;
  let right = arr.length - 1;
  let closestIndex = null;
  let closestDiff = Infinity;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentDiff = Math.abs(arr[mid] - target);

    if (currentDiff < closestDiff) {
      closestDiff = currentDiff;
      closestIndex = mid;
    }

    if (arr[mid] === target) {
      return {
        value: arr[mid], // 完全に一致する値が見つかった場合、その値を返します。
        dx: 0
      };
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return {
    value: arr[closestIndex || 0],
    dx: (arr[closestIndex || 0] < target) ? -1 : 1
  }
}
