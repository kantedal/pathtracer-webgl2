import {Component} from "@angular/core";
import {SettingsService} from "../../../renderer/settings/settings.service";
import {Object3d} from "../../../renderer/path-tracer/models/primitives/object3d";
import {RenderService} from "../../../renderer/render.service";
import {MATERIAL_TYPES, default as Material} from "../../../renderer/path-tracer/models/materials/material";
import {DiffuseMaterial} from "../../../renderer/path-tracer/models/materials/diffuse-material";
import {GlossyMaterial} from "../../../renderer/path-tracer/models/materials/glossy-material";
import {EmissionMaterial} from "../../../renderer/path-tracer/models/materials/emission-material";
import TransmissionMaterial from "../../../renderer/path-tracer/models/materials/transmission-material";
const hexRgb = require('hex-rgb');

@Component({
  selector: 'object-settings',
  templateUrl: 'object-settings.html',
  styleUrls: ['object-settings.css']
})
export class ObjectSettingsComponent {
  rayTracingMode: boolean = false

  selectedObject: Object3d = null
  position: number[] = [0,0,0]
  scale: number[] = [0,0,0]
  rotation: number[] = [0,0,0]

  // Material attributes
  selectedMaterial: Material
  materialType: number
  materialColor: number[] = [0,0,0]
  materialExtraParameter1: number
  materialExtraParameter2: number
  materialEmission: number


  materials = [{ id: 0, name: 'Diffuse' }, { id: 2, name: 'Emission' }, { id: 5, name: 'Glossy' },  { id: 1, name: 'Specular' }, { id: 3, name: 'Transmission' }]
  selelectedMaterial: number = 0
  defaultScenes = [{ id: 1, name: 'HDR teapot and bunny' }, { id: 2, name: 'HDR stanford dragon'}, { id: 3, name: 'Room teapot and bunny'}, { id: 4, name: 'Room stanford dragon'} ]
  sceneId: number = 1
  //materialColor: string = '#ffffff'

  constructor(
    public settingsService: SettingsService,
    public renderService: RenderService
  ) {
    this.settingsService.renderTypeSub.asObservable().subscribe((type: number) => this.rayTracingMode = type == 0.0)
    this.settingsService.selectedObjectSub.asObservable().subscribe((object: Object3d) => {
      this.selectedObject = object
      if (this.selectedObject != null) {
        this.selectedMaterial = object.material
        console.log('selected object', object)
        console.log(this.selectedObject.material.material_type)

        this.position = [object.position[0], object.position[1], object.position[2]]
        this.scale = [object.scale[0], object.scale[1], object.scale[2]]
        this.rotation = [object.rotation[0], object.rotation[1], object.rotation[2]]

        this.materialType = object.material.material_type
        this.materialEmission = this.selectedMaterial.emission_rate
        this.materialColor = [
          Math.round(255 * object.material.color[0]),
          Math.round(255 * object.material.color[1]),
          Math.round(255 * object.material.color[2])
        ]

        if (this.materialType == MATERIAL_TYPES.diffuse) {
          let material = <DiffuseMaterial> this.selectedObject.material;
          this.materialExtraParameter1 = material.albedo;
          this.materialExtraParameter2 = material.roughness;
        }
        else if (this.materialType == MATERIAL_TYPES.emission) {

        }
        else if (this.materialType == MATERIAL_TYPES.glossy) {
          let material = <GlossyMaterial> this.selectedObject.material;
          this.materialExtraParameter1 = material.shininess;
        }
        else if (this.materialType == MATERIAL_TYPES.transmission) {
        }
        else if (this.materialType == MATERIAL_TYPES.specular) {
        }
      }
    })
  }

  scaleUpdate() {
    let objectsTexture = this.renderService.rayTracer.objectsTexture

    objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 9] = this.scale[0]
    objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 10] = this.scale[1]
    objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 11] = this.scale[2]
    objectsTexture.updateTexture()

    this.renderService.rayTracer.refreshScreen = true
  }

  rotationUpdate() {

  }

  positionUpdate() {
    let objectsTexture = this.renderService.rayTracer.objectsTexture

    objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 6] = this.position[0]
    objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 7] = this.position[1]
    objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 8] = this.position[2]
    objectsTexture.updateTexture()

    this.renderService.rayTracer.refreshScreen = true
  }

  materialUpdate() {
    let materialTexture = this.renderService.rayTracer.materialTexture

    if (this.materialType != this.selectedMaterial.material_type) {
      let materialIndex = this.selectedMaterial.material_index
      switch (this.materialType) {
        case MATERIAL_TYPES.diffuse:
          this.selectedObject.material = new DiffuseMaterial([this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255])
          break
        case MATERIAL_TYPES.emission:
          this.selectedObject.material = new EmissionMaterial([this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255])
          break
        case MATERIAL_TYPES.glossy:
          this.selectedObject.material = new GlossyMaterial([this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255])
          break
        case MATERIAL_TYPES.specular:
          this.selectedObject.material = new DiffuseMaterial([this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255])
          break
        case MATERIAL_TYPES.transmission:
          this.selectedObject.material = new TransmissionMaterial([this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255])
          break
      }
      this.selectedObject.material.material_index = materialIndex
      this.selectedMaterial = this.selectedObject.material
    }
    else {
      this.selectedMaterial.emission_rate = this.materialEmission
    }

    this.selectedMaterial.material_type = this.materialType
    this.selectedMaterial.color = [this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255]

    materialTexture.textureData[this.selectedMaterial.material_index * 9 + 0] = this.selectedMaterial.color[0]
    materialTexture.textureData[this.selectedMaterial.material_index * 9 + 1] = this.selectedMaterial.color[1]
    materialTexture.textureData[this.selectedMaterial.material_index * 9 + 2] = this.selectedMaterial.color[2]
    materialTexture.textureData[this.selectedMaterial.material_index * 9 + 3] = this.selectedMaterial.material_type
    materialTexture.textureData[this.selectedMaterial.material_index * 9 + 4] = this.selectedMaterial.emission_rate
    materialTexture.textureData[this.selectedMaterial.material_index * 9 + 5] = 0

    // Extra data 2
    if (this.selectedMaterial.material_type == MATERIAL_TYPES.diffuse) {
      let material = <DiffuseMaterial> this.selectedObject.material;
      materialTexture.textureData[this.selectedMaterial.material_index * 9 + 6] = material.albedo;
      materialTexture.textureData[this.selectedMaterial.material_index * 9 + 7] = material.roughness;
    }
    else if (this.selectedMaterial.material_type == MATERIAL_TYPES.glossy) {
      let material = <GlossyMaterial> this.selectedMaterial;
      material.shininess = this.materialExtraParameter1

      materialTexture.textureData[this.selectedMaterial.material_index * 9 + 6] = material.shininess
    }

    materialTexture.updateTexture()
    this.renderService.rayTracer.refreshScreen = true
  }

  sceneUpdate() {
    this.renderService.loadNewScene(this.sceneId)
  }
}