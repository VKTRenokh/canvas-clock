import { red, blue, cyan, green, purple, yellow } from "@/constants/colors";
import { indices } from "@/constants/indices";
import {
  RgbaMatrix,
  rgbaMatrixToFloat32Array,
} from "@/utils/rgbaToArrayBuffer";

export class Buffers {
  position: WebGLBuffer | null = null;
  color: WebGLBuffer | null = null;
  normal: WebGLBuffer | null = null;
  indices: WebGLBuffer | null = null;

  constructor(private gl: WebGL2RenderingContext) {
    this.position = this.initPositionBuffer();
    this.color = this.initColorBuffer();
    this.indices = this.initIndexBuffer();
    this.normal = this.initNormalBuffer();
  }

  private initColorBuffer() {
    const faceColors: RgbaMatrix = [
      red, // Front face
      green, // Back face
      blue, // Top face
      cyan, // Bottom face
      yellow, // Right face
      purple, // Left face
    ];

    const buffer = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      rgbaMatrixToFloat32Array(faceColors),
      this.gl.STATIC_DRAW
    );

    return buffer;
  }

  private initPositionBuffer() {
    const buffer = this.gl.createBuffer();

    const positions = [
      -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0,
      -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0,
      -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
      1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0,
      1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
    ];

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW
    );

    return buffer;
  }

  private initIndexBuffer() {
    const buffer = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);

    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      this.gl.STATIC_DRAW
    );

    return buffer;
  }

  private initNormalBuffer() {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

    const vertexNormals = [
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

      0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,

      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,

      0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,

      1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,

      -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
    ];

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertexNormals),
      this.gl.STATIC_DRAW
    );

    return buffer;
  }
}
