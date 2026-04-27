import React, { useRef, useState } from 'react';
import { View, PanResponder, ActivityIndicator } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer, TextureLoader, loadAsync } from 'expo-three';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default function CView3D() {
  const [loading, setLoading] = useState(true);
  const rotationY = useRef(new THREE.Group());
  const lastX = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const deltaX = gestureState.moveX - lastX.current;
        rotationY.current.rotation.y += deltaX * 0.015; // Lebih sensitif dikit
        lastX.current = gestureState.moveX;
      },
      onPanResponderGrant: (evt) => {
        lastX.current = evt.nativeEvent.pageX;
      },
    })
  ).current;

  const onContextCreate = async (gl: any) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 12); // Mundurkan lagi biar tidak raksasa
    camera.lookAt(0, 0, 0);

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(0xF9FAFB, 1);

    // Panggung Premium - Hitam Sleek
    const stageGroup = new THREE.Group();
    const stage = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5.5, 0.4, 32),
      new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.1, metalness: 0.5 })
    );
    stageGroup.add(stage);

    const edge = new THREE.Mesh(
      new THREE.CylinderGeometry(5.05, 5.55, 0.1, 32),
      new THREE.MeshBasicMaterial({ color: 0x0A4D68 }) 
    );
    edge.position.y = -0.15;
    stageGroup.add(edge);

    stageGroup.position.y = -4; // Panggung di bawah model
    scene.add(stageGroup);

    // Pencahayaan Studio - Lebih Terang & Merata
    const mainLight = new THREE.SpotLight(0xFFFFFF, 20);
    mainLight.position.set(0, 15, 10);
    scene.add(mainLight);
    
    const sideLight = new THREE.PointLight(0xFFFFFF, 10);
    sideLight.position.set(10, 10, 10);
    scene.add(sideLight);

    scene.add(new THREE.AmbientLight(0xFFFFFF, 1.8));

    scene.add(rotationY.current);

    try {
      const objAsset = Asset.fromModule(require('../../assets/images/tshirt_v2.obj'));
      await objAsset.downloadAsync();
      
      const objLoader = new OBJLoader();
      
      // Material Putih Premium (Clean & Sleek)
      const material = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF, 
        roughness: 0.3, 
        metalness: 0.2 
      });

      const objContent = await FileSystem.readAsStringAsync(objAsset.localUri || objAsset.uri);
      const model = objLoader.parse(objContent);

      // Terapkan material ke semua mesh
      model.traverse((child: any) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = material;
        }
      });

      // AUTO-CENTER: Hitung bounding box dan pusatkan model ke (0,0,0)
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      // Normalisasi ukuran — Standar (Tinggi 7 unit)
      const targetSize = 7;
      const scaleFactor = targetSize / maxDim;
      
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);
      
      // Geser model biar titik tengahnya ada di origin (0,0,0)
      model.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);

      rotationY.current.rotation.y = Math.PI; // Hadap depan
      rotationY.current.add(model);

      // Posisikan panggung tepat di bawah kaki model
      const bottomY = (box.min.y - center.y) * scaleFactor;
      stageGroup.scale.set(1.5, 1, 1.5);
      stageGroup.position.set(0, bottomY - 0.1, 0);
      scene.add(stageGroup);
      setLoading(false);
    } catch (e) {
      console.error("Manual 3D load error:", e);
      setLoading(false);
    }


    const render = () => {
      requestAnimationFrame(render);
      rotationY.current.rotation.y += 0.003; 
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };


  return (
    <View className="flex-1 justify-center items-center" {...panResponder.panHandlers}>
      <GLView style={{ width: '100%', height: '100%' }} onContextCreate={onContextCreate} />
      {loading && (
        <View className="absolute inset-0 items-center justify-center bg-[#F9FAFB]">
          <ActivityIndicator size="large" color="#0A4D68" />
        </View>
      )}
    </View>
  );
}

