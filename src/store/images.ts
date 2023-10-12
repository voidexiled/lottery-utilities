
import { create } from 'zustand';


type State = {
    images: string[],
    addImage: (canvas: string) => void
};

const concatArrays = (arr1: string[], arr2: string[]): string[] => {
    return Array.from(new Set(arr1.concat(arr2)))
}

export const useImagesStore = create<State>((set) => ({
    images: [],
    addImage: (canvas: string) => {
        set((state) => ({
            images: concatArrays(state.images, [canvas])
        }))
    },

})

);
