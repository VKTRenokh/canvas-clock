export interface AttribLocations {
  vertexPosition: number;
  vertexColor: number;
  vertexNormal: number;
}

export interface UniformLocations {
  projectionMatrix: WebGLUniformLocation | null;
  modelViewMatrix: WebGLUniformLocation | null;
  normalMatrix: WebGLUniformLocation | null;
}

export interface Info {
  program: WebGLProgram;
  attribLocations: AttribLocations;
  uniformLocations: UniformLocations;
}
