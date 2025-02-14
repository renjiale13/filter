

export  function findMaxInIntervals(arr, step = 10) {
    if (arr.length === 0) return [];

    // 找到数组中的最小值和最大值
    const minValue = Math.min(...arr);
    const maxValue = Math.max(...arr);

    // 创建一个对象来存储每个区间的最大值
    const intervalMax = {};

    // 遍历数组，更新每个区间的最大值
    for (const num of arr) {
        const intervalStart = Math.floor(num / step) * step;
        if (!(intervalStart in intervalMax)) {
            intervalMax[intervalStart] = num;
        } else {
            intervalMax[intervalStart] = Math.max(intervalMax[intervalStart], num);
        }
    }

    // 提取结果，按区间顺序排列
    const result = [];
    for (let i = Math.ceil(minValue / step) * step; i <= maxValue; i += step) {
        if (i in intervalMax) {
            result.push({ intervalEnd: i, });
        }
    }
    result.forEach(i => {
        i.intervalStart = i.intervalEnd-step;

    })
    let len = result.length-1;
    result.push({ intervalEnd: result[len].intervalEnd+10,intervalStart:result[len].intervalEnd });
    return result;
}

export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }

    const clone = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }

    return clone;
}


