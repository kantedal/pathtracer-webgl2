import Camera from "./path-tracer/models/camera";
import {SettingsService} from "./settings/settings.service";
export class CameraNavigator {
  private renderCanvas: any;

  // Interaction data
  private leftMouseDown: boolean
  private startCameraPosition: GLM.IArray
  private startMousePosition: any

  startYaw: number = 0.0
  startPitch: number = 0.0

  constructor(private camera: Camera, private settingsService: SettingsService) {
    this.renderCanvas = $('#renderCanvas')
    this.setupCameraKeyboardMove()
    this.setupCameraZoom();
    this.setupCameraRotation();

  }

  setupCameraKeyboardMove() {
    let movement = vec3.fromValues(0,0,0)
    let dir = vec3.create()
    let right = vec3.create()
    let rotMat = mat3.create()

    let delta = 0.02
    window.onkeydown = e => {
      switch (e.key) {
        case 'w':
          mat3.multiply(rotMat, this.rotationMatrixVector(vec3.fromValues(0,1,0), this.camera.yawRotation), this.rotationMatrixVector(vec3.fromValues(0,0,1), this.camera.pitchRotation))
          vec3.transformMat3(dir, this.camera.direction, rotMat)
          vec3.scale(movement, dir, delta)
          vec3.add(this.camera.position, this.camera.position, movement)
          this.camera.hasChanged = true
          break
        case 's':
          mat3.multiply(rotMat, this.rotationMatrixVector(vec3.fromValues(0,1,0), this.camera.yawRotation), this.rotationMatrixVector(vec3.fromValues(0,0,1), this.camera.pitchRotation))
          vec3.transformMat3(dir, this.camera.direction, rotMat)
          vec3.scale(movement, dir, -delta)
          vec3.add(this.camera.position, this.camera.position, movement)
          this.camera.hasChanged = true
          break
        case 'a':
          mat3.multiply(rotMat, this.rotationMatrixVector(vec3.fromValues(0,1,0), this.camera.yawRotation), this.rotationMatrixVector(vec3.fromValues(0,0,1), this.camera.pitchRotation))
          vec3.transformMat3(right, this.camera.camera_right, rotMat)
          vec3.scale(movement, right, -delta)
          vec3.add(this.camera.position, this.camera.position, movement)
          this.camera.hasChanged = true
          break
        case 'd':
          mat3.multiply(rotMat, this.rotationMatrixVector(vec3.fromValues(0,1,0), this.camera.yawRotation), this.rotationMatrixVector(vec3.fromValues(0,0,1), this.camera.pitchRotation))
          vec3.transformMat3(right, this.camera.camera_right, rotMat)
          vec3.scale(movement, right, delta)
          vec3.add(this.camera.position, this.camera.position, movement)
          this.camera.hasChanged = true
          break
      }
    }
  }

  rotationMatrixVector(v: GLM.IArray, angle: number) {
    let c = Math.cos(angle)
    let s = Math.sin(angle)

    return mat3.fromValues(
      c + (1.0 - c) * v[0] * v[0], (1.0 - c) * v[0] * v[1] - s * v[2], (1.0 - c) * v[0] * v[2] + s * v[1],
      (1.0 - c) * v[0] * v[1] + s * v[2], c + (1.0 - c) * v[1] * v[1], (1.0 - c) * v[1] * v[2] - s * v[0],
      (1.0 - c) * v[0] * v[2] - s * v[1], (1.0 - c) * v[1] * v[2] + s * v[0], c + (1.0 - c) * v[2] * v[2]
    )
  }


  setupCameraZoom() {
    let rotMat = mat3.create()
    let dir = vec3.fromValues(0,0,0);
    this.renderCanvas.on('mousewheel', (event) => {

      mat3.multiply(rotMat, this.rotationMatrixVector(vec3.fromValues(0,1,0), this.camera.yawRotation), this.rotationMatrixVector(vec3.fromValues(0,0,1), this.camera.pitchRotation))
      vec3.transformMat3(dir, this.camera.direction, rotMat)
      if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        vec3.scale(dir, dir, 0.05);
        vec3.add(this.camera.position, this.camera.position, dir);
      }
      else {
        vec3.scale(dir, dir, -0.05);
        vec3.add(this.camera.position, this.camera.position, dir);
      }
      this.camera.hasChanged = true;
    });
  }

  setupCameraRotation() {
    this.leftMouseDown = false;
    this.startCameraPosition = vec3.fromValues(0,0,0);
    this.startMousePosition = {x: 0, y: 0};

    // Mouse move
    this.renderCanvas.mousemove((event) => {
      if (this.leftMouseDown) {
        let rotationX = ((event.clientX / window.innerWidth - 0.5) - this.startMousePosition.x) * 4.0
        let rotationY = ((event.clientY / window.innerHeight - 0.5) - this.startMousePosition.y) * 4.0
        this.camera.yawRotation = this.startYaw + rotationX
        this.camera.pitchRotation = this.startPitch + rotationY

        // let yawRot = this.rotationMatrixVector(vec3.fromValues(0,1,0), this.camera.yawRotation)
        // let pitchRot = this.rotationMatrixVector(vec3.fromValues(0,0,1), this.camera.pitchRotation)
        // vec3.transformMat3(this.camera.camera_right, this.camera.camera_right, yawRot)
        // vec3.transformMat3(this.camera.camera_right, this.camera.camera_right, pitchRot)
        //
        // vec3.transformMat3(this.camera.camera_up, this.camera.camera_up, yawRot)
        // vec3.transformMat3(this.camera.camera_up, this.camera.camera_up, pitchRot)

        this.camera.hasChanged = true;
      }
    });

    this.renderCanvas.mousedown((event) => {
      if (event.which === 1) {
        this.startYaw = this.camera.yawRotation
        this.startPitch = this.camera.pitchRotation

        this.startMousePosition.x = (event.clientX / window.innerWidth - 0.5)
        this.startMousePosition.y = (event.clientY / window.innerHeight - 0.5)
        this.startCameraPosition = vec3.fromValues(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
        this.leftMouseDown = true;
      }
    });
    this.renderCanvas.mouseup((event) => this.leftMouseDown = false );
    this.renderCanvas.mouseout((event) => this.leftMouseDown = false );
  }
}
