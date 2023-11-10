export type Rgba = [number, number, number, number];
export type RgbaMatrix = Rgba[];

export const rgbaMatrixToFloat32Array = (
  matrix: [number, number, number, number][]
): Float32Array => {
  return new Float32Array(
    matrix.flatMap((rgba) => {
      return [...rgba, ...rgba, ...rgba, ...rgba];
    })
  );
};
