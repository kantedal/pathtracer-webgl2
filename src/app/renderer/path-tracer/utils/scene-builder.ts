
import Scene from '../models/scene'
import {Object3d} from '../models/primitives/object3d'
import {MATERIAL_TYPES} from '../models/materials/material'
import {DiffuseMaterial} from '../models/materials/diffuse-material'
import {GlossyMaterial} from '../models/materials/glossy-material'

export function buildScene(scene: Scene) {
  let textureData = {
    objects: new Float32Array(512 * 512 * 3),
    object_count: scene.intersectables.length,
    objects_bvh: new Float32Array(2048 * 2048 * 3),
    triangles: new Float32Array(2048 * 2048 * 3),
    triangle_count: 0,
    triangle_indices: new Float32Array(1024 * 1024 * 3),
    materials: new Float32Array(512 * 512 * 3),
    material_count: 0,
    light_triangles: new Float32Array(128 * 128 * 3),
    light_count: 0,
  };

  // Build object data
  let objectData = [];
  let bvhCount = 0;
  let triangleCount = 0;
  for (let obj_idx = 0; obj_idx < scene.intersectables.length; obj_idx++) {
    let object = scene.intersectables[obj_idx] as Object3d;
    object.textureIndex = obj_idx;

    let bvh_start_index = bvhCount;
    for (let obj_bvh_idx = 0; obj_bvh_idx < object.bvh.count; obj_bvh_idx++) {
      textureData.objects_bvh[bvhCount++] = object.bvh.bvhTexture[obj_bvh_idx];
    }
    let bvh_end_index = bvhCount;

    let triangle_start_index = triangleCount;
    for (let tri_idx = 0; tri_idx < object.bvh.triangleCount; tri_idx++) {
      textureData.triangle_indices[triangleCount++] = object.bvh.triangleIndexTexture[tri_idx];
    }
    let triangle_end_index = triangleCount;

    // Bounding box bottom
    objectData.push(object.boundingBox.bottom[0]);
    objectData.push(object.boundingBox.bottom[1]);
    objectData.push(object.boundingBox.bottom[2]);

    // Bounding box bottom
    objectData.push(object.boundingBox.top[0]);
    objectData.push(object.boundingBox.top[1]);
    objectData.push(object.boundingBox.top[2]);

    // Object position
    objectData.push(object.position[0]);
    objectData.push(object.position[1]);
    objectData.push(object.position[2]);

    // Object scale
    objectData.push(object.scale[0]);
    objectData.push(object.scale[1]);
    objectData.push(object.scale[2]);

    // Set indices for bvh texture
    objectData.push(bvh_start_index / 12); // BVH start index
    objectData.push(triangle_start_index / 3);
    objectData.push(0);
  }

  for (let i = 0; i < objectData.length; i++) {
    textureData.objects[i] = objectData[i];
  }

  // Build material data
  let materialData = [];
  for (let mat_idx = 0; mat_idx < scene.materials.length; mat_idx++) {
    let material = scene.materials[mat_idx];

    // Set material index
    material.material_index = mat_idx;

    // Color
    materialData.push(material.color[0]);
    materialData.push(material.color[1]);
    materialData.push(material.color[2]);

    // Extra data 1
    materialData.push(material.material_type);
    materialData.push(material.emission_rate);
    materialData.push(0);

    // Extra data 2
    if (material.material_type == MATERIAL_TYPES.diffuse) {
      let diffuse_material = <DiffuseMaterial> material;
      materialData.push(diffuse_material.albedo);
      materialData.push(diffuse_material.roughness);
      materialData.push(0);
    }
    else if (material.material_type == MATERIAL_TYPES.glossy) {
      let diffuse_material = <GlossyMaterial> material;
      materialData.push(diffuse_material.shininess);
      materialData.push(0);
      materialData.push(0);
    }
    else {
      materialData.push(0);
      materialData.push(0);
      materialData.push(0);
    }
  }

  textureData.material_count = scene.materials.length;
  for (let i = 0; i < materialData.length; i++) {
    textureData.materials[i] = materialData[i];
  }

  // Build triangle data
  let triangleData = [];
  let lightData = [];
  for (let object of scene.intersectables) {
    // Find material index for current objtect
    let material_index = 0;
    for (let mat_idx = 0; mat_idx < scene.materials.length; mat_idx++) {
      if (scene.materials[mat_idx] === object.material) {
        material_index = mat_idx;
        break;
      }
    }

    // Add triangle data
    for (let triangle of object.triangles) {
      // v0
      triangleData.push(triangle.v0[0]);
      triangleData.push(triangle.v0[1]);
      triangleData.push(triangle.v0[2]);

      // edge1
      triangleData.push(triangle.edge1[0]);
      triangleData.push(triangle.edge1[1]);
      triangleData.push(triangle.edge1[2]);

      // edge2
      triangleData.push(triangle.edge2[0]);
      triangleData.push(triangle.edge2[1]);
      triangleData.push(triangle.edge2[2]);

      // n0
      triangleData.push(triangle.n0[0]);
      triangleData.push(triangle.n0[1]);
      triangleData.push(triangle.n0[2]);

      // n1
      triangleData.push(triangle.n1[0]);
      triangleData.push(triangle.n1[1]);
      triangleData.push(triangle.n1[2]);

      // n2
      triangleData.push(triangle.n2[0]);
      triangleData.push(triangle.n2[1]);
      triangleData.push(triangle.n2[2]);

      // uv0
      triangleData.push(triangle.uv0[0]);
      triangleData.push(triangle.uv0[1]);
      triangleData.push(0);

      // uv1
      triangleData.push(triangle.uv1[0]);
      triangleData.push(triangle.uv1[1]);
      triangleData.push(0);

      // uv2
      triangleData.push(triangle.uv2[0]);
      triangleData.push(triangle.uv2[1]);
      triangleData.push(0);

      // Extra data
      triangleData.push(material_index);
      triangleData.push(triangle.objectIndex);
      triangleData.push(0);
      triangleData.push(0);
      triangleData.push(0);
      triangleData.push(0);

      // Add light data
      if (object.material.emission_rate != 0.0) {
        // v0
        lightData.push(triangle.v0[0]);
        lightData.push(triangle.v0[1]);
        lightData.push(triangle.v0[2]);

        // edge1
        lightData.push(triangle.edge1[0]);
        lightData.push(triangle.edge1[1]);
        lightData.push(triangle.edge1[2]);

        // edge2
        lightData.push(triangle.edge2[0]);
        lightData.push(triangle.edge2[1]);
        lightData.push(triangle.edge2[2]);

        // n0
        lightData.push(triangle.n0[0]);
        lightData.push(triangle.n0[1]);
        lightData.push(triangle.n0[2]);

        // n1
        lightData.push(triangle.n1[0]);
        lightData.push(triangle.n1[1]);
        lightData.push(triangle.n1[2]);

        // n2
        lightData.push(triangle.n2[0]);
        lightData.push(triangle.n2[1]);
        lightData.push(triangle.n2[2]);

        // Extra data
        lightData.push(material_index);
        lightData.push(triangle.objectIndex);
        lightData.push(triangle.triangleArea);
        lightData.push(0);
        lightData.push(0);
        lightData.push(0);
      }
    }
  }

  let tri_count = 0;
  for (let i = 0; i < triangleData.length; ++i) {
    if (i % 12 == 0) tri_count++;
    textureData.triangles[i] = triangleData[i];
  }
  textureData.triangle_count = tri_count;

  let light_count = 0;
  for (let i = 0; i < lightData.length; ++i) {
    if (i % 12 == 0) light_count++;
    textureData.light_triangles[i] = lightData[i];
  }
  textureData.light_count = light_count;

  return textureData;
}
