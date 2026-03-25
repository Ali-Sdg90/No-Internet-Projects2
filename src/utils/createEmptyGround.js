import { baseSize } from "../constants/config";

export const createEmptyGround = () => {
    const ground = [];

    for (let i = 0; i < baseSize; i++) {
        ground[i] = Array(baseSize)
            .fill()
            .map(() => {
                return [0];
            });
    }

    return ground;
};
