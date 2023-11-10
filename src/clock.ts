import { BaseComponent } from "./BaseComponent";
import { Maybe, maybe } from "./utils/maybe";
import { mat4 } from "gl-matrix";
import { Info } from "./types/info";
import { Buffers } from "./buffers/buffers";

export class Clock extends BaseComponent<"canvas"> {
  private ctx = maybe(this.node.getContext("webgl2"));
  private frame = maybe<number>(null);

  constructor(parent: HTMLElement, width: number, height: number) {
    super(parent, "canvas");
    this.node.width = width;
    this.node.height = height;

    this.redraw();
  }

  loadShader(gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = maybe(gl.createShader(type));

    return shader.map((shader) => {
      gl.shaderSource(shader, source);

      gl.compileShader(shader);

      return shader;
    });
  }

  attachShader(
    gl: WebGL2RenderingContext,
    program: Maybe<WebGLProgram>,
    shader: Maybe<WebGLShader>
  ) {
    program.merge(shader).map(([program, shader]) => {
      gl.attachShader(program, shader);
    });
  }

  initShader(gl: WebGL2RenderingContext, vsSource: string, fsSource: string) {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const program = maybe(gl.createProgram());

    this.attachShader(gl, program, vertexShader);
    this.attachShader(gl, program, fragmentShader);

    return program.map((program) => {
      gl.linkProgram(program);

      return program;
    });
  }

  initBuffers(gl: WebGL2RenderingContext) {
    return new Buffers(gl);
  }

  drawScene(
    gl: WebGL2RenderingContext,
    programInfo: Info,
    buffers: Buffers,
    rotation: number
  ) {
    gl.clearColor(1.0, 0.49, 0, 1.0);
    gl.clearDepth(1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fov = (45 * Math.PI) / 100;

    const aspect = gl.canvas.width / gl.canvas.height;

    const near = 0.1;
    const far = 100.0;

    const projection = mat4.create();

    mat4.perspective(projection, fov, aspect, near, far);

    const modelView = mat4.create();

    mat4.translate(modelView, modelView, [0.0, 0.0, -5.0]);

    mat4.rotate(modelView, modelView, rotation, [0, 0, 1]);
    mat4.rotate(modelView, modelView, rotation * 0.7, [0, 1, 0]);
    mat4.rotate(modelView, modelView, rotation * 0.3, [1, 0, 0]);

    const normal = mat4.create();
    mat4.invert(normal, modelView);
    mat4.transpose(normal, normal);

    this.setColor(gl, programInfo, buffers);
    this.setPosition(gl, programInfo, buffers);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projection
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelView
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
      normal
    );

    gl.drawElements(gl.TRIANGLE_STRIP, 36, gl.UNSIGNED_SHORT, 0);
  }

  setPosition(gl: WebGL2RenderingContext, programInfo: Info, buffers: Buffers) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  setColor(gl: WebGL2RenderingContext, programInfo: Info, buffers: Buffers) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);

    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      4,
      gl.FLOAT,
      false,
      0,
      0
    );

    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }

  setNormal(gl: WebGL2RenderingContext, programInfo: Info, buffers: Buffers) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexNormal,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
  }

  redraw() {
    this.ctx.map((gl) => {
      const v = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uNormalMatrix;

    varying lowp vec4 vColor;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }  `;

      const f = `
      varying lowp vec4 vColor;
      varying highp vec3 vLighting;

      uniform sampler2D uSampler;

      void main(void) {
        // Remove this line, as it overwrites gl_FragColor with vColor
        // gl_FragColor = vColor;

        highp vec4 texelColor = texture2D(uSampler, gl_PointCoord);

        // Modify the next line to multiply the texture color with vColor and vLighting
        gl_FragColor = vec4(texelColor.rgb * vColor.rgb * vLighting, texelColor.a);
      }
`;

      const shaderProgram = this.initShader(gl, v, f);
      const buffers = this.initBuffers(gl);

      shaderProgram.map((program) => {
        const info: Info = {
          program,
          uniformLocations: {
            projectionMatrix: gl.getUniformLocation(
              program,
              "uProjectionMatrix"
            ),
            modelViewMatrix: gl.getUniformLocation(program, "uModelViewMatrix"),
            normalMatrix: gl.getUniformLocation(program, "uNormalMatrix"),
          },
          attribLocations: {
            vertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
            vertexColor: gl.getAttribLocation(program, "aVertexColor"),
            vertexNormal: gl.getAttribLocation(program, "aVertexNormal"),
          },
        };

        gl.clearColor(0.0, 255.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        let then = 0;
        let deltaTime = 0;
        let rotation = 0;

        const a = (time: number) => {
          const now = (time *= 0.001);
          deltaTime = now - then;
          then = now;

          this.drawScene(gl, info, buffers, rotation);

          rotation += deltaTime;

          requestAnimationFrame(a);
        };
        requestAnimationFrame(a);
      });
    });
  }

  destroy(): void {
    this.frame.map((frame) => cancelAnimationFrame(frame));

    super.destroy();
  }
}
