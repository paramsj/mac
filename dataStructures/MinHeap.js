function MinHeap(compare) {
    let heap = [];

    function getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    function getLeftChildIndex(i) {
        return (i * 2) + 1;
    }

    function getRightChildIndex(i) {
        return (i * 2) + 2;
    }

    function swap(index1, index2) {
        [heap[index1], heap[index2]] =
            [heap[index2], heap[index1]];
    }

    function insert(val) {
        heap.push(val);
        heapifyUp();
    }

    function extractMin() {
        if (heap.length === 0) {
            return null;
        }

        if (heap.length === 1) {
            return heap.pop();
        }

        const min = heap[0];

        heap[0] = heap.pop();

        heapifyDown();

        return min;
    }

    function heapifyUp() {
        let index = heap.length - 1;

        while (index > 0) {
            const parentIndex = getParentIndex(index);

            // Is current element smaller than parent?
            if (compare(heap[index], heap[parentIndex])) {

                swap(index, parentIndex);

                index = parentIndex;
            }
            else {
                break;
            }
        }
    }

    function heapifyDown() {
        let index = 0;

        while (getLeftChildIndex(index) < heap.length) {

            const leftIndex = getLeftChildIndex(index);
            const rightIndex = getRightChildIndex(index);

            let minValueIndex = leftIndex;

            // Is right child smaller than left?
            if (
                rightIndex < heap.length &&
                compare(heap[rightIndex], heap[leftIndex])
            ) {
                minValueIndex = rightIndex;
            }

            // Is smallest child smaller than current?
            if (compare(heap[minValueIndex], heap[index])) {

                swap(index, minValueIndex);

                index = minValueIndex;
            }
            else {
                break;
            }
        }
    }

    function peek() {
        if (heap.length === 0) {
            return null;
        }

        return heap[0];
    }

    function size() {
        return heap.length;
    }

    return {
        insert,
        extractMin,
        peek,
        size
    };
}

export {MinHeap};