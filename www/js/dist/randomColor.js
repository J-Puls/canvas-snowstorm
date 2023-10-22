export const randomColor = () => {
    return {
        h: Math.round(Math.random() * 360) + 1,
        s: 100 - Math.floor(Math.random() * 50) + 1,
        l: 50,
    };
};
export default randomColor;
