import "./styles.css";
import * as THREE from "three";

function main() {
  const canvas = document.querySelector("#tdbox");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.shadowMap.enabled = true;
  const cameraRules = {
    fov: 75,
    aspect: 2, // the canvas default
    near: 0.1,
    far: 500,
    x: 0,
    y: 100,
    z: -110
  };
  const camera = new THREE.PerspectiveCamera(
    cameraRules.fov,
    cameraRules.aspect,
    cameraRules.near,
    cameraRules.far
  );
  camera.position.set(cameraRules.x, cameraRules.y, cameraRules.z);
  camera.lookAt(0, 0, 0);
  const scene = new THREE.Scene();

  const objects = [];

  function createCircle(radius, color) {
    const material = new THREE.LineBasicMaterial({ color: color });
    const curve = new THREE.RingGeometry(radius, radius, 60);
    const circle = new THREE.LineLoop(curve, material);
    scene.add(circle.rotateX(Math.PI / 2));
  }

  function createBoxObject(width, height, depth, color, x, y, z, emissive) {
    const obj = {};
    obj.width = width;
    obj.height = height;
    obj.depth = depth;
    obj.color = color;
    obj.x = x;
    obj.y = y;
    obj.z = z;
    obj.geometry = new THREE.BoxGeometry(width, height, depth);
    obj.material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: emissive
    });
    obj.mesh = new THREE.Mesh(obj.geometry, obj.material);
    obj.mesh.position.set(obj.x, obj.y, obj.z);
    return obj;
  }
  // const cubes = [
  //   createBoxObject(10, 10, 10, 0xFFFF00, 0, 0, 0),
  // ];

  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);

  const planets = new THREE.Object3D();
  solarSystem.add(planets);

  const mercuryRotate = new THREE.Object3D();
  const venusRotate = new THREE.Object3D();
  const earthRotate = new THREE.Object3D();
  const marsRotate = new THREE.Object3D();
  const jupiterRotate = new THREE.Object3D();
  const saturnRotate = new THREE.Object3D();
  const uranusRotate = new THREE.Object3D();
  const neptuneRotate = new THREE.Object3D();

  planets.add(
    mercuryRotate,
    venusRotate,
    earthRotate,
    marsRotate,
    jupiterRotate,
    saturnRotate,
    uranusRotate,
    neptuneRotate
  );

  const sun = createBoxObject(15, 15, 15, 0xffff00, 0, 0, 0, 0xffff00);
  solarSystem.add(sun.mesh);
  objects.push(sun.mesh);

  const mercury = createBoxObject(1, 1, 1, 0xf8eab9, 0, 0, 20);
  mercury.mesh.castShadow = true;
  mercury.mesh.receiveShadow = true;
  mercuryRotate.add(mercury.mesh);
  objects.push(mercury.mesh);
  createCircle(20, 0xf8eab9);

  const venus = createBoxObject(2, 2, 2, 0xf8eab9, 0, 0, 30);
  venus.mesh.castShadow = true;
  venus.mesh.receiveShadow = true;
  venusRotate.add(venus.mesh);
  objects.push(venus.mesh);
  createCircle(30, 0xf8eab9);

  const earth = createBoxObject(3, 3, 3, 0x0000ff, 0, 0, 40);
  earth.mesh.castShadow = true;
  earth.mesh.receiveShadow = true;
  earthRotate.add(earth.mesh);
  objects.push(earth.mesh);
  createCircle(40, 0x0000ff);

  const moon = createBoxObject(1, 1, 1, 0x999999, 4, 0, 0);
  moon.mesh.castShadow = true;
  moon.mesh.receiveShadow = true;
  earth.mesh.add(moon.mesh);
  objects.push(moon.mesh);

  const mars = createBoxObject(2, 2, 2, 0xc65836, 0, 0, 50);
  mars.mesh.castShadow = true;
  mars.mesh.receiveShadow = true;
  marsRotate.add(mars.mesh);
  objects.push(mars.mesh);
  createCircle(50, 0xc65836);

  const jupiter = createBoxObject(9, 9, 9, 0xe3b371, 0, 0, 70);
  jupiter.mesh.castShadow = true;
  jupiter.mesh.receiveShadow = true;
  jupiterRotate.add(jupiter.mesh);
  objects.push(jupiter.mesh);
  createCircle(70, 0xe3b371);

  const saturn = createBoxObject(7, 7, 7, 0xeac757, 0, 0, 90);
  saturn.mesh.castShadow = true;
  saturn.mesh.receiveShadow = true;
  saturnRotate.add(saturn.mesh);
  objects.push(saturn.mesh);
  createCircle(90, 0xeac757);

  const saturnsBelt = createBoxObject(11, 1, 11, 0xffffff, 0, 0, 0);
  saturnsBelt.mesh.castShadow = true;
  saturnsBelt.mesh.receiveShadow = true;
  saturn.mesh.add(saturnsBelt.mesh);
  // objects.push(saturnsBelt.mesh);

  const uranus = createBoxObject(5, 5, 5, 0xbfe7e8, 0, 0, 110);
  uranus.mesh.castShadow = true;
  uranus.mesh.receiveShadow = true;
  uranusRotate.add(uranus.mesh);
  objects.push(uranus.mesh);
  createCircle(110, 0xbfe7e8);

  const neptune = createBoxObject(5, 5, 5, 0x527fdb, 0, 0, 130);
  neptune.mesh.castShadow = true;
  neptune.mesh.receiveShadow = true;
  neptuneRotate.add(neptune.mesh);
  objects.push(neptune.mesh);
  createCircle(130, 0x527fdb);

  // cubes.forEach((cube) => {
  //   scene.add(cube.mesh);
  // });

  const lightData = {
    color: 0xffffff,
    intensity: 2,
    x: 0,
    y: 0,
    z: 0
  };
  const sunLight = new THREE.PointLight(lightData.color, lightData.intensity);
  sunLight.position.set(lightData.x, lightData.y, lightData.z);
  sunLight.castShadow = true;
  scene.add(sunLight);
  const ambientLight = new THREE.AmbientLight(lightData.color, 0.2);
  scene.add(ambientLight);
  // const spotLight = new THREE.SpotLight(lightData.color, 4);
  // spotLight.position.set(0, 20, 0);
  // spotLight.target.position.set(0, 0, 0);
  // spotLight.angle = Math.PI/7;
  // scene.add(spotLight);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001; // convert time to seconds
    // camera.position.z = time;
    const yearRotation = time / 5;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
      obj.rotation.y = time;
    });

    mercuryRotate.rotation.y = yearRotation * 4.15;
    venusRotate.rotation.y = yearRotation * 1.62;
    earthRotate.rotation.y = yearRotation;
    marsRotate.rotation.y = yearRotation * 0.53;
    jupiterRotate.rotation.y = yearRotation * 0.084;
    saturnRotate.rotation.y = yearRotation * 0.034;
    uranusRotate.rotation.y = yearRotation * 0.012;
    neptuneRotate.rotation.y = yearRotation * 0.006;

    // cubes.forEach((cube, cnt) => {
    //   const speed = 1 + cnt * 0.1;
    //   const rot = time * speed;
    //   cube.mesh.rotation.x = rot;
    //   cube.mesh.rotation.y = rot;
    // });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();
