import Scene from "../scene";
import {DiffuseMaterial} from "../materials/diffuse-material";
import {GlossyMaterial} from "../materials/glossy-material";
import TransmissionMaterial from "../materials/transmission-material";
import {LoadObjects} from "../../utils/obj-loader";
import {EmissionMaterial} from "../materials/emission-material";

export function createDefaultScene1(scene: Scene): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    scene.intersectables = [];
    scene.materials = [];

    let green_material = new DiffuseMaterial(vec3.fromValues(0,1,0));
    let blue_material = new DiffuseMaterial(vec3.fromValues(0,0,1));
    let white_material = new DiffuseMaterial(vec3.fromValues(1,1,1));
    let green_glass = new TransmissionMaterial(vec3.fromValues(0.8,1,1.0));
    let glossy_red_material = new GlossyMaterial(vec3.fromValues(1,0.5,0.5));
    let glossy_blue_material = new GlossyMaterial(vec3.fromValues(0.5,0.5,1.0));
    glossy_blue_material.shininess = 2.0;
    let gold_material = new GlossyMaterial(vec3.fromValues(1.0,0.8,0.3));
    gold_material.shininess = 20.0;
    let silver_material = new GlossyMaterial(vec3.fromValues(0.8,0.8,0.8));

    let emission_material = new EmissionMaterial(vec3.fromValues(1,1,1));
    emission_material.emission_rate = 20.0;
    let emission_red_material = new EmissionMaterial(vec3.fromValues(1,0.7,0.7));
    emission_red_material.emission_rate = 10.0;
    let light_emission_material = new EmissionMaterial(vec3.fromValues(0,1,1));
    light_emission_material.emission_rate = 6.0;

    scene.materials.push(green_material);
    scene.materials.push(blue_material);
    scene.materials.push(white_material);
    scene.materials.push(green_glass);
    scene.materials.push(glossy_red_material);
    scene.materials.push(emission_material);
    scene.materials.push(emission_red_material);
    scene.materials.push(glossy_blue_material);
    scene.materials.push(light_emission_material);
    scene.materials.push(gold_material);
    scene.materials.push(silver_material);

    // Load objects from .obj files
    LoadObjects([
        //{ fileName: '../../../assets/models/cylinder.obj', material: glossy_blue_material, smooth_shading: true },
        { fileName: './assets/models/box.obj', material: white_material, smooth_shading: false },
        //{ fileName: '../../../assets/models/bottom_disc.obj', material: white_material, smooth_shading: false },
        { fileName: '../../../assets/models/teapot5.obj', material: gold_material, smooth_shading: true },
        //{ fileName: '../../../assets/models/bunny.obj', material: green_glass, smooth_shading: true },
        { fileName: '../../../assets/models/dragon2.obj', material: green_glass, smooth_shading: true },
        { fileName: './assets/models/light_plane4.obj', material: emission_material, smooth_shading: false },
        { fileName: '../../../assets/models/light_plane5.obj', material: emission_red_material, smooth_shading: false },
      ], (objects) => {
        console.log(objects);
        for (let object of objects) {
          scene.intersectables.push(object);
        }
        resolve();
      },
      () => {});
  })
}