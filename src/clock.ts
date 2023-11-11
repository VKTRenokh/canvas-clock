import { BaseComponent } from "./BaseComponent";
import { Maybe, maybe } from "./utils/maybe";
import { mat4 } from "gl-matrix";
import { Info } from "./types/info";
import { Buffers } from "./buffers/buffers";

export class Clock extends BaseComponent<"canvas"> {
  private frame = maybe<number>(null);
  private ctx = maybe<WebGL2RenderingContext>(null);
  private speed = 0.001;

  constructor(parent: HTMLElement, width: number, height: number) {
    super(parent, "canvas");
    this.node.width = width;
    this.node.height = height;

    this.ctx = maybe(this.node.getContext("webgl2"));

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
    rotation: number,
    rotationX: number,
    rotationY: number
  ) {
    gl.clearColor(1.0, 0.49, 0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fov = (45 * Math.PI) / 180;

    const aspect = gl.canvas.width / gl.canvas.height;

    const nearZ = 0.1;
    const farZ = 500.0;

    const projection = mat4.create();

    mat4.perspective(projection, fov, aspect, nearZ, farZ);

    const modelView = mat4.create();

    mat4.translate(modelView, modelView, [0.0, 0.0, -6.0]);

    mat4.rotate(modelView, modelView, rotation, [0, 0, 1]);
    mat4.rotate(modelView, modelView, rotationX, [0, 1, 0]);
    mat4.rotate(modelView, modelView, rotationY, [1, 0, 0]);

    this.setPosition(gl, programInfo, buffers);
    this.setColor(gl, programInfo, buffers);

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

  redraw() {
    this.ctx.map((gl) => {
      const v = `
          attribute vec4 aVertexPosition;
          attribute vec4 aVertexColor;

          uniform mat4 uModelViewMatrix;
          uniform mat4 uProjectionMatrix;

          varying lowp vec4 vColor;

          void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            vColor = aVertexColor;
          }
`;

      const f = `
         varying lowp vec4 vColor;

         void main(void) {
           gl_FragColor = vColor;
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
          },
          attribLocations: {
            vertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
            vertexColor: gl.getAttribLocation(program, "aVertexColor"),
          },
        };

        // let then = 0;
        // let deltaTime = 0;
        let rotationX = 0;
        let rotationY = 0;
        let rotation = 0;

        const a = (time: number) => {
          // const now = (time *= this.speed);
          // deltaTime = now - then;
          // then = now;

          this.drawScene(
            gl,
            info,
            this.initBuffers(gl),
            rotation,
            rotationX,
            rotationY
          );

          // rotation += deltaTime;

          this.frame = maybe(requestAnimationFrame(a));
        };
        this.frame = maybe(requestAnimationFrame(a));

        this.node.onclick = () => {
          this.node.requestPointerLock();
        };

        window.onmousemove = (e) => {
          rotationY += e.movementY / 100;
          rotationX += e.movementX / 100;
        };
      });
    });
  }

  changeSpeed() {}

  destroy(): void {
    this.frame.map((frame) => cancelAnimationFrame(frame));

    super.destroy();
  }
}
