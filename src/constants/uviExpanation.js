const uviExpanation = {
    getExpanation: (data) => {
        if (data >= 0 && data < 3) {
            return 'Low';
        } else if (data >= 3 && data < 6) {
            return 'Middle';
        } else if (data >= 6 && data < 8) {
            return 'High';
        } else if (data >= 8 && data < 11) {
            return 'Very high';
        } else if (data >= 11) {
            return 'Extreme';
        } else {
            return 'undefined';
        }
    }
}

export default uviExpanation;