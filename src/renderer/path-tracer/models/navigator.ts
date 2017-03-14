import Camera from "./camera";
import Scene from "./scene";

export default class Navigator {
  private render_canvas;
  private scene: Scene;
  private camera: Camera;

  // Interaction data
  private middle_mouse_down: boolean;
  private start_camera_position: GLM.IArray;
  private start_lookat_position: GLM.IArray;
  private start_mouse_position: any;

  private left_mouse_down: boolean;


  constructor(camera: Camera, scene: Scene) {
    this.render_canvas = $('#renderCanvas');

    this.scene = scene;
    this.camera = camera;

    this.setupCameraMove();
    this.setupCameraZoom();
    this.setupCameraRotation();
    this.setupClickListeners();
  }

  setupCameraMove() {
    this.middle_mouse_down = false;
    this.start_camera_position = vec3.fromValues(0,0,0);
    this.start_lookat_position = vec3.fromValues(0,0,0);
    this.start_mouse_position = {x: 0, y: 0};

    // Mouse move
    this.render_canvas.mousemove((event) => {
      if (this.middle_mouse_down) {
        let uv = vec3.fromValues(0,0,0);
        let u = vec3.fromValues(0,0,0);
        let v = vec3.fromValues(0,0,0);

        vec3.scale(u, this.camera.camera_right, -5 * (event.pageX / 512 - 0.5) - this.start_mouse_position.x);
        vec3.scale(v, this.camera.camera_up, 5 * (event.pageY / 512 - 0.5) - this.start_mouse_position.y);

        vec3.add(uv, u, v);
        vec3.add(this.camera.position, this.start_camera_position, uv);
        vec3.add(this.camera.look_at, this.start_lookat_position, uv);

        this.camera.hasChanged = true;
      }
    });

    $('#render-canvas').mousedown((event) => {
      if (event.which === 2) {
        this.start_mouse_position.x = -5 * (event.pageX / 512 - 0.5);
        this.start_mouse_position.y = 5 * (event.pageY / 512 - 0.5);
        this.start_camera_position = vec3.fromValues(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
        this.start_lookat_position = vec3.fromValues(this.camera.look_at[0], this.camera.look_at[1], this.camera.look_at[2]);

        this.middle_mouse_down = true;
      }
    });

    this.render_canvas.mouseup((event) => this.middle_mouse_down = false );
    this.render_canvas.mouseout((event) => this.middle_mouse_down = false );
  }

  setupCameraZoom() {
    this.render_canvas.on('mousewheel', (event) => {
      let new_direction = vec3.fromValues(0,0,0);
      if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        vec3.scale(new_direction, this.camera.direction, 0.5);
        vec3.add(this.camera.position, this.camera.position, new_direction);
      }
      else {
        vec3.scale(new_direction, this.camera.direction, -0.5);
        vec3.add(this.camera.position, this.camera.position, new_direction);
      }
      this.camera.hasChanged = true;
    });
  }

  setupCameraRotation() {
    this.left_mouse_down = false;
    this.start_camera_position = vec3.fromValues(0,0,0);
    this.start_mouse_position = {x: 0, y: 0};

    // Mouse move
    this.render_canvas.mousemove((event) => {
      if (this.left_mouse_down) {
        let uv = vec3.fromValues(0, 0, 0);
        let u = vec3.fromValues(0, 0, 0);
        let v = vec3.fromValues(0, 0, 0);

        vec3.scale(u, this.camera.camera_right, -8 * (event.pageX / 512 - 0.5) - this.start_mouse_position.x);
        vec3.scale(v, this.camera.camera_up, 8 * (event.pageY / 512 - 0.5) - this.start_mouse_position.y);

        vec3.add(uv, u, v);
        vec3.add(this.camera.position, this.start_camera_position, uv);

        this.camera.update();
        this.camera.hasChanged = true;
      }
    });

    this.render_canvas.mousedown((event) => {
      if (event.which === 1) {
        this.start_mouse_position.x = -8 * (event.pageX / 512 - 0.5);
        this.start_mouse_position.y = 8 * (event.pageY / 512 - 0.5);
        this.start_camera_position = vec3.fromValues(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
        this.left_mouse_down = true;
      }
    });

    this.render_canvas.mouseup((event) => this.left_mouse_down = false );
    this.render_canvas.mouseout((event) => this.left_mouse_down = false );
  }

  setupClickListeners() {
    this.render_canvas.click((event) => {
      let ray = this.camera.createRayFromPixel(vec2.fromValues(event.offsetX, event.offsetY));
      this.scene.sceneIntersection(ray);
    });
  }
}